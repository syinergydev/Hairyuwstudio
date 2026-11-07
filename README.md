# Hairyuw Studio Barbershop — Website Demo

Demo konsep website untuk **Hairyuw Studio Barbershop Mojokerto**, dibuat oleh **SynergyDev**.
Ini adalah demo, **bukan** website resmi dan belum disetujui pemilik.

## Struktur halaman (satu halaman per menu)

| File | Menu | Isi |
|---|---|---|
| `index.html` | Beranda | Hero, keunggulan, layanan favorit, video, galeri singkat, ulasan singkat, CTA booking |
| `tentang.html` | Tentang | Cara kerja (konsultasi → haircut → finishing), ruang, layanan untuk anak dan dewasa |
| `layanan.html` | Layanan | Daftar harga lengkap, filter kategori, pencarian layanan |
| `galeri.html` | Galeri | Hasil haircut, proses, suasana; filter kategori; lightbox |
| `ulasan.html` | Ulasan | Rating 5,0 dari 211 ulasan, tema ulasan, tombol Google Maps |
| `booking.html` | Booking | Form booking dengan validasi, pratinjau pesan, kirim ke WhatsApp |
| `kontak.html` | Kontak | WhatsApp, Instagram, email, Google Maps, alamat |

Setiap halaman memakai header dan footer yang sama, serta satu stylesheet dan file JavaScript terpisah per fungsi.

```
index.html  tentang.html  layanan.html  galeri.html  ulasan.html  booking.html  kontak.html
assets/
  css/style.css
  js/main.js        tema terang/gelap, menu mobile, tombol atas, salin alamat
  js/reveal.js      animasi muncul saat scroll
  js/layanan.js     filter kategori dan pencarian layanan
  js/gallery.js     filter galeri dan lightbox
  js/booking.js     validasi form dan pesan WhatsApp
  img/gallery/      foto hasil haircut, proses, dan suasana (webp)
  logo/             logo asli (horizontal, lingkaran), favicon, apple-touch-icon
  video/            tur barbershop dan layanan homecare (mp4) + poster
netlify.toml        konfigurasi Netlify
robots.txt, sitemap.xml
```

## Fitur

Dipertahankan dari situs yang sudah berjalan (screenshot di arsip): tombol tema terang/gelap, menu layanan per kategori, bagian "Inspirasi Gaya", tautan booking, dan tautan Instagram.

Fitur tambahan: pencarian layanan, pilih layanan dari halaman layanan langsung ke form booking, validasi form dan pratinjau pesan WhatsApp, salin pesan dan salin alamat, lightbox dengan navigasi keyboard dan geser sentuh, tombol WhatsApp mengambang, tombol kembali ke atas, tema terang/gelap yang diingat, JSON-LD untuk SEO lokal, sitemap, robots.txt, Open Graph, dan dukungan `prefers-reduced-motion`.

