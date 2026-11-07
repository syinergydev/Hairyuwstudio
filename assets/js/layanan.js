/* Halaman layanan: filter kategori + pencarian nama layanan */
(function () {
  "use strict";
  var tabs = document.querySelectorAll(".tab[data-cat]");
  var search = document.getElementById("svc-search");
  var empty = document.getElementById("svc-empty");
  var groups = document.querySelectorAll(".svc-group");
  var cards = document.querySelectorAll(".service");
  var cat = "all";

  function apply() {
    var q = (search && search.value ? search.value : "").trim().toLowerCase();
    var anyShown = false;
    groups.forEach(function (g) {
      var gcat = g.getAttribute("data-group");
      var catOk = cat === "all" || gcat === cat;
      var groupHasMatch = false;
      g.querySelectorAll(".service").forEach(function (c) {
        var ok = catOk && (!q || c.getAttribute("data-name").indexOf(q) !== -1);
        c.hidden = !ok;
        if (ok) groupHasMatch = true;
      });
      g.hidden = !groupHasMatch;
      if (groupHasMatch) anyShown = true;
    });
    if (empty) empty.hidden = anyShown;
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      cat = t.getAttribute("data-cat");
      tabs.forEach(function (x) {
        x.setAttribute("aria-pressed", x === t ? "true" : "false");
      });
      apply();
    });
  });
  if (search) search.addEventListener("input", apply);
  apply();
})();
