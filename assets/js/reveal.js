/* Animasi: reveal saat scroll (dengan jeda berurutan), penghitung angka, parallax band */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Jeda berurutan untuk elemen bersaudara */
  document.querySelectorAll(".reveal").forEach(function (el) {
    var sibs = el.parentElement ? el.parentElement.querySelectorAll(":scope > .reveal") : [];
    var idx = Array.prototype.indexOf.call(sibs, el);
    if (idx > 0) el.style.transitionDelay = Math.min(idx * 0.09, 0.54) + "s";
  });

  function countUp(el) {
    var to = parseFloat(el.getAttribute("data-to"));
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    var dur = 1400, start = null;
    function fmt(v) {
      var s = v.toFixed(dec);
      return dec ? s.replace(".", ",") : s;
    }
    if (reduce) { el.textContent = fmt(to); return; }
    function step(t) {
      if (!start) start = t;
      var p = Math.min(1, (t - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(to * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = fmt(0);
    requestAnimationFrame(step);
  }

  var io;
  if (!("IntersectionObserver" in window) || reduce) {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
    document.querySelectorAll("[data-count]").forEach(function (el) { el.textContent = el.getAttribute("data-label") || el.textContent; });
  } else {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        (function (t) { setTimeout(function () { t.style.transitionDelay = ""; }, 1500); })(en.target);
        if (en.target.hasAttribute("data-count")) countUp(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
    document.querySelectorAll(".reveal, [data-count]").forEach(function (el) { io.observe(el); });
  }

  /* Parallax halus untuk background band */
  var bands = Array.prototype.slice.call(document.querySelectorAll(".band-bg"));
  if (bands.length && !reduce) {
    var pending = false;
    function parallax() {
      pending = false;
      bands.forEach(function (b) {
        var r = b.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        b.style.transform = "translate3d(0," + (p * -60).toFixed(1) + "px,0)";
      });
    }
    window.addEventListener("scroll", function () {
      if (!pending) { pending = true; requestAnimationFrame(parallax); }
    }, { passive: true });
    parallax();
  }
})();
