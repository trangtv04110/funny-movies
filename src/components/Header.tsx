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

  const handleRedirectToShareMoviePage = () => {
    router.push("/share-movie");
  };

  return (
    <div className="flex justify-between items-center py-2 border-b-2 border-gray-400">
      <h1 className="text-4xl">Funny Movies</h1>

      {email && (
        <div className="flex space-x-2 justify-center items-center">
          <span>Welcome {email}</span>
          <Button
            size="sm"
            rounded={false}
            onClick={handleRedirectToShareMoviePage}
          >
            Share a movie
          </Button>
          <Button size="sm" rounded={false} onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}

      {!email && (
        <div>
          <Button size="sm" rounded={false} onClick={handleRedirectToLogin}>
            Login / Register
          </Button>
        </div>
      )}
    </div>
  );
}
