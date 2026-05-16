/* ============================================================
   707_herbal tea — script.js
   ------------------------------------------------------------
   ➤ PASTE YOUR SELAR LINKS HERE
   When each tea is ready on Selar, replace the empty string
   with the full Selar product URL. That's all you need to
   change — the buttons will start working automatically.
   ============================================================ */
const SELAR_LINKS = {
  lavender:   "",   // e.g. "https://selar.co/707-lavender"
  saffron:    "",
  rosebuds:   "",
  calendula:  "",
  spearmint:  "",
  lemongrass: "",
  honey:      "",
};

/* ============ Tea catalog ============ */
const TEAS = [
  {
    slug:"lavender",
    name:"Lavender",
    price:"₦5,000",
    color:"#7a6fa3",
    hook:"For the nights your mind won't quiet.",
    benefits:["Calms the nervous system","Supports deeper, slower sleep","Eases tension headaches"],
    brew:"1 tsp buds in 250ml just-off-boil water. Steep 5–7 min, covered. Sip about 30 minutes before bed.",
  },
  {
    slug:"saffron",
    name:"Saffron",
    price:"₦5,000",
    color:"#c97b2a",
    hook:"A few golden threads. A brighter mood.",
    benefits:["Lifts mood naturally","Sharpens focus through the afternoon","Rich in plant antioxidants"],
    brew:"4–5 threads in hot water. Steep 8 min until the cup turns gold. A spoon of honey rounds it out beautifully.",
  },
  {
    slug:"rosebuds",
    name:"Rose Buds",
    price:"₦5,000",
    color:"#c9637a",
    hook:"Soft on the heart. Glow from within.",
    benefits:["Clears the skin from the inside","Gently balances hormones","Soothes the gut after meals"],
    brew:"1 tbsp buds in 90°C water. Steep 5 min. Breathe in the steam before your first sip — that's the ritual.",
  },
  {
    slug:"calendula",
    name:"Calendula",
    price:"₦5,000",
    color:"#d99227",
    hook:"Sunshine in a cup — for healing days.",
    benefits:["Soothes inflammation","Supports digestion","A gentle, daily detox"],
    brew:"1 tsp petals in hot water. Steep 8 min. Drink warm after meals to feel it work.",
  },
  {
    slug:"spearmint",
    name:"Spearmint",
    price:"₦5,000",
    color:"#5a9a6e",
    hook:"Clear skin, clear head — every morning.",
    benefits:["Balances hormones over time","Reduces bloating fast","Wakes the mind without caffeine"],
    brew:"1 tsp leaves in 95°C water. Steep 6 min. Drink twice daily — once at sunrise, once mid-afternoon.",
  },
  {
    slug:"lemongrass",
    name:"Lemongrass",
    price:"₦5,000",
    color:"#aab748",
    hook:"Bright. Citrus. Alive.",
    benefits:["Aids digestion","Strengthens immunity","Natural energy, no jitters"],
    brew:"1 tsp in hot water. Steep 5 min. A wedge of lemon makes it sing.",
  },
];

const HONEY = {
  slug:"honey",
  name:"Raw Natural Honey",
  price:"Add-on",
  color:"#d8a64a",
  hook:"The perfect pairing for every blend.",
  benefits:["Unprocessed, straight from the comb","Stirs cleanly into any hot tea","Naturally soothes the throat"],
  brew:"Stir a teaspoon into your finished cup — never into boiling water (heat dulls the enzymes).",
};

