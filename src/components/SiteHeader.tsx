import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/news", label: "News" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div
        className={[
          "transition-all duration-300",
          scrolled
            ? "bg-white/95 shadow-md shadow-primary/10 backdrop-blur-xl border-b border-border"
            : "glass",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Logo className="h-8 w-auto sm:h-9 md:h-10" />
          </Link>

          <nav className="hidden items-center gap-5 md:flex lg:gap-7">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground font-medium" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/chat"
              className="hidden rounded-full px-4 py-2 text-sm font-medium btn-hero md:inline-flex lg:px-5"
            >
              Start Chat
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/60 backdrop-blur md:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-border px-4 py-4 md:hidden sm:px-6">
            <nav className="flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                  activeProps={{ className: "bg-muted text-foreground" }}
                  activeOptions={{ exact: true }}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/chat"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full px-4 py-3 text-center text-sm font-semibold btn-hero"
              >
                Start Chat
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
