/* Galeri: filter kategori, jumlah foto, dan lightbox dengan navigasi keyboard */
(function () {
  "use strict";
  var items = Array.prototype.slice.call(document.querySelectorAll(".g-item"));
  var filters = document.querySelectorAll("[data-filter]");
  var count = document.getElementById("g-count");
  var box = document.getElementById("lightbox");
  var img = document.getElementById("lb-img");
  var cap = document.getElementById("lb-cap");
  var current = 0;
  var visible = [];
  var lastFocus = null;

  function setCount() {
    if (count) count.textContent = visible.length + " foto";
  }

  function applyFilter(cat) {
    visible = [];
    items.forEach(function (it) {
      var show = cat === "all" || it.getAttribute("data-cat") === cat;
      it.hidden = !show;
      if (show) visible.push(it.querySelector("[data-lightbox]"));
    });
    filters.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-filter") === cat ? "true" : "false");
    });
    setCount();
  }

  filters.forEach(function (b) {
    b.addEventListener("click", function () {
      applyFilter(b.getAttribute("data-filter"));
    });
  });

  // Galeri dikumpulkan dari tombol yang terlihat (agar urutan lightbox sesuai filter)
  function collect() {
    visible = Array.prototype.slice.call(document.querySelectorAll(".g-item:not([hidden]) [data-lightbox]"));
  }

  function show(i) {
    if (!visible.length) return;
    current = (i + visible.length) % visible.length;
    var btn = visible[current];
    img.classList.remove("swap"); void img.offsetWidth; img.classList.add("swap");
    img.src = btn.getAttribute("data-src");
    img.alt = btn.getAttribute("data-alt") || "";
    cap.textContent = (current + 1) + " / " + visible.length + " · " + (btn.getAttribute("data-alt") || "");
  }

  function open(btn) {
    collect();
    lastFocus = btn;
    current = visible.indexOf(btn);
    if (current < 0) current = 0;
    show(current);
    box.hidden = false;
    document.body.style.overflow = "hidden";
    box.querySelector("[data-lb-close]").focus();
  }

  function close() {
    box.hidden = true;
    img.src = "";
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll("[data-lightbox]").forEach(function (btn) {
    btn.addEventListener("click", function () { open(btn); });
  });
  box.addEventListener("click", function (e) {
    if (e.target === box) close();
  });
  box.querySelector("[data-lb-close]").addEventListener("click", close);
  box.querySelector("[data-lb-prev]").addEventListener("click", function () { show(current - 1); });
  box.querySelector("[data-lb-next]").addEventListener("click", function () { show(current + 1); });

  document.addEventListener("keydown", function (e) {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // Geser sentuh untuk pindah foto di layar kecil
  var sx = null;
  box.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    sx = null;
  });

  applyFilter("all");
})();
