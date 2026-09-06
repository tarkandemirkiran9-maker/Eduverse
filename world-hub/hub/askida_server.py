
import os, sys, json, time, secrets, threading, urllib.parse
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

ROOT = os.path.abspath(sys.argv[1])
PORT = int(sys.argv[2])
DATA_FILE = os.path.abspath(sys.argv[3])
VENDOR = os.path.abspath(sys.argv[4])
PUBLIC_BASE = sys.argv[5].rstrip("/") if len(sys.argv)>5 else f"http://127.0.0.1:{PORT}"
if VENDOR not in sys.path:
    sys.path.insert(0, VENDOR)

import qrcode

LOCK = threading.RLock()

def now_iso():
    return time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

def load_data():
    with LOCK:
        if not os.path.exists(DATA_FILE):
            return {"gifts":[]}
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                d=json.load(f)
            if not isinstance(d,dict) or not isinstance(d.get("gifts"),list):
                return {"gifts":[]}
            return d
        except Exception:
            return {"gifts":[]}

def save_data(d):
    with LOCK:
        os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
        tmp=DATA_FILE+".tmp"
        with open(tmp,"w",encoding="utf-8") as f:
            json.dump(d,f,ensure_ascii=False,indent=2)
        os.replace(tmp,DATA_FILE)

def find_gift(token):
    d=load_data()
    for g in d["gifts"]:
        if g.get("token")==token:
            return d,g
    return d,None

def qr_svg(text):
    qr=qrcode.QRCode(error_correction=qrcode.ERROR_CORRECT_M, box_size=1, border=4)
    qr.add_data(text)
    qr.make(fit=True)
    m=qr.get_matrix()
    n=len(m)
    scale=7
    size=n*scale
    parts=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="100%" height="100%" shape-rendering="crispEdges">']
    parts.append(f'<rect width="{size}" height="{size}" fill="#ffffff"/>')
    for y,row in enumerate(m):
        for x,v in enumerate(row):
            if v:
                parts.append(f'<rect x="{x*scale}" y="{y*scale}" width="{scale}" height="{scale}" fill="#07111c"/>')
    parts.append('</svg>')
    return ''.join(parts).encode('utf-8')

CLAIM_HTML = r'''<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>EduVerse Askıda</title>
<style>
:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:radial-gradient(circle at 25% 20%,#0e3152,#07111f 48%,#040912);font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;color:#eef8ff;padding:18px}
.card{width:min(680px,100%);border:1px solid rgba(124,232,255,.22);border-radius:28px;background:linear-gradient(145deg,rgba(10,26,50,.97),rgba(6,14,28,.98));box-shadow:0 36px 100px rgba(0,0,0,.52);padding:28px}
.k{color:#7ce8ff;letter-spacing:.16em;font-size:12px;font-weight:900}.title{font-size:clamp(28px,6vw,46px);line-height:1.05;margin:8px 0 12px}.lead{color:#a7b9ce;line-height:1.65}.status{margin:18px 0;padding:14px 16px;border-radius:15px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.07);color:#c8d7e6}
button{width:100%;min-height:52px;border:1px solid #ffe0a0;border-radius:14px;background:linear-gradient(135deg,#ffe39f,#e6ad4b);color:#251807;font-weight:950;font-size:15px;cursor:pointer}.small{margin-top:12px;color:#70869d;font-size:12px;line-height:1.5}
.good{color:#8fffc4}.bad{color:#ffb0a8}
</style></head><body><main class="card">
<div class="k">ASKIDA EDUVERSE</div>
<h1 class="title" id="title">Size EduVerse Tam Erişim hediye edildi.</h1>
<p class="lead" id="lead">Bu davet ebeveyn veya yasal vasi tarafından teslim alınır. Çocuğun ayrı bir e-posta hesabına ihtiyacı yoktur.</p>
<div class="status" id="status">Davet kontrol ediliyor…</div>
<button id="claim" type="button">HEDİYEYİ AL</button>
<p class="small">Yerel prototip: production sürümünde bu adım Family Account’a bağlanır ve sunucuda doğrulanır.</p>
</main>
<script>
const token=decodeURIComponent(location.pathname.split('/').pop());
const st=document.getElementById('status'), btn=document.getElementById('claim');
async function status(){
 const r=await fetch('/api/askida/status?token='+encodeURIComponent(token)); const j=await r.json();
 if(!j.ok){st.textContent='Bu davet bulunamadı.';st.className='status bad';btn.disabled=true;return;}
 if(j.state==='REDEEMED'){st.textContent='Bu Askıda EduVerse daha önce teslim alınmış.';st.className='status bad';btn.disabled=true;return;}
 if(j.state==='POOLED'){st.textContent='Bu hak Askıda havuzunda bekliyor ve henüz bir aileye atanmadı.';st.className='status';btn.disabled=true;return;}
 st.textContent='Davet kullanılabilir. Ebeveyn olarak teslim alabilirsiniz.';st.className='status good';btn.disabled=false;
}
btn.addEventListener('click',async()=>{
 btn.disabled=true;
 const r=await fetch('/api/askida/redeem',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token})});
 const j=await r.json();
 if(j.ok){st.textContent='Tam Erişim teslim alındı. Bu tek kullanımlık davet artık kapandı.';st.className='status good';}
 else{st.textContent=j.message||'Davet teslim alınamadı.';st.className='status bad';}
});
status();
</script></body></html>'''

