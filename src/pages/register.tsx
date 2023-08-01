import Button from "@/components/Button";
import EmptyLayout from "@/components/EmptyLayout";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (email && password && passwordConfirm) {
      if (password !== passwordConfirm) {
        toast.error("Confirm password not match");
        return;
      }

      setLoading(true);

      const res = await fetch("/api/users/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data && data.success) {
        toast.success(data.success);

        setEmail("");
        setPassword("");
        setPasswordConfirm("");

        router.push("/login");
      } else {
        toast.error(data.error);
      }

      setLoading(false);
    }
  };

  return (
    <EmptyLayout>
      <div className="m-auto max-w-3xl bg-slate-300 rounded-md p-8 shadow-lg flex flex-col space-y-4">
        <div className="text-2xl text-center">Register</div>

        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Email
          </span>
          <input
            type="email"
            name="email"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Password
          </span>
          <input
            type="password"
            name="password"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Confirm password
          </span>
          <input
            type="password"
            name="confirmPassword"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </label>

        <div className="pt-2 flex justify-end items-center space-x-4">
          <Link href="/" className="text-slate-600">
            Cancel
          </Link>
          <Button
            onClick={handleRegister}
            isLoading={loading}
            disabled={loading}
          >
            Register
          </Button>
        </div>

        <div className="text-slate-600 flex space-x-2 justify-center">
          <span>Have an account?</span>
          <Link href="/login" className="underline">
            Login here
          </Link>
        </div>
      </div>
    </EmptyLayout>
  );
}
