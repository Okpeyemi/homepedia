"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search01Icon,
  Notification03Icon,
  Sun03Icon,
  Moon02Icon,
  Home01Icon,
  Location04Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { api, locationKey, type LocationLite } from "@/lib/api";
import { useDebounced } from "@/lib/use-api";

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
          <LocationSearch />
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

function LocationSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<LocationLite[]>([]);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(0);
  const debounced = useDebounced(q.trim(), 220);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (debounced.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    const ctrl = new AbortController();
    setLoading(true);
    api
      .searchLocations(debounced, { limit: 8 }, ctrl.signal)
      .then((r) => {
        setResults(r.results);
        setHover(0);
      })
      .catch(() => {
        if (!ctrl.signal.aborted) setResults([]);
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false);
      });
    return () => ctrl.abort();
  }, [debounced]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function pick(loc: LocationLite) {
    setOpen(false);
    setQ("");
    const params = new URLSearchParams({
      loc: locationKey(loc),
      label: loc.label,
      level: loc.admin_level,
    });
    if (loc.parent_label) params.set("parent", loc.parent_label);
    router.push(`/?${params.toString()}`);
  }

  return (
    <div ref={wrapRef} className="relative hidden md:block w-full max-w-sm">
      <HugeiconsIcon
        icon={Search01Icon}
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (!open || !results.length) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHover((h) => Math.min(h + 1, results.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHover((h) => Math.max(h - 1, 0));
          } else if (e.key === "Enter") {
            e.preventDefault();
            pick(results[hover]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        placeholder="Rechercher une commune, un département…"
        className="pl-9 h-9 bg-card"
        aria-autocomplete="list"
        aria-expanded={open}
      />
      {open && q.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full mt-1 overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
          {loading && (
            <div className="px-3 py-2 text-xs text-muted-foreground">Recherche…</div>
          )}
          {!loading && results.length === 0 && (
            <div className="px-3 py-2 text-xs text-muted-foreground">Aucun résultat</div>
          )}
          {results.map((r, i) => (
            <button
              key={`${locationKey(r)}-${r.admin_level}`}
              type="button"
              onMouseEnter={() => setHover(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(r);
              }}
              data-active={i === hover}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors data-[active=true]:bg-accent hover:bg-accent"
            >
              <HugeiconsIcon
                icon={Location04Icon}
                size={14}
                className="shrink-0 text-muted-foreground"
              />
              <span className="min-w-0 flex-1 truncate">
                <span className="font-medium">{r.label}</span>
                {r.parent_label && (
                  <span className="text-muted-foreground"> · {r.parent_label}</span>
                )}
              </span>
              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                {labelFor(r.admin_level)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function labelFor(l: LocationLite["admin_level"]) {
  if (l === "region") return "Région";
  if (l === "department") return "Dépt.";
  return "Commune";
}
