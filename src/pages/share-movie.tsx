import Button from "@/components/Button";
import MasterLayout from "@/components/MasterLayout";
import { getParsedToken, isLoggedIn } from "@/services/authServices";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ShareMovie() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.href = "/login";
    }

    const parsedToken = getParsedToken();
    if (parsedToken && parsedToken.email) {
      setEmail(parsedToken.email);
    }

    if (
      parsedToken &&
      parsedToken.exp &&
      parsedToken.exp > Math.round(Date.now() / 1000)
    ) {
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleShareMovie = async () => {
    if (url) {
      setLoading(true);

      const urlObj = new URL(url);
      const urlParams = urlObj.searchParams;
      const v = urlParams.get("v");

      const newUrl = `https://www.youtube.com/embed/${v}`;

      const res = await fetch("/api/movies/add", {
        method: "POST",
        body: JSON.stringify({
          url: v ? newUrl : url,
          title,
          description,
          createdBy: email,
        }),
      });
      const data = await res.json();

      if (data && data.success) {
        toast.success(data.success);

        router.push("/");

        setUrl("");
        setTitle("");
        setDescription("");
      } else {
        toast.error(data.error);
      }

      setLoading(false);
    }
  };

  return (
    <MasterLayout>
      <div className="m-auto max-w-3xl bg-slate-300 rounded-md p-8 shadow-lg flex flex-col space-y-4">
        <div className="text-2xl text-center">Share a Youtube movie</div>

        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Youtube URL
          </span>
          <input
            type="text"
            name="url"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72"
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-slate-700">
            Title
          </span>
          <input
            type="text"
            name="title"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="block mb-2">
          <span className="block text-sm font-medium text-slate-700">
            Description
          </span>
          <input
            type="text"
            name="description"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div></div>

        <Button
          isLoading={loading}
          disabled={loading}
          onClick={handleShareMovie}
        >
          Share
        </Button>
      </div>
    </MasterLayout>
  );
}
