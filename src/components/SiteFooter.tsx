import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg btn-hero">
              <Heart className="h-4 w-4" />
            </div>
            <span className="font-display text-base font-semibold">
              Sakhi<span className="text-gradient">Connect</span>
            </span>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/news">News</Link>
            <Link to="/chat">Start Chat</Link>
          </nav>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SakhiConnect. Made with care in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
