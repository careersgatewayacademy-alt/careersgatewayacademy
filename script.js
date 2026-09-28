const C = CGA_CONFIG, $ = (s, r=document) => r.querySelector(s), $$ = (s, r=document) => [...r.querySelectorAll(s)];
const isPh = v => !v || /^\[.*\]$/.test(v);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const waDigits = C.whatsapp.replace(/\D/g, "");
const waLink = (t="Hello CGA, I would like to make an enquiry.") => isPh(C.whatsapp) ? "#contact" : `https://wa.me/${waDigits}?text=${encodeURIComponent(t)}`;

// Dates (auto from classStartDate, Lagos time)
const dt = new Date(C.classStartDate), fmtD = (l,o) => new Intl.DateTimeFormat(l,{timeZone:"Africa/Lagos",...o}).format(dt);
const dfmt = {long:()=>fmtD("en-US",{month:"long",day:"numeric",year:"numeric"}), day:()=>fmtD("en-US",{day:"numeric"}), monthyear:()=>fmtD("en-US",{month:"long",year:"numeric"}), month:()=>fmtD("en-US",{month:"long"})};
$$("[data-date]").forEach(e => e.textContent = dfmt[e.dataset.date]());
$('input[name="startDate"]').value = fmtD("en-CA",{year:"numeric",month:"2-digit",day:"2-digit"});

// Photos (hidden/replaced gracefully when empty)
const P = C.photos || {};
const heroImg = $("#hero-img"); if (P.hero) { heroImg.src = P.hero; heroImg.hidden = false; }
$("#about-media").innerHTML = P.about ? `<img class="photo" src="${esc(P.about)}" alt="Students learning at Careers Gateway Academy">` :
  `<div class="facts card"><p><b>Where</b><br>Iba, Ojo, Lagos</p><p><b>What we teach</b><br>JAMB/UTME, CBT practice and academic tutorials</p><p><b>Next class</b><br>${dfmt.long()}</p></div>`;
if (P.oit) $("#collab").insertAdjacentHTML("beforeend", `<figure class="oitfig"><img src="${esc(P.oit)}" alt="Students at Othello Institute of Technology" loading="lazy"><figcaption>Students at Othello Institute of Technology</figcaption></figure>`);
const S = Object.entries(C.social || {}).filter(([,v]) => v);
$("#social").innerHTML = S.map(([k,v]) => `<a href="${esc(v)}" target="_blank" rel="noopener">${k[0].toUpperCase()+k.slice(1)}</a>`).join("");

// Contact fields & WhatsApp links
$$("[data-f]").forEach(e => e.textContent = C[e.dataset.f]);
$$("[data-wa]").forEach(a => { a.href = waLink(); if (isPh(C.whatsapp)) a.removeAttribute("target"); });
$$("[data-f-tel]").forEach(a => { if (!isPh(C.phone)) a.href = "tel:" + C.phone.replace(/[^\d+]/g, ""); });

// Programmes, benefits, FAQ
$("#prog-grid").innerHTML = C.programmes.map(p => `<article class="card"><div class="ic">${p.icon}</div><h3>${esc(p.name)}</h3><p>${esc(p.text)}</p></article>`).join("");
$("#why-grid").innerHTML = C.why.map(w => `<article class="card"><div class="ic">${w[0]}</div><h3>${esc(w[1])}</h3><p>${esc(w[2])}</p></article>`).join("");
$("#faq-l").innerHTML = C.faqs.map(f => `<details><summary>${esc(f[0])}</summary><p>${esc(f[1])}</p></details>`).join("");
$("#prog-sel").innerHTML = '<option value="">Select a programme</option>' + C.programmes.map(p => `<option>${esc(p.name)}</option>`).join("");

// Map & directions
const place = isPh(C.address) ? "Ojo, Lagos, Nigeria" : C.address + ", Ojo, Lagos, Nigeria";
$("#map").src = isPh(C.googleMapsEmbedUrl) ? `https://www.google.com/maps?q=${encodeURIComponent("Ojo, Lagos, Nigeria")}&output=embed` : C.googleMapsEmbedUrl;
$("#dir").href = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(place);

