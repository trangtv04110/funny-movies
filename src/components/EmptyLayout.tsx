import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/svg/movie.svg";

export default function EmptyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 p-4 min-h-screen max-w-4xl m-auto">
      <Link
        href="/"
        className="flex justify-center items-center space-x-2 text-2xl"
      >
        <Image priority src={logo} alt="Funny movies" height={64} />
        <span>Funny Movies</span>
      </Link>
      {children}
    </div>
  );
}
