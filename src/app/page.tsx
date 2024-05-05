import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className=" mx-auto p-4">
        <h1 className="relative z-10 h-24 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Portal SMK6
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Portal Admin Data Siswa adalah sebuah sistem manajemen online yang
          dirancang khusus untuk memudahkan administrasi data siswa di SMKN6
          Malang. Portal ini menyediakan antarmuka yang intuitif dan mudah
          digunakan bagi admin untuk mengakses, memperbarui, dan mengelola
          informasi siswa secara efisien.
        </p>
      </div>
      <BackgroundBeams />
      <Link className="z-50" href="/dashboard">
        <Button className="bg-blue-600 text-gray-300 hover:bg-slate-700">
          Manager Data Siswa
        </Button>
      </Link>
    </div>
  );
}
