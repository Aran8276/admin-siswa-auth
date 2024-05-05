"use server";

import RegisterForm from "./register-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }
  return <RegisterForm />;
}
