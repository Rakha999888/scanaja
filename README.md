# ScanAja 📷

Aplikasi absensi digital berbasis QR Code untuk kampus. Mahasiswa mendaftar, mendapatkan QR Code unik, lalu admin melakukan scan untuk mencatat kehadiran secara real-time.

---

## Fitur

**Mahasiswa**
- Daftar akun dengan email & password
- Lengkapi data diri (nama, jurusan, acara)
- Generate QR Code unik otomatis
- Unduh QR Code sebagai file PNG
- Edit data diri kapan saja

**Admin**
- Login khusus admin
- Scan QR Code mahasiswa via kamera atau upload gambar
- Pencegahan duplikasi absensi (1x per hari per mahasiswa)
- Dashboard daftar mahasiswa (edit & hapus data)
- Dashboard kehadiran real-time dengan filter tanggal & acara

---

## Tech Stack

| Teknologi | Keterangan |
|---|---|
| React 18 | UI Framework |
| Vite 5 | Build tool |
| Tailwind CSS 3 | Styling |
| Firebase Firestore | Database real-time |
| html5-qrcode | Scanner QR via kamera & file |
| qrcode.react | Generate QR Code |
| React Router v6 | Client-side routing |

---

## Struktur Halaman

```
/                   → Landing page
/register           → Daftar akun mahasiswa
/login/user         → Login mahasiswa
/login/admin        → Login admin
/profile            → Lengkapi data diri (protected)
/qrcode             → Lihat & unduh QR Code (protected)
/admin/dashboard    → Dashboard daftar mahasiswa (admin)
/admin/scan         → Scan absensi (admin)
/admin/kehadiran    → Dashboard kehadiran (admin)
```

---

## Cara Menjalankan

### Prasyarat
- Node.js >= 18
- npm atau yarn

### Instalasi

```bash
# Clone repo
git clone https://github.com/rakhakbr/scanaja.git
cd scanaja

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka `http://localhost:5173` di browser.

### Build Production

```bash
npm run build
npm run preview
```

---

## Konfigurasi Firebase

Proyek ini menggunakan Firebase Firestore. Konfigurasi ada di `src/firebase.js`.

Untuk deploy ke project Firebase milikmu sendiri:

1. Buat project baru di [Firebase Console](https://console.firebase.google.com)
2. Aktifkan **Firestore Database**
3. Ganti konfigurasi di `src/firebase.js`:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

### Struktur Koleksi Firestore

```
users/
  {email}/
    email, password, createdAt

profiles/
  {email}/
    nama, email, jurusan, acara

absensi/
  {docId}/
    nama, email, jurusan, acara, tanggal, waktu, timestamp
```

---

## Alur Penggunaan

```
Mahasiswa:
  Daftar → Isi data diri → Dapat QR Code → Tunjukkan ke admin

Admin:
  Login → Scan QR Code mahasiswa → Absensi tercatat → Cek dashboard
```

---

## Autentikasi

Autentikasi menggunakan `localStorage` (tanpa Firebase Auth):

- `scanaja_email` → sesi mahasiswa yang sedang login
- `scanaja_admin` → sesi admin yang sedang login

Login admin menggunakan kredensial yang di-hardcode di `src/pages/LoginAdmin.jsx`.

---

## Acara yang Tersedia

| ID | Label |
|---|---|
| `freshmen-year-2027` | Freshmen Year 2027 |
| `workshop-teknologi` | Workshop Teknologi |
| `wisuda-2026` | Wisuda 2026 |

Untuk menambah acara, edit array `ACARA_LIST` di file-file berikut:
- `src/pages/QRCode.jsx`
- `src/pages/AdminDashboard.jsx`
- `src/pages/DashboardKehadiran.jsx`

---

## Scripts

```bash
npm run dev       # Development server
npm run build     # Build production
npm run preview   # Preview hasil build
```

---

## Lisensi

MIT — bebas digunakan dan dimodifikasi.

---

> ScanAja © 2026 — by rakhakbr
