# LuxVoyage

> Platform pemesanan perjalanan luar negeri premium dengan kurasi eksklusif

## Deskripsi

LuxVoyage adalah platform pemesanan perjalanan mewah yang menyajikan koleksi perjalanan kurasi untuk klien yang menuntut kualitas dan eksklusivitas. Tidak ada daftar yang tak berujung — hanya pengalaman perjalanan pilihan terbaik yang dirancang untuk kenangan tak terlupakan.

## Fitur Utama

- **Koleksi Perjalanan Kurasi** — Tiga paket perjalanan eksklusif (Swiss Alps, Maldives, Kyoto) dengan detail lengkap
- **Detail Paket Lengkap** — Galeri gambar, itinerary harian, daftar fasilitas, dan opsi upgrade
- **Alur Pemesanan** — Proses booking dengan pilihan upgrade tambahan
- **Permintaan Perjalanan Kustom** — Formulir untuk merancang itinerary pribadi dari nol
- **Dashboard** — Ringkasan dan manajemen pemesanan
- **Testimoni Klien** — Carousel testimoni dari klien premium
- **Galeri Visual** — Showcase foto-foto perjalanan yang menginspirasi
- **Integrasi AI** — Didukung oleh Google Gemini API untuk rekomendasi cerdas

## Teknologi yang Digunakan

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **Animasi:** Motion (Framer Motion)
- **Icons:** Lucide React
- **AI Integration:** Google GenAI (Gemini API)
- **Backend:** Express.js
- **Environment Variables:** dotenv

## Struktur Proyek

```
luxvoyage/
├── src/
│   ├── components/
│   │   ├── BookingFlow.tsx      # Alur pemesanan paket
│   │   ├── CustomRequest.tsx    # Form permintaan perjalanan kustom
│   │   ├── Dashboard.tsx        # Dashboard pengguna
│   │   ├── Home.tsx             # Halaman utama (hero, koleksi, testimoni)
│   │   ├── Layout.tsx           # Layout global (navbar, footer)
│   │   └── PackageDetail.tsx    # Halaman detail paket perjalanan
│   ├── App.tsx                  # Root component & routing state
│   ├── data.ts                  # Data paket, testimoni, utilitas
│   ├── types.ts                 # Definisi tipe TypeScript
│   ├── index.css                # Global styles
│   └── main.tsx                 # Entry point aplikasi
├── .env.example                 # Contoh variabel environment
├── index.html                   # HTML template
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # Konfigurasi TypeScript
└── vite.config.ts               # Konfigurasi Vite
```

## Instalasi

1. Clone repositori ini
2. Install dependencies:

```bash
npm install
```

3. Salin file `.env.example` menjadi `.env` dan isi dengan kredensial Anda:

```bash
cp .env.example .env
```

4. Konfigurasi variabel environment di dalam `.env`:

| Variabel          | Deskripsi                                                                 |
| ----------------- | ------------------------------------------------------------------------- |
| `GEMINI_API_KEY`  | API key untuk Google Gemini AI (dapatkan di Google AI Studio)             |
| `APP_URL`         | URL tempat aplikasi di-host (digunakan untuk link referensial & callback) |
| `VITE_DUITKU_MERCHANT_CODE` | Merchant Code Duitku sandbox (format `DXXXX`) |
| `VITE_DUITKU_API_KEY` | API key Duitku sandbox (32+ char) |
| `VITE_DUITKU_TEST_AMOUNT` | (Opsional) Override amount untuk sandbox test. Default `10000` IDR |

## Menjalankan Aplikasi

### Development Mode

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000` dengan Hot Module Replacement (HMR).

### Production Build

```bash
npm run build
```

Hasil build akan berada di direktori `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Type Checking

```bash
npm run lint
```

### Membersihkan Build

```bash
npm run clean
```

## Paket Perjalanan Tersedia

| Nama Paket                  | Lokasi                | Durasi       | Harga Mulai (IDR) |
| --------------------------- | --------------------- | ------------ | ----------------- |
| Swiss Alps Winter Retreat   | Zermatt, Switzerland  | 7 Hari 6 Malam | Rp 125.000.000  |
| Maldives Private Atoll Escape | Baa Atoll, Maldives | 5 Hari 4 Malam | Rp 95.000.000   |
| Kyoto Imperial Serenity     | Kyoto, Japan          | 6 Hari 5 Malam | Rp 85.000.000   |

