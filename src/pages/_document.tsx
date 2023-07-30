import Header from "@/components/Header";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="flex flex-col space-y-8 p-4 min-h-screen max-w-4xl m-auto">
        <Header />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
