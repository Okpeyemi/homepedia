import { Topbar } from "@/components/topbar";
import { CarteShell } from "@/components/carte-shell";

export default function HomePage() {
  return (
    <>
      <Topbar />
      <main className="flex flex-1 min-h-0 overflow-hidden">
        <CarteShell />
      </main>
    </>
  );
}
