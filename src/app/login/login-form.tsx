"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    console.log(res);
    if (!res?.error) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    if (
      res.error == "Cannot read properties of undefined (reading 'password')"
    ) {
      alert(
        `Error: ${res?.error}\nEmail not found. Please make sure your email are correct or register.`
      );
      return;
    } else if (res.error == "CredentialsSignin") {
      alert(
        `Error: ${res?.error}\nIncorrect password. Please make sure your password are correct.`
      );
      return;
    }

    alert(`Unknown Error: ${res?.error}`);
  };

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Ketik email dan password anda untuk masuk ke akun anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Input
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  classNames={{
                    inputWrapper: ["dark:bg-[#020817]", "border-1 rounded-lg"],
                  }}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center"></div>
                <Input
                  id="password"
                  name="password"
                  label="Password"
                  type={isVisible ? "text" : "password"}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <Eye className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  classNames={{
                    inputWrapper: ["dark:bg-[#020817]", "border-1 rounded-lg"],
                  }}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Masuk
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Belum punya akun?{" "}
            <Link href="/register" className="underline">
              Daftar
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default LoginForm;
