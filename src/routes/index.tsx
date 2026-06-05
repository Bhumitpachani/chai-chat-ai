import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Backdrop } from "@/components/Backdrop";
import { Heart, MessageCircle, Shield, Sparkles, ArrowRight, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SakhiConnect — Chat with warm companions" },
      { name: "description", content: "Start a real conversation. Meet a new friendly companion every time and chat freely on SakhiConnect." },
      { property: "og:title", content: "SakhiConnect — Chat with warm companions" },
      { property: "og:description", content: "Start a real conversation. Meet a new friendly companion every time." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Backdrop />
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5">
        {/* Hero */}
        <section className="relative pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              India's friendliest chat space
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
              Meet someone <span className="text-gradient">new</span>.
              <br /> Chat like <span className="text-gradient">old friends</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              SakhiConnect pairs you with a warm, witty companion every time you start a chat. No swiping, no waiting — just real, easy conversation.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link to="/chat" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium btn-hero">
                Start Chat <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium hover:bg-card">
                How it works
              </Link>
            </div>
            <div className="mt-10 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex -space-x-2">
                {["A","P","R","S"].map((c,i)=>(
                  <div key={i} className="grid h-8 w-8 place-items-center rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent font-medium text-primary-foreground">
                    {c}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_,i)=>(<Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />))}
                <span className="ml-2">Loved by 50,000+ users</span>
              </div>
            </div>
          </div>

          {/* Floating chat preview */}
          <div className="mx-auto mt-20 max-w-md animate-float">
            <div className="card-3d p-5">
              <div className="flex items-center gap-3 border-b border-border pb-3">
                <div className="grid h-10 w-10 place-items-center rounded-full btn-hero font-semibold">P</div>
                <div>
                  <div className="text-sm font-medium">Priya</div>
                  <div className="text-xs text-muted-foreground">online now</div>
                </div>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5">Hey! Kaise ho? 😊</div>
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm btn-hero px-4 py-2.5 text-primary-foreground">All good! You?</div>
                <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5">Bas chai pee rahi thi, tell me about your day ✨</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="grid gap-5 py-10 md:grid-cols-3">
          {[
            { icon: Heart, title: "Always warm", desc: "Every chat starts with kindness. No bots, no pressure — just easy conversation." },
            { icon: MessageCircle, title: "New face each time", desc: "Get matched with a different companion every session. Fresh vibes, every time." },
            { icon: Shield, title: "Private by design", desc: "Your name stays on your device. No sign up. End the chat whenever you want." },
          ].map((f) => (
            <div key={f.title} className="card-3d p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl btn-hero">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="my-20">
          <div className="card-3d relative overflow-hidden p-10 text-center md:p-16">
            <h2 className="font-display text-3xl font-semibold md:text-5xl">
              Ready to <span className="text-gradient">say hi</span>?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Your next favourite conversation is one click away.
            </p>
            <Link to="/chat" className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium btn-hero">
              Start Chat <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
