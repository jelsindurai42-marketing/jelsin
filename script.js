/* ===================================================
   Jeslin Durrai portfolio - shared script
   EDIT YOUR CONTENT in the block below.
   =================================================== */
(function () {
  "use strict";

  /* ============ EDIT YOUR CONTENT HERE ============ */
  var EMAIL = "hello@example.com"; // Contact form opens an email to this address

  var SKILLS = [ // level = sample percentage, change to your own
    {name:"Meta Ads", level:90, desc:"Audience targeting, creative testing and lead campaigns."},
    {name:"Google Ads", level:88, desc:"Search, display and remarketing built around intent."},
    {name:"SEO", level:92, desc:"On-page, technical and content optimisation."},
    {name:"Social Media Marketing", level:85, desc:"Content calendars and community growth."},
    {name:"Paid Advertising", level:90, desc:"Budget planning and multi-channel paid media."},
    {name:"Keyword Research", level:88, desc:"Finding the searches that bring buyers."},
    {name:"Campaign Optimization", level:86, desc:"Testing, bidding and landing page improvements."},
    {name:"Analytics & Reporting", level:89, desc:"Dashboards and reports that explain performance."}
  ];

  var PROJECTS = [ // all placeholder content
    {title:"Lead Generation Campaign", desc:"Placeholder: describe the client goal and the campaign you ran.", tags:["Meta Ads","Creative Testing","Analytics"], approach:"Add your strategy highlights: audience, offer and creative angle.", metrics:[["+00%","Metric one"],["0.0x","Metric two"],["-00%","Metric three"]]},
    {title:"Local Business SEO", desc:"Placeholder: describe the business, the search goals and your plan.", tags:["SEO","Local SEO","Keyword Research"], approach:"Add what you changed: pages, listings, content and links.", metrics:[["+00%","Metric one"],["#0","Metric two"],["+00%","Metric three"]]},
    {title:"Search Ads Optimization", desc:"Placeholder: describe the account, the problem and what improved.", tags:["Google Ads","Campaign Optimization"], approach:"Add the changes: structure, bidding, ad copy and negatives.", metrics:[["-00%","Metric one"],["+00%","Metric two"],["0.0x","Metric three"]]},
    {title:"E-commerce Growth Plan", desc:"Placeholder: describe the store, the channels and the growth plan.", tags:["Paid Advertising","Analytics & Reporting"], approach:"Add the funnel, the offers tested and the reporting set up.", metrics:[["+00%","Metric one"],["0.0x","Metric two"],["+00%","Metric three"]]},
    {title:"Social Media Content Engine", desc:"Placeholder: describe the brand, the content plan and the audience.", tags:["Social Media Marketing","Strategy"], approach:"Add content pillars, posting rhythm and what resonated.", metrics:[["+00%","Metric one"],["+00%","Metric two"],["00K","Metric three"]]},
    {title:"Website SEO Revamp", desc:"Placeholder: describe the site, the audit findings and the fixes.", tags:["SEO","Technical Audit","Content"], approach:"Add the audit findings, priorities and the order you fixed things.", metrics:[["+00%","Metric one"],["+00","Metric two"],["+00%","Metric three"]]}
  ];
  /* ============ END OF EDITABLE CONTENT ============ */

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

  function counter(el, to, suffix, dur) {
    dur = dur || 1300;
    if (reduceMotion) { el.textContent = to + suffix; return; }
    var s = performance.now();
    (function f(t) {
      var p = Math.min((t - s) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(f);
    })(s);
  }

  var current = location.pathname.split("/").pop() || "index.html";
  var main = $("#main");

  /* ---------- Mobile menu ---------- */
  var menuBtn = $("#menuBtn"), navLinks = $("#navLinks");
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open);
    });
  }

  /* ---------- Page-to-page transition ---------- */
  $$('a[href$=".html"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target) return;
      var href = a.getAttribute("href");
      e.preventDefault();
      if (href === current) { window.scrollTo({top: 0, behavior: "smooth"}); return; }
      if (reduceMotion) { location.href = href; return; }
      main.classList.add("leaving");
      setTimeout(function () { location.href = href; }, 200);
    });
  });
  window.addEventListener("pageshow", function () { if (main) main.classList.remove("leaving"); });

  /* ---------- Skills page ---------- */
  var skillsGrid = $("#skillsGrid");
  if (skillsGrid) {
    skillsGrid.innerHTML = SKILLS.map(function (s) {
      return '<article class="skill tilt">' +
        '<div class="ring" data-level="' + s.level + '">' +
        '<svg viewBox="0 0 80 80" aria-hidden="true"><circle class="tr" cx="40" cy="40" r="34"/><circle class="pr" cx="40" cy="40" r="34"/></svg>' +
        '<span class="pct" aria-label="' + esc(s.name) + ' ' + s.level + ' percent">0%</span></div>' +
        '<h3>' + esc(s.name) + '</h3><p>' + esc(s.desc) + '</p></article>';
    }).join("");
    $$(".ring").forEach(function (r, i) {
      var lvl = +r.dataset.level, pr = $(".pr", r), pct = $(".pct", r);
      setTimeout(function () {
        if (reduceMotion) pr.style.transition = "none";
        pr.style.strokeDashoffset = 213.63 * (1 - lvl / 100);
        counter(pct, lvl, "%");
      }, 150 + i * 80);
    });
  }

  /* ---------- About page ---------- */
  $$("#stats strong").forEach(function (el) { counter(el, +el.dataset.count, el.dataset.suffix || ""); });
  var tl = $("#timeline");
  if (tl && !reduceMotion) {
    tl.style.setProperty("--tl", 0);
    var ts = performance.now();
    (function f(t) {
      var p = Math.min((t - ts) / 900, 1);
      tl.style.setProperty("--tl", p);
      if (p < 1) requestAnimationFrame(f);
    })(ts);
  }

  /* ---------- Projects page ---------- */
  var projGrid = $("#projGrid");
  if (projGrid) {
    var hues = [["#2E62F5","#0B1F4B"],["#1A3FBF","#0A0F1F"],["#3B7BFF","#12296B"],["#0B1F4B","#2250E8"],["#2250E8","#0A0F1F"],["#4C86FF","#0B1F4B"]];
    projGrid.innerHTML = PROJECTS.map(function (p, i) {
      var h = hues[i % hues.length], grid = "", bars = "", k;
      for (k = 0; k < 10; k++) grid += '<path d="M' + (k * 44) + ' 0V190"/>';
      for (k = 0; k < 5; k++) grid += '<path d="M0 ' + (k * 44) + 'H400"/>';
      [40,70,50,95,80,120].forEach(function (v, j) { bars += '<rect x="' + (210 + j * 28) + '" y="' + (170 - v) + '" width="16" height="' + v + '" rx="4"/>'; });
      return '<article class="proj tilt">' +
        '<div class="proj-img"><svg class="bg" viewBox="0 0 400 190" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
        '<defs><linearGradient id="pg' + i + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + h[0] + '"/><stop offset="1" stop-color="' + h[1] + '"/></linearGradient></defs>' +
        '<rect width="400" height="190" fill="url(#pg' + i + ')"/>' +
        '<g fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1">' + grid + '</g>' +
        '<g fill="rgba(255,255,255,.2)">' + bars + '</g>' +
        '<path d="M20 150 L90 110 L140 128 L210 70 L280 90 L380 30" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '<span class="lbl">Project image placeholder</span></div>' +
        '<div class="proj-body"><h3>' + esc(p.title) + '</h3><p class="desc">' + esc(p.desc) + '</p>' +
        '<div class="tags">' + p.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("") + '</div>' +
        '<div class="reveal"><p>' + esc(p.approach) + '</p></div>' +
        '<div class="metrics">' + p.metrics.map(function (m) { return '<div><b>' + esc(m[0]) + '</b><span>' + esc(m[1]) + '</span></div>'; }).join("") + '</div>' +
        '<button class="btn btn-ghost btn-sm" data-proj="' + i + '">View Project <svg class="i arrow"><use href="#i-arrow"/></svg></button></div></article>';
    }).join("");

    var dlg = $("#projDlg");
    projGrid.addEventListener("click", function (e) {
      var b = e.target.closest("[data-proj]"); if (!b) return;
      var p = PROJECTS[+b.dataset.proj];
      $("#dlgTitle").textContent = p.title;
      $("#dlgDesc").textContent = p.desc;
      $("#dlgTags").innerHTML = p.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("");
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    });
    $("#dlgClose").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  }

  /* ---------- Hero 3D tilt (home) ---------- */
  var scene = $("#scene"), stack = $("#stack");
  if (scene && !reduceMotion) {
    scene.addEventListener("pointermove", function (e) {
      var r = scene.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      stack.style.setProperty("--ry", (x * 18) + "deg");
      stack.style.setProperty("--rx", (-y * 14) + "deg");
    });
    scene.addEventListener("pointerleave", function () {
      stack.style.setProperty("--rx", "0deg"); stack.style.setProperty("--ry", "0deg");
    });
  }

  /* ---------- Card tilt on hover (mouse only) ---------- */
  if (!reduceMotion && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    $$(".tilt").forEach(function (el) {
      el.style.transition = "transform .25s ease-out, box-shadow .3s, border-color .3s";
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "perspective(900px) rotateX(" + (-y * 6) + "deg) rotateY(" + (x * 8) + "deg) translateY(-8px) scale(1.015)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- Contact form ---------- */
  var form = $("#contactForm");
  function toast(msg) {
    var t = $("#toast"); if (!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }
  if (form) {
    var formStatus = $("#formStatus");
    var rules = {
      cName: function (v) { return v.trim().length > 1; },
      cEmail: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
      cPhone: function (v) { return v.trim() === "" || /^[+\d][\d\s().-]{6,}$/.test(v.trim()); },
      cMsg: function (v) { return v.trim().length > 5; }
    };
    var check = function (input) {
      var ok = rules[input.id](input.value);
      input.closest(".field").classList.toggle("bad", !ok);
      input.setAttribute("aria-invalid", !ok);
      return ok;
    };
    Object.keys(rules).forEach(function (id) {
      var el = document.getElementById(id);
      el.addEventListener("blur", function () { check(el); });
      el.addEventListener("input", function () { if (el.closest(".field").classList.contains("bad")) check(el); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var results = Object.keys(rules).map(function (id) { return check(document.getElementById(id)); });
      if (results.indexOf(false) !== -1) {
        formStatus.className = "form-status";
        var first = form.querySelector(".bad input, .bad textarea"); if (first) first.focus();
        return;
      }
      var d = new FormData(form);
      var body = d.get("message") + "\n\nFrom: " + d.get("name") + "\nEmail: " + d.get("email") + "\nPhone: " + (d.get("phone") || "Not provided");
      var href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Portfolio enquiry from " + d.get("name")) + "&body=" + encodeURIComponent(body);
      formStatus.textContent = "Thanks! Your email app should open with the message ready to send. If it does not, write to " + EMAIL + ".";
      formStatus.className = "form-status show";
      toast("Message ready to send");
      form.reset();
      window.location.href = href;
    });
  }
  $$("[data-email]").forEach(function (a) { a.textContent = EMAIL; a.href = "mailto:" + EMAIL; });

  var yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();
})();