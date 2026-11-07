/* Hairyuw Studio — script utama: tema, menu mobile, header, progress, transisi halaman, salin, tahun */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Tema terang (default) / gelap navy */
  var KEY = "hy-theme";
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    var btn = document.querySelector("[data-theme-toggle]");
    if (btn) btn.setAttribute("aria-label", t === "dark" ? "Ganti ke tema terang" : "Ganti ke tema gelap");
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", t === "dark" ? "#142238" : "#F7F1E5");
  }
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  applyTheme(saved === "dark" ? "dark" : "light");
  var themeBtn = document.querySelector("[data-theme-toggle]");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      themeBtn.classList.remove("spin"); void themeBtn.offsetWidth; themeBtn.classList.add("spin");
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  }

  /* Menu mobile */
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.focus();
      }
    });
  }

  /* Header: transparan di atas hero, solid saat scroll; progress garis barber; tombol atas */
  var header = document.querySelector(".site-header");
  var hasHero = !!document.querySelector(".hero-full");
  var progress = document.querySelector(".progress");
  var topBtn = document.querySelector("[data-to-top]");
  var ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY || 0;
    var max = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    if (progress) progress.style.transform = "scaleX(" + Math.min(1, y / max) + ")";
    if (header) {
      header.classList.toggle("scrolled", y > 10);
      header.classList.toggle("over-hero", hasHero && y < 40);
    }
    if (topBtn) topBtn.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
  if (topBtn) topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  /* Transisi halaman: fade out sebelum pindah ke halaman lain di situs ini */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || href.indexOf("mailto:") === 0 || href.indexOf("http") === 0 || href.indexOf("tel:") === 0) return;
    if (!/\.html(\?|#|$)/.test(href) && href.indexOf("?") === -1) return;
    if (reduce) return;
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(function () { window.location.href = href; }, 260);
  });
  window.addEventListener("pageshow", function () { document.body.classList.remove("leaving"); });

  /* Salin teks */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    var original = btn.textContent;
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function (ok) {
        btn.textContent = ok ? "Tersalin" : "Gagal menyalin";
        setTimeout(function () { btn.textContent = original; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else { done(false); }
    });
  });

  /* Tahun di footer */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
