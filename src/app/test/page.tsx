"use client";

import { useEffect, useState } from "react";

export default function page() {
  const [isUserAnAdmin, setAdmin] = useState(false);
  const isUserAdmin = async () => {
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

  useEffect(() => {
    isUserAdmin();
  }, []);

  return (
    <>
      <div>
        <div>
          {isUserAnAdmin ? (
            <>You're an administrator</>
          ) : (
            <>You're not an administrator</>
          )}
        </div>
      </div>
    </>
  );
}
