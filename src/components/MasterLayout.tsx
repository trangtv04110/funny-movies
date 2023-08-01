import Header from "./Header";

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-8 p-4 min-h-screen max-w-4xl m-auto">
      <Header />
      {children}
    </div>
  );
}
