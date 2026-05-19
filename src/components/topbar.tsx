"use client";

import Link from "next/link";
import {
  Search01Icon,
  Notification03Icon,
  Sun03Icon,
  Moon02Icon,
  Home01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function Topbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("hp-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("hp-theme", next ? "dark" : "light");
  }

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
            <HugeiconsIcon icon={Home01Icon} size={18} strokeWidth={2.2} />
          </span>
          <span className="text-base tracking-tight">Homepedia</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            · le marché immobilier à la loupe
          </span>
        </Link>

        <div className="ml-auto flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <div className="relative hidden md:block w-full max-w-sm">
            <HugeiconsIcon
              icon={Search01Icon}
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Rechercher une commune, un quartier, une adresse…"
              className="pl-9 h-9 bg-card"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleTheme}
            aria-label="Basculer le thème"
          >
            <HugeiconsIcon icon={dark ? Sun03Icon : Moon02Icon} size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Notifications">
            <HugeiconsIcon icon={Notification03Icon} size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
