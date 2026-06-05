import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Backdrop } from "@/components/Backdrop";
import { Heart, Sparkles, Users, Shield } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SakhiConnect" },
      { name: "description", content: "Why SakhiConnect exists, how matching works and what makes the conversations special." },
      { property: "og:title", content: "About — SakhiConnect" },
      { property: "og:description", content: "Why SakhiConnect exists and how it works." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <Backdrop />
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-16 md:py-24">
        <p className="text-sm uppercase tracking-widest text-primary">About</p>
        <h1 className="mt-3 font-display text-4xl font-semibold md:text-6xl">
          Built for the <span className="text-gradient">moments in between</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          SakhiConnect started with a simple idea — sometimes you just want to talk to someone friendly without the awkwardness of starting from scratch. We make that first hello easy.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {[
            { icon: Heart, title: "Warm by default", desc: "Conversations are designed to feel relaxed, kind and judgement-free." },
            { icon: Sparkles, title: "Fresh every time", desc: "A new companion greets you each session — no repeats, no awkward history." },
            { icon: Users, title: "Made in India", desc: "Built and tested with Indian users in mind, including comfortable Hinglish chats." },
            { icon: Shield, title: "Your space", desc: "Your name stays on your device. End any chat whenever you like." },
          ].map((f) => (
            <div key={f.title} className="card-3d p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl btn-hero">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="card-3d mt-12 p-8">
          <h2 className="font-display text-2xl font-semibold">How it works</h2>
          <ol className="mt-5 space-y-4 text-sm text-muted-foreground">
            <li><span className="text-foreground font-medium">1. Tell us your name.</span> Just a first name is enough — we save it locally on your device.</li>
            <li><span className="text-foreground font-medium">2. Get matched.</span> We pair you with a friendly companion. Every session is unique.</li>
            <li><span className="text-foreground font-medium">3. Chat freely.</span> Talk about your day, hobbies, dreams — anything. End the chat whenever you want.</li>
          </ol>
          <Link to="/chat" className="mt-7 inline-flex rounded-full px-6 py-3 text-sm font-medium btn-hero">
            Start your first chat
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