Setiap paket dilengkapi dengan:
- Itinerary harian yang detail
- Daftar fasilitas yang termasuk
- Opsi upgrade premium (private jet, yacht, dll.)
- Galeri foto eksklusif

## Routing View State

Aplikasi menggunakan state-based routing dengan `ViewState`:

| State             | Deskripsi                           | Parameter       |
| ----------------- | ----------------------------------- | --------------- |
| `home`            | Halaman utama                       | -               |
| `package`         | Detail paket perjalanan             | `packageId`     |
| `booking`         | Alur pemesanan paket                | `packageId`     |
| `dashboard`       | Dashboard ringkasan pemesanan       | -               |
| `custom_request`  | Form permintaan perjalanan kustom   | -               |

## Kontribusi

Untuk berkontribusi pada proyek ini:

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## Lisensi

© 2026 LuxVoyage. All rights reserved.

---

## Integrasi Payment Gateway (Duitku Sandbox)

Sample integration dengan Duitku payment gateway (sandbox only).

### ⚠️ Peringatan Keamanan (Dummy Only)

API key Duitku ditaruh di frontend bundle (`VITE_DUITKU_*`). Ini **HANYA untuk sample/demo**. Untuk production, API key harus disimpan di server dan semua request Duitku harus di-proxy via backend (Express, Cloudflare Worker, dll).

### Catatan Sample

- Tidak ada kolom `payment_status` di database — order tetap berstatus `pending` setelah user bayar di Duitku. Sample ini cuma menunjukkan flow inquiry → redirect → return URL → status check.
- Order reference yang dipakai Duitku = `order.id` dari Supabase (auto-generated UUID).

### Setup Akun Sandbox

1. Daftar di https://passport.duitku.com/merchant
2. Login → My Project → Add Project (pilih environment **Sandbox**)
3. Edit project untuk lihat **Merchant Code** dan **API Key**
4. Edit `.env` (sudah ada dummy values):
   ```
   VITE_DUITKU_MERCHANT_CODE=D0000            # ganti dengan kode asli
   VITE_DUITKU_API_KEY=sandbox-api-key-...    # ganti dengan key asli
   VITE_DUITKU_TEST_AMOUNT=10000              # boleh dibiarkan
   ```

### Flow Pembayaran

1. User isi form `BookingFlow.tsx` → klik **Confirm Reservation**
2. Order dibuat di Supabase dengan `status='pending'`
3. User klik **Pay Now via Duitku** → frontend call `/v2/inquiry` → redirect ke halaman Duitku
4. User bayar di halaman Duitku (VA, e-wallet, credit card)
5. Duitku redirect balik ke `/#/payment_return/<orderId>`
6. `PaymentReturn.tsx` call `transactionStatus` API → tampilkan success/pending/failed (read-only, tidak update DB)

### CORS di Development

Duitku tidak mengirim `Access-Control-Allow-Origin`, jadi request dari browser langsung akan diblokir. Untuk development, **Vite proxy** sudah dikonfigurasi di `vite.config.ts` untuk route `/duitku-api/*` ke `https://sandbox.duitku.com`.

### Untuk Production

1. **WAJIB** pakai backend proxy (jangan expose API key di frontend)
2. Ganti base URL di `src/lib/duitku.ts` dari `/duitku-api/webapi` ke endpoint backend Anda
3. Konfirmasi limit amount Duitku (paket LuxVoyage 85-125jt perlu klarifikasi)
4. Setup callback URL yang public untuk real-time notification (opsional, sudah ada fallback returnUrl + status check)
5. Tambah kolom `payment_status` di tabel `orders` jika perlu persist payment state

### Referensi

- Duitku Docs: https://docs.duitku.com/payment-gateway/api-browser/
- Sandbox Test Cards: `4000 0000 0000 0044` (VISA) / `5500 0000 0000 0004` (MASTERCARD), exp `03/33`, CVV `123`
