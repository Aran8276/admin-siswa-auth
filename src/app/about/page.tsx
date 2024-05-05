"use client";

import Image from "next/image";
import { CircleUser, GraduationCap, Menu, Search } from "lucide-react";
import { Input as ShadeInput } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ThemeController from "@/components/ThemeController";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const pushToDash = (event: any) => {
    event.preventDefault();
    router.push("/dashboard");
  };

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <GraduationCap className="h-6 w-6" />
              <span className="sr-only">Aran8276</span>
            </Link>
            <Link
              href="/dashboard"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Tentang
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <GraduationCap className="h-6 w-6" />
                  <span className="sr-only">Aran8276</span>
                </Link>
                <Link href="#" className="hover:text-foreground">
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Tentang
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            {/* FORM PENGUMPULAN UNTUK FITUR SEARCH SISWA */}
            <form
              onSubmit={(event) => pushToDash(event)}
              className="ml-auto flex-1 sm:flex-initial"
            >
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <ShadeInput
                  name="query"
                  type="search"
                  placeholder="Cari Data Siswa..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <ThemeController />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>
                  <Link href="#">Setelan</Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <Link href="mailto:aran8276@gmail.com">Developer</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <Link href="#">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex flex-col">
            <span className="text-xl">Tentang</span>
            <span className="mt-2">
              Tugas DPK “Admin Sekolah” yang dibuat oleh Aran8276 untuk SMKN6
              Malang adalah sebuah proyek yang dirancang untuk memperkenalkan
              sistem manajemen data siswa yang efektif dan user-friendly. Proyek
              ini menggunakan UI Library yang modern untuk memastikan pengalaman
              pengguna yang intuitif dan responsif.
            </span>
            <div className="flex flex-col">
              <span>UI Library Digunakan:</span>
              <div className="flex space-x-8">
                <Link href="https://ui.shadcn.com/">
                  <Card className="flex items-center mt-4 h-52 w-48 ">
                    <Image
                      className="mt-6 rounded-lg"
                      alt="Shadecn"
                      height={128}
                      width={128}
                      src="https://avatars.githubusercontent.com/u/139895814?s=280&v=4"
                    />
                    <span className="mt-4">shadecn/ui</span>
                  </Card>
                </Link>
                <Link href="https://nextui.org/">
                  <Card className="flex items-center mt-4 h-52 w-48 ">
                    <Image
                      className="mt-6 rounded-lg"
                      alt="Shadecn"
                      height={128}
                      width={128}
                      src="https://avatars.githubusercontent.com/u/86160567?v=4"
                    />
                    <span className="mt-4">NextUI</span>
                  </Card>
                </Link>
                <Link href="https://tailwindcss.com/">
                  <Card className="flex items-center mt-4 h-52 w-48 ">
                    <Image
                      className="mt-6 rounded-lg"
                      alt="Shadecn"
                      height={128}
                      width={128}
                      src="https://avatars.githubusercontent.com/u/30317862?s=280&v=4"
                    />
                    <span className="mt-4">Tailwind CSS</span>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
