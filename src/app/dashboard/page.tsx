"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DataSiswa, columns } from "./columns";
import { DataTable } from "./data-table";
import { Select, SelectItem } from "@nextui-org/react";
import { Input as ShadeInput } from "@/components/ui/input";
import { Input } from "@nextui-org/react";
import TableLoading from "@/components/TableLoading";
import ThemeController from "@/components/ThemeController";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Plus, CircleUser, Search, GraduationCap, Menu } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

export default function Page() {
  const formRef = useRef<HTMLFormElement>(null);
  const [data, setData] = useState<DataSiswa[]>([]);
  const [tableStatus, setTableStatus] = useState("idle");
  const [displayQuery, setDisplayQuery] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isUserAdmin, setAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  const kelasSelect = [
    {
      label: "X RPL 1",
      value: "rpl1",
    },
    {
      label: "X RPL 2",
      value: "rpl2",
    },
    {
      label: "X RPL 3",
      value: "rpl3",
    },
  ];

  const invokeCrudAPI = async (action: string, body?: any) => {
    try {
      if (body) {
        const res = await fetch("api/crud", {
          method: "POST",
          body: JSON.stringify({
            action: action,
            ...body,
          }),
        });
        const resData = await res.json();
        res.status == 200 ? setData(resData) : setData([]);
        return;
      }

      const res = await fetch("api/crud", {
        method: "POST",
        body: JSON.stringify({
          action: action,
        }),
      });
      const resData = await res.json();
      res.status == 200 ? setData(resData) : setData([]);
    } catch (error) {}
  };

  const searchQueryHandler = (event: any) => {
    event.preventDefault();
    const searchQuery = event.target.query.value;
    setDisplayQuery(searchQuery);
    if (searchQuery == "") {
      invokeCrudAPI("fetch");
    }
    invokeCrudAPI("search", { query: searchQuery });
  };

  const checkSelectKelas = (kelas: FormDataEntryValue | null) => {
    if (kelas == "rpl1") {
      return "X RPL 1";
    } else if (kelas == "rpl2") {
      return "X RPL 2";
    } else if (kelas == "rpl3") {
      return "X RPL 3";
    }
  };

  const buttonSubmitHandler = () => {
    formRef.current?.requestSubmit();
  };

  const createFormHandler = (event: any) => {
    const formData = new FormData(event.target);
    const nama = formData.get("nama");
    const rawKelas = formData.get("kelas");
    const hobi = formData.get("hobi");

    const dataToSend = {
      nama: nama,
      kelas: checkSelectKelas(rawKelas),
      hobi: hobi,
    };

    invokeCrudAPI("insert", dataToSend);

    if (formRef.current) {
      formRef.current.reset();
      invokeCrudAPI("fetch");
    }
  };

  const checkUserRole = async () => {
    const res = await fetch("/api/auth/session");
    const session = await res.json();
    const user = session.user;
    const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    setUserEmail(user.email);
    if (!user) {
      console.log("User is not an administrator");
      setAdmin(false);
      return;
    } else if (user.email === email) {
      console.log("User is an administrator");
      setAdmin(true);
      return;
    }
    console.log("User is not an administrator");
    setAdmin(false);
    return;
  };

  useEffect(() => {
    invokeCrudAPI("fetch");
    checkUserRole();
  }, []);

  useEffect(() => {
    if (
      typeof data === "object" &&
      data !== null &&
      "status" in data &&
      data.status === 200
    ) {
      invokeCrudAPI("fetch");
      return;
    } else if (
      typeof data === "object" &&
      data !== null &&
      "status" in data &&
      data.status == 404
    ) {
      setTableStatus("notfound");
      return;
    }
    setTableStatus("idle");
  }, [data]);

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
              className="text-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground transition-colors hover:text-foreground"
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
              onSubmit={(event) => searchQueryHandler(event)}
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
                <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>
                  <Link href="#">Setelan</Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <Link href="mailto:aran8276@gmail.com">Developer</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <button type="button" onClick={() => signOut()}>
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <section className="flex justify-center items-center">
            <div className="flex flex-col">
              <div className="font-bold text-xl">
                {displayQuery == "" ? (
                  <></>
                ) : (
                  <span>Pencarian: {displayQuery}</span>
                )}
              </div>
              <div className="mt-4">
                {tableStatus === "idle" && data.length > 0 ? (
                  <DataTable columns={columns} data={data} />
                ) : tableStatus === "notfound" ? (
                  <span>Data tidak ditemukan</span>
                ) : (
                  <TableLoading />
                )}
              </div>

              {isUserAdmin ? (
                <div className="flex justify-center mt-4">
                  <Button
                    className="w-full bg-blue-700 text-white"
                    onClick={onOpen}
                  >
                    Tambahkan Siswa
                  </Button>
                </div>
              ) : (
                <></>
              )}

              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                className="dark:bg-[#020817]"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col mt-2 gap-1">
                        Tambahkan Siswa
                      </ModalHeader>
                      <ModalBody>
                        <form
                          id="parentForm"
                          ref={formRef}
                          method="dialog"
                          onSubmit={(event) => createFormHandler(event)}
                          className="space-y-5"
                        >
                          <Input
                            isRequired
                            errorMessage="Masukan nama siswa"
                            name="nama"
                            classNames={{
                              inputWrapper: [
                                "dark:bg-[#020817]",
                                "border-1 rounded-lg",
                              ],
                            }}
                            type="text"
                            label="Nama Siswa"
                          />

                          <Select
                            name="kelas"
                            items={kelasSelect}
                            isRequired
                            label="Kelas"
                            placeholder="Pilih Kelas Siswa"
                            classNames={{
                              trigger: [
                                "dark:bg-[#020817]",
                                "border-1 rounded-lg",
                              ],
                            }}
                          >
                            {(animal) => (
                              <SelectItem key={animal.value}>
                                {animal.label}
                              </SelectItem>
                            )}
                          </Select>
                          <Input
                            errorMessage="Masukan hobi siswa"
                            isRequired
                            name="hobi"
                            classNames={{
                              inputWrapper: [
                                "dark:bg-[#020817]",
                                "border-1 rounded-lg",
                              ],
                            }}
                            type="text"
                            label="Hobi Siswa"
                          />
                        </form>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          type="button"
                          onClick={onClose}
                          id="close"
                          variant="outline"
                        >
                          Tutup
                        </Button>

                        <Button
                          type="submit"
                          onClick={() => {
                            if (formRef.current?.checkValidity()) {
                              onClose();
                              buttonSubmitHandler();
                              return;
                            }
                            return;
                          }}
                          className="flex justify-evenly bg-blue-700"
                          variant="outline"
                        >
                          <Plus className="text-white mr-2 h-4 w-4" />
                          <span className="text-white">Tambahkan Siswa</span>
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
