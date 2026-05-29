import { Suspense } from "react";
import { Topbar } from "@/components/topbar";
import { CarteShell } from "@/components/carte-shell";

export default function HomePage() {
  return (
    <>
      <Topbar />
      <main className="flex flex-1 min-h-0 overflow-hidden">
        <Suspense
          fallback={
            <div className="grid flex-1 place-items-center text-sm text-muted-foreground">
              Chargement…
            </div>
          }
        >
          <CarteShell />
        </Suspense>
      </main>
    </>
  );
}
