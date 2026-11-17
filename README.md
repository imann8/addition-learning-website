# Taman Tambah Ceria (Addition Garden Adventure)

Laman web pembelajaran interaktif **Matematik Tahun 1 (KSSR DSKP)** bagi **Standard Kandungan 2.2 (Tambah)** dan **Standard Pembelajaran 2.2.2 (Menambah dua nombor hasil tambah dalam lingkungan 100)**.

## Maklumat Pembangun
- **Nama:** Iman Kamila Binti Redzuan
- **Kelas:** MT1825
- **E-mel:** g-ipgp253107870@moe-dl.edu.my
- **Institusi:** Institut Pendidikan Guru Kampus Tun Abdul Razak

---

## Cara Muat Naik ke GitHub & Deploy ke Netlify

### Langkah 1: Muat Naik ke GitHub
1. Log masuk ke akaun [GitHub](https://github.com).
2. Klik **New Repository** dan namakan repositori sebagai `taman-tambah-ceria`.
3. Muat naik fail `index.html`, `style.css`, `script.js`, dan `README.md` ke dalam repositori tersebut (terus di akar / *root folder*).
4. Klik **Commit changes**.

### Langkah 2: Deploy melalui Netlify (Tanpa Proses Build Rumit)
1. Log masuk ke [Netlify](https://www.netlify.com) menggunakan akaun GitHub anda.
2. Klik **Add new site** ➔ **Import an existing project**.
3. Pilih **Deploy with GitHub** dan pilih repositori `taman-tambah-ceria`.
4. Biarkan bahagian *Build command* kosong dan *Publish directory* sebagai `.` (atau kosong).
5. Klik **Deploy site**. Dalam beberapa saat, laman web anda akan aktif dengan pautan `.netlify.app` yang boleh diakses melalui telefon Android, tablet, dan komputer.

---

## Cara Menggantikan Foto Profil Pembangun
1. Simpan gambar profil rasmi anda (contohnya `profil-iman.jpg`) di dalam folder yang sama dengan `index.html`.
2. Buka fail `index.html` dan cari bahagian `id="developerPhotoFrame"` di bawah seksyen `<!-- ==================== ABOUT / METADATA & DIGITAL ETHICS ==================== -->`.
3. Gantikan kandungan `<div class="photo-frame-placeholder" id="developerPhotoFrame">...</div>` dengan tag imej:
   ```html
   <img src="profil-iman.jpg" alt="Iman Kamila Binti Redzuan" style="width:100%; border-radius:18px; border:3px solid #2e7d32;" />