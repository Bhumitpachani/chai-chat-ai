import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border md:mt-24">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <Logo className="h-7 w-auto sm:h-8" />
          <nav className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground sm:gap-6">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <Link to="/news" className="hover:text-foreground transition-colors">News</Link>
            <Link to="/chat" className="hover:text-foreground transition-colors">Start Chat</Link>
          </nav>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ChatMingle. Made with ❤ in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
