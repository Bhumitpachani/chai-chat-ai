import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Backdrop } from "@/components/Backdrop";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — ChatMingle" },
      { name: "description", content: "Stories, tips and reflections about conversations, friendship and connection." },
      { property: "og:title", content: "Blog — ChatMingle" },
      { property: "og:description", content: "Stories about conversations and connection." },
    ],
  }),
  component: Blog,
});

const POSTS = [
  { title: "Why small talk is actually big", date: "May 28, 2026", tag: "Connection", excerpt: "The science behind why a 5-minute hello can shift your whole day — and how to start one without overthinking." },
  { title: "The art of asking better questions", date: "May 12, 2026", tag: "Conversation", excerpt: "Move past 'how are you?' with five gentle prompts that open up real, memorable conversations." },
  { title: "Hinglish, and the joy of mixing tongues", date: "Apr 30, 2026", tag: "Culture", excerpt: "Why switching between English and Hindi mid-sentence feels like home for so many of us." },
  { title: "Loneliness in a hyperconnected world", date: "Apr 14, 2026", tag: "Wellbeing", excerpt: "We're more connected than ever, yet lonelier too. A look at what's missing and what helps." },
  { title: "First impressions, second chances", date: "Mar 22, 2026", tag: "Connection", excerpt: "Why the first message rarely defines a conversation — and what actually does." },
  { title: "Listening, the underrated superpower", date: "Mar 03, 2026", tag: "Conversation", excerpt: "Practical ways to listen with attention and make the other person feel truly heard." },
];

function Blog() {
  return (
    <>
      <Backdrop />
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="text-sm uppercase tracking-widest text-primary">Blog</p>
        <h1 className="mt-3 font-display text-4xl font-semibold md:text-6xl">
          Notes on <span className="text-gradient">talking, listening</span> & being heard.
        </h1>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <article key={p.title} className="card-3d flex flex-col p-6">
              <span className="inline-flex w-fit rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                {p.tag}
              </span>
              <h2 className="mt-4 font-display text-xl font-semibold leading-snug">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {p.date}
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