/* ============ Render shop ============ */
function teaCard(t, isHoney=false){
  const benefits = t.benefits.map(b=>`<li>${b}</li>`).join("");
  return `
    <article class="tea-card ${isHoney?"honey-card":""} reveal" data-slug="${t.slug}">
      <div class="tea-photo" style="background:linear-gradient(135deg, ${t.color}, ${shade(t.color,-25)})">
        <span>${t.name}</span>
      </div>
      <div class="tea-body">
        <div class="tea-head">
          <h3>${t.name}</h3>
          <span class="price-pill">${t.price}</span>
        </div>
        <p class="tea-hook">"${t.hook}"</p>
        <p class="tea-section-label">Why people love it</p>
        <ul class="tea-benefits">${benefits}</ul>
        <p class="tea-section-label">How to brew</p>
        <p class="tea-brew">${t.brew}</p>
        ${isHoney?"":'<p class="tea-honey-note">✦ Pair with our raw natural honey — add it at checkout.</p>'}
        <div class="tea-cta">
          <button class="btn btn-primary order-btn" data-tea="${t.slug}">Order on Selar →</button>
        </div>
      </div>
    </article>
  `;
}

function shade(hex, amt){
  const c = hex.replace("#","");
  const num = parseInt(c,16);
  let r = (num>>16) + amt;
  let g = ((num>>8)&0xff) + amt;
  let b = (num&0xff) + amt;
  r=Math.max(0,Math.min(255,r));
  g=Math.max(0,Math.min(255,g));
  b=Math.max(0,Math.min(255,b));
  return "#"+(r<<16|g<<8|b).toString(16).padStart(6,"0");
}

function renderShop(){
  const grid = document.getElementById("teaGrid");
  if(!grid) return;
  grid.innerHTML = TEAS.map(t=>teaCard(t)).join("") + teaCard(HONEY,true);
}

/* ============ Order button → Selar or modal ============ */
function handleOrder(slug, name){
  const url = SELAR_LINKS[slug];
  if(url && url.trim().length){
    window.open(url, "_blank", "noopener");
    return;
  }
  const modal = document.getElementById("modal");
  document.getElementById("modalTitle").textContent = `${name} — coming to Selar soon`;
  document.getElementById("modalBody").textContent =
    `Our online checkout for ${name} is going live shortly. Send a quick DM and we'll get your pack out today — and you can add a jar of raw honey to your order.`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
}

function closeModal(){
  const modal = document.getElementById("modal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
}

/* ============ Reveal on scroll ============ */
function setupReveals(){
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, {threshold:.12});
  els.forEach(el=>io.observe(el));
}

/* ============ Chart fill on scroll ============ */
function setupChart(){
  const chart = document.getElementById("chart");
  if(!chart) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        chart.querySelectorAll(".bar").forEach(bar=>{
          bar.style.height = bar.dataset.h + "%";
        });
        io.disconnect();
      }
    });
  }, {threshold:.4});
  io.observe(chart);
}

/* ============ Video pause when off-screen ============ */
function setupVideos(){
  const vids = document.querySelectorAll("video");
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      const v = e.target;
      if(e.isIntersecting){ v.play().catch(()=>{}); }
      else { v.pause(); }
    });
  }, {threshold:.2});
  vids.forEach(v=>io.observe(v));
}

/* ============ Mobile nav ============ */
function setupNav(){
  const burger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  burger?.addEventListener("click", ()=>{
    burger.classList.toggle("open");
    nav.classList.toggle("open");
  });
  nav?.querySelectorAll("a").forEach(a=>{
    a.addEventListener("click", ()=>{
      burger.classList.remove("open");
      nav.classList.remove("open");
    });
  });
}

/* ============ Init ============ */
document.addEventListener("DOMContentLoaded", ()=>{
  renderShop();
  setupReveals();
  setupChart();
  setupVideos();
  setupNav();

  document.getElementById("year").textContent = new Date().getFullYear();

  document.addEventListener("click",(e)=>{
    const btn = e.target.closest(".order-btn");
    if(btn){
      const slug = btn.dataset.tea;
      const name = (TEAS.find(t=>t.slug===slug)||HONEY).name;
      handleOrder(slug, name);
    }
    if(e.target.closest("[data-close]")) closeModal();
  });

  document.addEventListener("keydown",(e)=>{
    if(e.key==="Escape") closeModal();
  });
});