Palet warna: merah barber (#C8102E), navy (#1B2B45), krem hangat (#F7F1E5), dan biru pole. Tanpa hitam dan emas. Tema terang sebagai default, tema gelap memakai navy. Font: Bricolage Grotesque untuk judul dan DM Sans untuk teks.

Animasi: hero full-image dengan zoom perlahan dan judul yang naik bertahap, marquee layanan, garis progres bergaris barber di atas, header transparan di atas hero, reveal saat scroll dengan jeda berurutan, penghitung rating, parallax pada band, galeri geser horizontal, lightbox dengan transisi, efek hover kartu dan tombol, tombol WhatsApp berdenyut, transisi antar halaman, dan form yang bergetar jika ada error. Semua animasi dimatikan jika pengguna mengaktifkan "kurangi gerakan" di perangkat.

Logo tidak diubah, tidak dipotong bagian tulisannya, dan tidak diganti dengan foto. Logo hanya diberi latar putih agar tetap terbaca di kedua tema.

## Menjalankan lokal

Buka `index.html` langsung di browser, atau jalankan server sederhana:

```
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Deploy

**Netlify (drag & drop):** unggah seluruh isi folder ini ke app.netlify.com/drop. Atau sambungkan repo GitHub dan gunakan `netlify.toml` yang sudah tersedia (tanpa build command, publish dir `.`).

**GitHub Pages:** push isi folder ini ke repo, lalu di Settings → Pages pilih branch `main` dan folder `/ (root)`.

## Sebelum publikasi resmi (wajib)

1. **Domain.** Di `head` setiap halaman dan di `sitemap.xml`, `robots.txt`, serta JSON-LD, domain yang dipakai adalah `https://hairyuw-studio.netlify.app`. Ganti ke domain final bila berbeda. Domain ini juga dipakai situs lama, jadi pastikan tidak menimpa situs yang sudah live tanpa persetujuan pemilik.
2. **Izin foto.** Foto hasil haircut menampilkan pelanggan. Pastikan izin publikasi sudah didapat sebelum website dipublikasikan secara resmi.
3. **Instagram.** Link yang dipakai adalah `instagram.com/yuw.won` sesuai master prompt. Di screenshot situs lama tertulis `@hairyuwstudio_`. Konfirmasi akun yang benar kepada pemilik.
4. **Harga Keratin Treatment.** Daftar harga resmi (gambar PRICE LIST) mencantumkan Rp 200.000–Rp 300.000. Screenshot situs lama mencantumkan Rp 150.000–Rp 250.000. Website ini memakai daftar harga resmi. Konfirmasi harga terbaru ke pemilik.
5. **Layanan "Men's Haircut by Yuwon" (Rp 60.000).** Ada di daftar harga resmi, tetapi tidak ada di situs lama. Ditampilkan di website ini.
6. **Booking.** Booking dikirim lewat WhatsApp dan belum dikonfirmasi otomatis. Halaman menampilkan bahwa pelanggan perlu menunggu konfirmasi dari Hairyuw Studio. Jam operasional tidak ditampilkan karena belum diberikan.
7. **Peta.** Tidak memakai embed Google Maps karena belum ada tautan embed yang terverifikasi. Tersedia tombol ke Google Maps dengan tautan yang diberikan.

## Foto dan video yang tidak dipakai

- `WhatsApp Image … 09.40.18.jpeg` (teks overlay promosi dengan kalimat "harga murah"): tidak dipakai karena tidak sesuai dengan identitas premium dan bukan foto interior/hasil yang jelas.
- Tiga screenshot situs dan katalog lama (`09.43.58`, `09.43.58 (1)`, `09.43.59`): hanya sebagai referensi, tidak dipakai sebagai konten.
- Dua foto kolase (`09.41.52 (1)` dan `09.41.52`) dipisah menjadi dua foto masing-masing agar setiap model rambut utuh.

## Laporan pengujian

Pengujian dilakukan dengan Chromium headless di viewport mobile (390 px) dan desktop (1366 px).

| Pemeriksaan | Hasil |
|---|---|
| Semua 7 halaman dimuat | Lolos |
| Overflow horizontal | Tidak ada (0 px) di semua halaman |
| Error JavaScript di console | Tidak ada |
| Semua file gambar dan video lokal ditemukan | Lolos (termasuk setelah scroll penuh untuk gambar lazy-load) |
| Link internal antar halaman | Lolos |
| Filter kategori layanan | Lolos (Colour menampilkan 5 layanan) |
| Pencarian layanan ("keratin") | Lolos (1 hasil); pesan kosong muncul jika tidak ada hasil |
| Prefill layanan dari halaman layanan ke booking | Lolos |
| Validasi form (nama, layanan, tanggal, jam, tanggal lampau) | Lolos, pesan error tampil per field |
| Pesan WhatsApp (nama, layanan, tanggal dalam bahasa Indonesia, jam, catatan) | Lolos |
| Filter galeri dan jumlah foto | Lolos (Semua 25 foto, Haircut Anak 7 foto) |
| Lightbox: buka, panah kanan, tutup dengan Escape | Lolos |
| Tema terang/gelap dan penyimpanan pilihan | Lolos |
| Menu mobile terbuka | Lolos |

Yang belum diuji di lingkungan ini: pemutaran video di perangkat fisik, ikon brand dari CDN dan font Google (sandbox tidak punya akses internet, jadi keduanya tidak termuat saat pengujian; ikon dan font akan tampil saat website online), dan uji pada Android kecil, Android besar, dan tablet fisik. Disarankan dicek ulang di perangkat-perangkat tersebut sebelum publikasi.