// Countdown (never negative)
const target = new Date(C.classStartDate).getTime();
function tick() {
  const d = Math.max(0, target - Date.now());
  const html = d === 0 ? '<div class="done">Classes are now underway.</div>' :
    [["Days", Math.floor(d/864e5)],["Hours", Math.floor(d/36e5)%24],["Minutes", Math.floor(d/6e4)%60],["Seconds", Math.floor(d/1e3)%60]]
    .map(([l,v]) => `<div><b>${String(v).padStart(2,"0")}</b><small>${l.toUpperCase()}</small></div>`).join("");
  $$("[data-cd]").forEach(e => e.innerHTML = html);
  return d;
}
if (tick() > 0) { const t = setInterval(() => { if (tick() === 0) clearInterval(t); }, 1000); }

// Mobile menu
const burger = $(".burger"), nav = $("#nav");
burger.addEventListener("click", () => burger.setAttribute("aria-expanded", nav.classList.toggle("open")));
$$("#nav a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }));

// CBT demo
let qi = 0, secs = 900; const ans = {};
function showQ() {
  const q = C.demoQuestions[qi];
  $("#cbt-q").textContent = q.q;
  $("#cbt-o").innerHTML = q.o.map((o,i) => `<button class="${ans[qi]===i?"sel":""}" data-i="${i}">${"ABCD"[i]}. ${esc(o)}</button>`).join("");
  $("#cbt-n").textContent = `Question ${qi+1} of ${C.demoQuestions.length}`;
}
$("#cbt-o").addEventListener("click", e => { const b = e.target.closest("button"); if (b) { ans[qi] = +b.dataset.i; showQ(); } });
$("#cbt-prev").onclick = () => { qi = Math.max(0, qi-1); showQ(); };
$("#cbt-next").onclick = () => { qi = Math.min(C.demoQuestions.length-1, qi+1); showQ(); };
setInterval(() => { secs = secs > 0 ? secs-1 : 900; $("#cbt-t").textContent = `${String(Math.floor(secs/60)).padStart(2,"0")}:${String(secs%60).padStart(2,"0")}`; }, 1000);
showQ();

// Registration
$("#regform").addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target, msg = $("#fmsg"); let ok = true;
  $$("[required]", f).forEach(i => { const bad = !i.value.trim(); i.classList.toggle("bad", bad); if (bad) ok = false; });
  if (!ok) { msg.textContent = "Please fill in the highlighted fields."; msg.style.color = "#c0392b"; return; }
  const data = Object.fromEntries(new FormData(f));
  if (C.formEndpoint) {
    try {
      const r = await fetch(C.formEndpoint, {method:"POST", headers:{"Content-Type":"application/json", "Accept":"application/json"}, body:JSON.stringify(data)});
      if (!r.ok) throw 0;
      msg.textContent = "Thank you. We have received your registration and will contact you soon."; msg.style.color = "#1f7a4d"; f.reset(); return;
    } catch { msg.textContent = "Could not send. Please try again or use WhatsApp."; msg.style.color = "#c0392b"; return; }
  }
  const text = `Registration enquiry\nName: ${data.fullName}\nStudent: ${data.studentName}\nParent/Guardian: ${data.parentName}\nPhone: ${data.phone}\nWhatsApp: ${data.whatsapp}\nEmail: ${data.email}\nProgramme: ${data.programme}\nStart date: ${data.startDate}\nLevel: ${data.level}\nMessage: ${data.message}`;
  msg.style.color = "#1f7a4d";
  if (isPh(C.whatsapp)) { msg.textContent = "Form ready. Set a WhatsApp number or formEndpoint in script.js to send registrations."; return; }
  msg.textContent = "Opening WhatsApp to send your registration…";
  window.open(waLink(text), "_blank", "noopener");
});
