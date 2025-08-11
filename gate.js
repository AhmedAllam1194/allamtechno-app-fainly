const $ = (s, p=document)=>p.querySelector(s);
const toHex = buf => [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,"0")).join("");
async function sha256Hex(str){return toHex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)))}
const DB = window.APP_USERS||[];
function saveSession(o){sessionStorage.setItem("AT_SESSION", JSON.stringify(o))}
function getSession(){try{return JSON.parse(sessionStorage.getItem("AT_SESSION"))}catch(_){return null}}
function clearSession(){sessionStorage.removeItem("AT_SESSION")}
function showLogin(){$("#login-view").classList.remove("hidden");$("#dash-view").classList.add("hidden")}
function showDash(s){$("#login-view").classList.add("hidden");$("#dash-view").classList.remove("hidden");$("#whoami").textContent=`${s.d} (${s.u}) — صلاحية: ${s.r}`}
async function onLogin(e){e.preventDefault();const u=$("#username").value.trim(),p=$("#password").value;if(!u||!p){$("#login-alert").textContent="أدخل البيانات";return}const h=await sha256Hex(p);const f=DB.find(x=>x.u===u&&x.h===h);if(f){saveSession(f);showDash(f)}else{$("#login-alert").textContent="بيانات الدخول غير صحيحة"}}
function onLogout(){clearSession();showLogin()}
function init(){$("#login-form").addEventListener("submit",onLogin);$("#logout-btn").addEventListener("click",onLogout);const s=getSession();s?showDash(s):showLogin()}
document.addEventListener("DOMContentLoaded",init);
