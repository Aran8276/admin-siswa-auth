Ini adalah proyek [Next.js](https://nextjs.org/) yang diinisialisasi dengan [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Mulai

Pertama, jalankan server development:

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

Anda dapat mulai mengedit halaman dengan memodifikasi `app/page.tsx`. Halaman akan diperbarui secara otomatis saat Anda mengedit file tersebut.

Proyek ini menggunakan [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) untuk mengoptimalkan dan memuat Inter, sebuah Font Google khusus.

## Pelajari Lebih Lanjut

Untuk mempelajari lebih lanjut tentang Next.js, lihat sumber daya berikut:

- [Dokumentasi Next.js](https://nextjs.org/docs) - pelajari tentang fitur dan API Next.js.
- [Belajar Next.js](https://nextjs.org/learn) - tutorial interaktif Next.js.

Anda dapat melihat repositori [GitHub Next.js](https://github.com/vercel/next.js/) - umpan balik dan kontribusi Anda sangat dihargai!

## MySQL Database Setup

Schema Database

![MySQL Siswa Table Diagram](https://github.com/Aran8276/admin-siswa/assets/20200187/a8dd1113-3570-4425-9713-9c56e8b9cf9f)

![MySQL Users Table Diagram](https://github.com/Aran8276/admin-siswa-auth/assets/20200187/321b6b68-9598-447e-913b-6e5707ca57bf)


Pengaturan dengan `.env.local`
```env
# Email administrator untuk autentikasi CRUD 
NEXT_PUBLIC_ADMIN_EMAIL=admin@default.com

# Koneksi database MySQL
DB_HOST=localhost
DB_NAME=dbname
DB_USER=root
DB_PASS=

# Data next-auth (SECRET utk JWT, dan URL untuk base URL)
NEXTAUTH_SECRET="" # Generate string Base64 menggunakan "openssl rand -base64 32" di terminal. Masukkan string dalam tanda kutip.
NEXTAUTH_URL="http://localhost:3000" # Node.js development URL, bisa ganti dalam produksi.
```


## Preview

![Photo](https://github.com/Aran8276/admin-siswa/assets/20200187/0811dc5c-a94a-475d-821a-1af3ff6a1ffe)

![Screenshot 2024-05-06 at 08-06-16 Portal SMKN6 Malang](https://github.com/Aran8276/admin-siswa-auth/assets/20200187/84a46bdb-55d7-482f-98a2-cab0b4915c23)

![Screenshot 2024-05-06 at 08-06-39 Portal SMKN6 Malang](https://github.com/Aran8276/admin-siswa-auth/assets/20200187/95c74f6e-7c69-4907-9c9f-a6d3a9e671bf)

![Screenshot 2024-05-06 at 08-07-52 Portal SMKN6 Malang](https://github.com/Aran8276/admin-siswa-auth/assets/20200187/65abe2fe-e185-475e-bd0d-4d0b16723b91)
