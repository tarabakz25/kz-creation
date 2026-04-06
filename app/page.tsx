import Menu from "@/components/layouts/Menu";

export default function HomePage() {
  return (
    <main className="flex justify-between px-[5vw] py-[10vh] h-screen">
      <div className="flex flex-col items-start w-full min-h-screen text-white gap-8">
        <h1 className="text-3xl font-futura tracking-wider">
          Welcome to Kz Creation portfolio.
        </h1>
        <Menu />
      </div>
    </main>
  );
}
