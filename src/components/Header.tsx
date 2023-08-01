import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { getParsedToken, logout } from "@/services/authServices";
import logo from "../../public/svg/movie.svg";

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
    <div
      className="flex flex-col space-y-2 justify-between items-center py-2 border-b md:flex-row"
      style={{ borderColor: "#0f172a1a" }}
    >
      <Link
        href="/"
        className="flex justify-center items-center space-x-2 text-2xl"
      >
        <Image priority src={logo} alt="Funny movies" height={64} />
        <span>Funny Movies</span>
      </Link>

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
