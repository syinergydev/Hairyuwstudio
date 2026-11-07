/* Booking WhatsApp: validasi form, pratinjau pesan, dan pembuka WhatsApp.
   Booking TIDAK dikonfirmasi otomatis; pelanggan diberi tahu untuk menunggu konfirmasi. */
(function () {
  "use strict";
  var WA = "628819838799";
  var form = document.getElementById("booking-form");
  if (!form) return;

  var fields = {
    nama: document.getElementById("b-name"),
    layanan: document.getElementById("b-layanan"),
    tanggal: document.getElementById("b-tgl"),
    jam: document.getElementById("b-jam"),
    catatan: document.getElementById("b-catatan")
  };
  var preview = document.getElementById("b-preview");
  var status = document.getElementById("b-status");
  var copyBtn = document.getElementById("b-copy");
  var resetBtn = document.getElementById("b-reset");

  // Tanggal minimal hari ini (zona waktu lokal)
  var now = new Date();
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  var today = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
  fields.tanggal.setAttribute("min", today);

  // Isi layanan otomatis dari link halaman layanan (?layanan=...)
  var params = new URLSearchParams(window.location.search);
  var pre = params.get("layanan");
  if (pre) {
    var opt = Array.prototype.find.call(fields.layanan.options, function (o) { return o.value === pre; });
    if (opt) fields.layanan.value = pre;
  }

  function formatTanggal(v) {
    if (!v) return "";
    var parts = v.split("-");
    var d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    try {
      return d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    } catch (e) {
      return v;
    }
  }

  function buildMessage() {
    var lines = [
      "Halo Hairyuw Studio, saya ingin booking.",
      "",
      "Nama: " + fields.nama.value.trim(),
      "Layanan: " + fields.layanan.value,
      "Tanggal: " + formatTanggal(fields.tanggal.value),
      "Jam: " + fields.jam.value
    ];
    var catatan = fields.catatan.value.trim();
    lines.push("Catatan: " + (catatan || "-"));
    lines.push("");
    lines.push("Mohon konfirmasi ketersediaannya. Terima kasih.");
    return lines.join("\n");
  }

  function updatePreview() {
    var hasAny = fields.nama.value || fields.layanan.value || fields.tanggal.value || fields.jam.value;
    preview.textContent = hasAny ? buildMessage() : "Isi form untuk melihat pesan.";
  }

  function rules() {
    var out = {};
    var n = fields.nama.value.trim();
    if (!n) out.nama = "Nama wajib diisi.";
    else if (n.length < 3) out.nama = "Nama minimal 3 karakter.";
    else if (!/^[\p{L}][\p{L}\p{M}\s.'-]*$/u.test(n)) out.nama = "Gunakan huruf, spasi, atau tanda baca dasar saja.";
    if (!fields.layanan.value) out.layanan = "Pilih salah satu layanan.";
    if (!fields.tanggal.value) out.tanggal = "Pilih tanggal kunjungan.";
    else if (fields.tanggal.value < today) out.tanggal = "Tanggal tidak boleh sebelum hari ini.";
    if (!fields.jam.value) out.jam = "Pilih jam kunjungan.";
    return out;
  }

  function showErrors(errs) {
    Object.keys(fields).forEach(function (k) {
      var input = fields[k];
      var wrap = input.closest(".field");
      var ids = { nama: "e-name", layanan: "e-layanan", tanggal: "e-tgl", jam: "e-jam" };
      var errEl = document.getElementById(ids[k]);
      var msg = errs[k] || "";
      if (errEl) errEl.textContent = msg;
      if (wrap) wrap.classList.toggle("invalid", !!msg);
      input.setAttribute("aria-invalid", msg ? "true" : "false");
    });
  }

  Object.keys(fields).forEach(function (k) {
    fields[k].addEventListener("input", function () {
      updatePreview();
      if (form.dataset.tried === "1") showErrors(rules());
    });
    fields[k].addEventListener("change", function () {
      updatePreview();
      if (form.dataset.tried === "1") showErrors(rules());
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.dataset.tried = "1";
    var errs = rules();
    showErrors(errs);
    var firstBad = Object.keys(errs)[0];
    if (firstBad) {
      form.classList.remove("shake"); void form.offsetWidth; form.classList.add("shake");
      fields[firstBad].focus();
      status.textContent = "Periksa kembali data yang belum lengkap.";
      return;
    }
    var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(buildMessage());
    window.open(url, "_blank", "noopener");
    status.textContent = "WhatsApp terbuka. Booking Anda menunggu konfirmasi dari Hairyuw Studio.";
  });

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var text = buildMessage();
      var done = function (ok) {
        status.textContent = ok ? "Pesan disalin." : "Gagal menyalin pesan.";
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      form.reset();
      delete form.dataset.tried;
      showErrors({});
      status.textContent = "";
      updatePreview();
    });
  }

  updatePreview();
})();
