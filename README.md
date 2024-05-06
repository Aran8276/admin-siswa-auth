This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## MySQL Database Setup

Database Schema

![MySQL Siswa Table Diagram](https://github.com/Aran8276/admin-siswa/assets/20200187/a8dd1113-3570-4425-9713-9c56e8b9cf9f)

![MySQL Users Table Diagram](https://github.com/Aran8276/admin-siswa-auth/assets/20200187/321b6b68-9598-447e-913b-6e5707ca57bf)


Setup with `.env.local`
```env
# Email administrator untuk autentikasi CRUD 
NEXT_PUBLIC_ADMIN_EMAIL=admin@default.com

# Koneksi database MySQL
DB_HOST=localhost
DB_NAME=dbname
DB_USER=root
DB_PASS=

# Data next-auth (SECRET utk JWT, dan URL untuk base URL)
NEXTAUTH_SECRET="" # Generate menggunakan "openssl rand -base64 32" di terminal. Masukan string dalam kutip
NEXTAUTH_URL="http://localhost:3000"
```


## Preview

![Photo](https://github.com/Aran8276/admin-siswa/assets/20200187/0811dc5c-a94a-475d-821a-1af3ff6a1ffe)

![Screenshot 2024-05-06 at 08-06-16 Portal SMKN6 Malang](https://github.com/Aran8276/admin-siswa-auth/assets/20200187/84a46bdb-55d7-482f-98a2-cab0b4915c23)

![Screenshot 2024-05-06 at 08-06-39 Portal SMKN6 Malang](https://github.com/Aran8276/admin-siswa-auth/assets/20200187/95c74f6e-7c69-4907-9c9f-a6d3a9e671bf)

![Screenshot 2024-05-06 at 08-07-52 Portal SMKN6 Malang](https://github.com/Aran8276/admin-siswa-auth/assets/20200187/65abe2fe-e185-475e-bd0d-4d0b16723b91)