class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):
        super().__init__(*args,directory=ROOT,**kwargs)

    def log_message(self, fmt, *args):
        pass

    def send_json(self,obj,status=200):
        raw=json.dumps(obj,ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header("Content-Type","application/json; charset=utf-8")
        self.send_header("Content-Length",str(len(raw)))
        self.send_header("Cache-Control","no-store")
        self.end_headers()
        self.wfile.write(raw)

    def read_json(self):
        try:
            n=int(self.headers.get("Content-Length","0"))
            raw=self.rfile.read(n) if n else b'{}'
            return json.loads(raw.decode('utf-8'))
        except Exception:
            return {}

    def do_GET(self):
        p=urllib.parse.urlparse(self.path)
        if p.path.startswith("/gift/"):
            raw=CLAIM_HTML.encode('utf-8')
            self.send_response(200);self.send_header("Content-Type","text/html; charset=utf-8");self.send_header("Content-Length",str(len(raw)));self.send_header("Cache-Control","no-store");self.end_headers();self.wfile.write(raw);return
        if p.path=="/api/askida/status":
            token=urllib.parse.parse_qs(p.query).get("token",[""])[0]
            d,g=find_gift(token)
            if not g:self.send_json({"ok":False},404);return
            self.send_json({"ok":True,"token":token,"state":g.get("state"),"createdAt":g.get("createdAt"),"redeemedAt":g.get("redeemedAt")});return
        if p.path=="/api/askida/qr":
            token=urllib.parse.parse_qs(p.query).get("token",[""])[0]
            d,g=find_gift(token)
            if not g:
                self.send_response(404);self.end_headers();return
            url=f"{PUBLIC_BASE}/gift/{urllib.parse.quote(token)}"
            raw=qr_svg(url)
            self.send_response(200);self.send_header("Content-Type","image/svg+xml; charset=utf-8");self.send_header("Content-Length",str(len(raw)));self.send_header("Cache-Control","no-store");self.end_headers();self.wfile.write(raw);return
        super().do_GET()

    def do_POST(self):
        p=urllib.parse.urlparse(self.path)
        body=self.read_json()
        if p.path=="/api/askida/new":
            token=secrets.token_urlsafe(18).replace('-','A').replace('_','B')
            gift={"token":token,"state":"AVAILABLE","createdAt":now_iso(),"redeemedAt":None,"isTest":bool(body.get("test"))}
            d=load_data();d["gifts"].append(gift);save_data(d)
            self.send_json({"ok":True,"token":token,"state":"AVAILABLE","claimUrl":f"{PUBLIC_BASE}/gift/{urllib.parse.quote(token)}","qrUrl":f"/api/askida/qr?token={urllib.parse.quote(token)}"});return
        if p.path=="/api/askida/assign":
            token=str(body.get("token",""))
            d,g=find_gift(token)
            if not g:self.send_json({"ok":False,"message":"not_found"},404);return
            if g.get("state")=="REDEEMED":self.send_json({"ok":False,"message":"already_redeemed"},409);return
            g["state"]="ASSIGNED";g["assignedAt"]=now_iso();save_data(d)
            self.send_json({"ok":True,"state":"ASSIGNED"});return
        if p.path=="/api/askida/pool":
            token=str(body.get("token",""))
            d,g=find_gift(token)
            if not g:self.send_json({"ok":False,"message":"not_found"},404);return
            if g.get("state")=="REDEEMED":self.send_json({"ok":False,"message":"already_redeemed"},409);return
            g["state"]="POOLED";g["pooledAt"]=now_iso();save_data(d)
            self.send_json({"ok":True,"state":"POOLED"});return
        if p.path=="/api/askida/redeem":
            token=str(body.get("token",""))
            d,g=find_gift(token)
            if not g:self.send_json({"ok":False,"message":"not_found"},404);return
            state=g.get("state")
            if state=="REDEEMED":self.send_json({"ok":False,"message":"Bu Askıda EduVerse daha önce teslim alınmış."},409);return
            if state=="POOLED":self.send_json({"ok":False,"message":"Bu hak havuzda bekliyor; önce bir aileye atanmalıdır."},409);return
            g["state"]="REDEEMED";g["redeemedAt"]=now_iso();save_data(d)
            self.send_json({"ok":True,"state":"REDEEMED"});return
        if p.path=="/api/askida/reset-tests":
            d=load_data();d["gifts"]=[g for g in d["gifts"] if not g.get("isTest")];save_data(d);self.send_json({"ok":True});return
        self.send_json({"ok":False,"message":"not_found"},404)

if __name__=="__main__":
    os.makedirs(os.path.dirname(DATA_FILE),exist_ok=True)
    ThreadingHTTPServer(("0.0.0.0",PORT),Handler).serve_forever()
