"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Eraser, MoreHorizontal, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Input,
  ModalFooter,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

export type DataSiswa = {
  nis: number;
  nama: string;
  kelas: string;
  hobi: string;
};

export const columns: ColumnDef<DataSiswa>[] = [
  {
    accessorKey: "nis",
    header: "NISN",
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "kelas",
    header: "Kelas",
  },
  {
    accessorKey: "hobi",
    header: "Hobi",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const siswa = row.original;
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
      const {
        isOpen: EditModalIsOpen,
        onOpen: EditModalOnOpen,
        onOpenChange: EditModalOnOpenChange,
      } = useDisclosure();

      const {
        isOpen: DeleteModalIsOpen,
        onOpen: DeleteModalOnOpen,
        onOpenChange: DeleteModalOnOpenChange,
      } = useDisclosure();

      const [data, setData] = useState<DataSiswa[]>([]);
      const [nama, setNama] = useState("");
      const [value, setValue] = React.useState(new Set([]));
      const [kelas, setKelas] = useState("");
      const [hobi, setHobi] = useState("");
      const [isUserAdmin, setAdmin] = useState(false);
      const formRef = useRef<HTMLFormElement>(null);

      const checkUserRole = async () => {
        const res = await fetch("/api/auth/session");
        const session = await res.json();
        const user = session.user;
        const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
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

      const selectHandler = (output: any) => {
        setKelas(output.currentKey);
      };

      const buttonSubmitHandler = () => {
        formRef.current?.requestSubmit();
      };

      const editHandler = (id: number) => {
        invokeCrudAPI("read", { id: id });
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

      const editSubmitHandler = (event: any, id: number) => {
        const formData = new FormData(event.target);
        const nama = formData.get("nama");
        const kelas = formData.get("kelas");
        const hobi = formData.get("hobi");

        const dataToSend = {
          nama: nama,
          kelas: checkSelectKelas(kelas),
          hobi: hobi,
        };

        invokeCrudAPI("update", {
          id: id,
          ...dataToSend,
        }).then(() => {
          window.location.reload();
        });
      };

      const deleteSubmitHandler = (id: number) => {
        invokeCrudAPI("delete", {
          id: id,
        }).then(() => {
          window.location.reload();
        });
      };

      const handleNamaChange = (event: any) => {
        setNama(event.target.value);
      };

      const handleHobiChange = (event: any) => {
        setHobi(event.target.value);
      };

      const kelasHandler = (kelas: string) => {
        if (kelas == "X RPL 1") {
          setKelas("rpl1");
        } else if (kelas == "X RPL 2") {
          setKelas("rpl2");
        } else if (kelas == "X RPL 3") {
          setKelas("rpl3");
        }
      };

      useEffect(() => {
        checkUserRole();
      }, []);

      useEffect(() => {
        const editData = data[0];

        if (editData) {
          setNama(editData.nama);
          kelasHandler(editData.kelas);
          setHobi(editData.hobi);
        }
      }, [data]);
      return (
        <>
          {isUserAdmin ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    editHandler(siswa.nis);
                    EditModalOnOpen();
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    DeleteModalOnOpen();
                  }}
                  className="text-red-500"
                >
                  Hapus
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <></>
          )}

          <Modal
            isOpen={EditModalIsOpen}
            onOpenChange={EditModalOnOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            className="dark:bg-[#020817]"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col mt-2 gap-1">
                    Edit Siswa NISN: {`${siswa.nis}`}
                  </ModalHeader>
                  <ModalBody>
                    <form
                      id="parentForm"
                      ref={formRef}
                      method="dialog"
                      onSubmit={(event) => editSubmitHandler(event, siswa.nis)}
                      className="space-y-5"
                    >
                      <Input
                        name="nama"
                        isRequired
                        errorMessage="Masukan nama siswa"
                        value={nama}
                        onChange={handleNamaChange}
                        // className="focus-visible:ring-0 dark:focus-visible:ring-2"

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
                        isRequired
                        value="rpl1"
                        items={kelasSelect}
                        label="Kelas"
                        placeholder="Pilih Kelas Siswa"
                        selectedKeys={[`${kelas}`]}
                        onSelectionChange={selectHandler}
                        classNames={{
                          trigger: ["dark:bg-[#020817]", "border-1 rounded-lg"],
                        }}
                      >
                        {(animal) => (
                          <SelectItem key={animal.value}>
                            {animal.label}
                          </SelectItem>
                        )}
                      </Select>
                      <Input
                        name="hobi"
                        isRequired
                        errorMessage="Masukan hobi siswa"
                        value={hobi}
                        onChange={handleHobiChange}
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
                      <SquarePen className="text-white mr-2 h-4 w-4" />
                      <span className="text-white">Edit Data Siswa</span>
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <Modal
            isOpen={DeleteModalIsOpen}
            onOpenChange={DeleteModalOnOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            className="dark:bg-[#020817]"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col mt-2 gap-1">
                    Hapus Siswa NISN: {`${siswa.nis}`}
                  </ModalHeader>
                  <ModalBody>
                    <span>
                      Apakah anda yakin ingin menghapus data siswa dengan NISN{" "}
                      {`${siswa.nis}`}?
                    </span>
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
                        onClose();
                        deleteSubmitHandler(siswa.nis);
                      }}
                      className="flex justify-evenly bg-red-700"
                      variant="outline"
                    >
                      <Eraser className="text-white mr-2 h-4 w-4" />
                      <span className="text-white">Hapus Data Siswa</span>
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
    },
  },
];
