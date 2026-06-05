import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Backdrop } from "@/components/Backdrop";
import { Logo } from "@/components/Logo";
import {
  Heart,
  MessageCircle,
  Shield,
  Sparkles,
  ArrowRight,
  Star,
  Globe2,
  Clock,
  Zap,
  Lock,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ChatMingle — Meet someone new, chat like old friends" },
      { name: "description", content: "ChatMingle pairs you with a warm, friendly companion every time. No sign-up, no waiting — just real, easy conversation." },
      { property: "og:title", content: "ChatMingle — Meet someone new" },
      { property: "og:description", content: "Real, warm conversations on demand. Start chatting in one tap." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Backdrop />
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* HERO */}
        <section className="relative pt-10 pb-14 sm:pt-16 sm:pb-20 md:pt-24 md:pb-28">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur sm:mb-6">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                India's friendliest chat space
              </div>
              <h1 className="font-display text-3xl font-bold leading-[1.08] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Meet someone <span className="text-gradient">new</span>.
                <br className="hidden xs:block" />{" "}
                Chat like <span className="text-gradient">old friends</span>.
              </h1>
              <p className="mt-5 max-w-lg text-sm text-muted-foreground sm:mt-6 sm:text-base md:text-lg">
                ChatMingle pairs you with a warm, witty companion every time. No swipes, no waits — just real, easy conversation that brightens your day.
              </p>
              <div className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center sm:mt-9">
                <Link to="/chat" className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold btn-hero sm:px-7 sm:py-4">
                  Start Chat <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/about" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-sm font-medium backdrop-blur hover:bg-card sm:py-4">
                  How it works
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4 text-xs text-muted-foreground sm:mt-10">
                <div className="flex -space-x-2">
                  {["A","P","R","S","M"].map((c,i)=>(
                    <div key={i} className="grid h-8 w-8 place-items-center rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent text-xs font-semibold text-primary-foreground shadow-md sm:h-9 sm:w-9 sm:text-sm">
                      {c}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_,i)=>(<Star key={i} className="h-3 w-3 fill-accent text-accent sm:h-3.5 sm:w-3.5" />))}
                  </div>
                  <div className="mt-0.5">Loved by 50,000+ users</div>
                </div>
              </div>
            </div>

            {/* Chat preview card */}
            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/30 blur-3xl" />
              <div className="relative mx-auto w-full max-w-xs animate-float sm:max-w-sm">
                <div className="card-3d p-4 sm:p-5" style={{ transform: "rotate(-2deg)" }}>
                  <div className="flex items-center gap-3 border-b border-border pb-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full btn-hero text-sm font-semibold sm:h-11 sm:w-11 sm:text-base">P</div>
                    <div>
                      <div className="text-sm font-semibold">Priya</div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> online now
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3 text-xs sm:text-sm">
                    <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-muted px-3 py-2 sm:px-4 sm:py-2.5">Hey! Kaise ho? 😊</div>
                    <div className="ml-auto max-w-[82%] rounded-2xl rounded-tr-sm btn-hero px-3 py-2 text-primary-foreground sm:px-4 sm:py-2.5">All good! You?</div>
                    <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-muted px-3 py-2 sm:px-4 sm:py-2.5">Bas chai pee rahi thi ☕ tell me about your day ✨</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-2 hidden w-40 rotate-6 sm:block lg:w-44">
                <div className="card-3d p-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-accent" />
                    <span className="font-medium">New match</span>
                  </div>
                  <p className="mt-1 text-muted-foreground">Aaradhya wants to say hi 👋</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[
            { k: "50K+", v: "Happy chatters" },
            { k: "1M+", v: "Messages a week" },
            { k: "120s", v: "Avg match time" },
            { k: "4.9★", v: "User rating" },
          ].map((s) => (
            <div key={s.v} className="card-3d p-4 text-center sm:p-5">
              <div className="text-2xl font-bold text-gradient sm:text-3xl">{s.k}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </section>

        {/* FEATURES */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-5xl">
              Built for <span className="text-gradient">good vibes</span>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">Everything you need for warm, easy, anytime conversations.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 md:gap-5 lg:grid-cols-3">
            {[
              { icon: Heart, title: "Always warm", desc: "Every chat starts with kindness. Friendly, witty, never robotic." },
              { icon: MessageCircle, title: "New face each time", desc: "Get matched with a different companion every session. Fresh vibes, always." },
              { icon: Shield, title: "Private by design", desc: "No sign up, no number. Your name stays on your device. End anytime." },
              { icon: Zap, title: "Instant matches", desc: "Tap once and you're in. No queues, no waiting around for someone." },
              { icon: Globe2, title: "Made in India", desc: "Hindi, English, Hinglish — talk however feels natural to you." },
              { icon: Clock, title: "24×7 available", desc: "Late night thoughts? Morning chai chats? Someone's always around." },
            ].map((f) => (
              <div key={f.title} className="card-3d p-5 sm:p-7">
                <div className="grid h-11 w-11 place-items-center rounded-2xl btn-hero sm:h-12 sm:w-12">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold sm:mt-5 sm:text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-5xl">
              Three taps to <span className="text-gradient">hello</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3 md:mt-12 md:gap-5">
            {[
              { n: "01", title: "Tell us your name", desc: "Just a first name. Stays on your device — nothing leaves." },
              { n: "02", title: "We match you", desc: "A friendly new companion is ready in seconds." },
              { n: "03", title: "Chat away", desc: "Talk about anything. End the chat whenever you like." },
            ].map((s) => (
              <div key={s.n} className="card-3d relative overflow-hidden p-6 sm:p-7">
                <div className="text-5xl font-bold text-gradient opacity-70 sm:text-6xl">{s.n}</div>
                <h3 className="mt-3 text-base font-semibold sm:text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-5xl">
              What people are <span className="text-gradient">saying</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 md:gap-5 lg:grid-cols-3">
            {[
              { name: "Rohan, 24", text: "Honestly the only app that doesn't feel awkward. The chats just flow." },
              { name: "Arjun, 27", text: "Late night chai + ChatMingle = my new ritual. So wholesome." },
              { name: "Vikram, 22", text: "Different person every time keeps it interesting. Love it." },
            ].map((t) => (
              <div key={t.name} className="card-3d p-5 sm:p-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_,i)=>(<Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />))}
                </div>
                <p className="mt-4 text-sm leading-relaxed">"{t.text}"</p>
                <div className="mt-4 text-xs font-medium text-muted-foreground">— {t.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST */}
        <section className="py-8 md:py-10">
          <div className="card-3d grid items-center gap-5 p-5 sm:p-7 md:grid-cols-[auto_1fr_auto] md:gap-6">
            <div className="grid h-12 w-12 place-items-center rounded-2xl btn-hero sm:h-14 sm:w-14">
              <Lock className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold sm:text-xl">Your privacy comes first</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No phone numbers. No accounts. No tracking across the web. Just chat — and leave when you want.
              </p>
            </div>
            <Link to="/about" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition hover:bg-card md:w-auto">
              Learn more <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="my-14 md:my-24">
          <div className="card-3d relative overflow-hidden p-7 text-center sm:p-10 md:p-20">
            <div className="absolute -top-20 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-3xl" />
            <Logo className="mx-auto h-10 w-auto sm:h-12" />
            <h2 className="mt-5 font-display text-2xl font-bold sm:mt-6 sm:text-3xl md:text-5xl">
              Ready to <span className="text-gradient">say hi</span>?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
              Your next favourite conversation is one tap away.
            </p>
            <Link to="/chat" className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold btn-hero sm:mt-8 sm:px-8 sm:py-4">
              Start Chat <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
