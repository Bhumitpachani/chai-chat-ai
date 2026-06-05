import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Logo className="h-8 w-auto" />
          <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/news">News</Link>
            <Link to="/chat">Start Chat</Link>
          </nav>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ChatMingle. Made with ❤ in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
