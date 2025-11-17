# KAI Sarana Lifecycle Command Center

Dashboard dummy untuk Divisi Sarana KAI yang memantau umur aset campuran (lokomotif, rangkaian, KRL, gerbong, dll.) dan menggabungkan perspektif akuntansi dengan kondisi teknis. Aplikasi ini hanya menampilkan data statis/dummy untuk eksplorasi desain.

## Fitur Utama

- **Sidebar kategori**: Menu utama, management, dan setting dengan navigasi sticky + scroll internal.
- **Kartu ringkasan lifecycle**: Total portfolio, jumlah yang perlu diremajakan, wajib ganti, dan estimasi nilai ekonomi.
- **Distribusi umur**: Bar progress menampilkan konsentrasi usia aset.
- **Simulasi Capex**: Grafik ringan (SVG) dengan highlight tiap periode.
- **Tabel prioritas sarana**: Badge status kesehatan, rekomendasi tindakan, serta estimasi biaya dalam format singkat (Rp xx M).
- **Opportunity & Insight**: Progress availability, ide proyek, dan insight finansial.
- **Notifikasi**: Daftar sinyal reminder dengan badge warna.

## Teknologi

- [Next.js 16 (App Router)](https://nextjs.org/)
- React 19
- Tailwind CSS v4 (PostCSS plugin)
- Font Geist
- Komponen utilitas ala Shadcn (Card, Badge, Progress, Sidebar custom)

## Struktur Proyek Singkat

```
app/
  layout.tsx        -> konfigurasi font dan metadata
  page.tsx          -> halaman dashboard (dummy data + UI)
  globals.css       -> tema global (putih elegan)
components/ui/
  card.tsx
  badge.tsx
  progress.tsx
  sidebar.tsx
lib/
  utils.ts          -> helper className (cn)
```

## Menjalankan Secara Lokal

1. Pasang dependensi (jika belum):
   ```bash
   npm install
   ```
2. Jalankan dev server:
   ```bash
   npm run dev
   ```
3. Buka [http://localhost:3000](http://localhost:3000) untuk melihat dashboard.

## Catatan

- Semua angka/aset adalah dummy dan tidak mewakili data resmi KAI.
- Fokus utama proyek ini adalah eksplorasi tata letak UI white-style yang clean + elegan.

## Skrip NPM

- `npm run dev` – menjalankan server pengembangan
- `npm run build` – build production
- `npm run start` – menjalankan hasil build
- `npm run lint` – menjalankan ESLint (dengan @next/eslint-plugin)
