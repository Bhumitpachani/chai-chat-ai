import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Backdrop } from "@/components/Backdrop";
import { Newspaper } from "lucide-react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — ChatMingle" },
      { name: "description", content: "Updates, releases and announcements from the ChatMingle team." },
      { property: "og:title", content: "News — ChatMingle" },
      { property: "og:description", content: "Updates and announcements from ChatMingle." },
    ],
  }),
  component: News,
});

const ITEMS = [
  { date: "June 02, 2026", title: "Voice notes are coming soon", body: "We're testing soft voice replies for a more natural chat feel. Early access opens next month." },
  { date: "May 18, 2026", title: "New companion personalities", body: "We expanded our companion roster with twelve fresh personalities, each with their own vibe and style." },
  { date: "Apr 27, 2026", title: "Cleaner, calmer chat room", body: "A redesigned chat room with smoother animations, faster typing and a refreshed colour story." },
  { date: "Apr 02, 2026", title: "50,000 users and counting", body: "Thank you for the love — we just crossed 50K active chatters. Here's to many more late-night conversations." },
];

function News() {
  return (
    <>
      <Backdrop />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="text-sm uppercase tracking-widest text-primary">News</p>
        <h1 className="mt-3 font-display text-4xl font-semibold md:text-6xl">
          What's <span className="text-gradient">new</span>.
        </h1>

        <div className="mt-12 space-y-5">
          {ITEMS.map((n) => (
            <article key={n.title} className="card-3d flex flex-col gap-4 p-5 sm:flex-row sm:gap-5 sm:p-6">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl btn-hero">
                <Newspaper className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{n.date}</div>
                <h2 className="mt-1 font-display text-xl font-semibold">{n.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{n.body}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
