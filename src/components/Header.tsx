import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { getParsedToken, logout } from "@/services/authServices";

export default function Header() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  useEffect(() => {
    const parsedToken = getParsedToken();
    if (parsedToken && parsedToken.email) {
      setEmail(parsedToken.email);
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleRedirectToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center py-2 border-b-2 border-gray-400">
      <h1 className="text-4xl">Funny Movies</h1>

      {email && <div>Welcome {email}</div>}

      {!email && (
        <div>
          <Button onClick={handleRedirectToLogin}>Login / Register</Button>
        </div>
      )}
    </div>
  );
}
