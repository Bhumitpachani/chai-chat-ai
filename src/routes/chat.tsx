import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Backdrop } from "@/components/Backdrop";
import { Logo } from "@/components/Logo";
import { sendChat } from "@/lib/chat.functions";
import { pickUniqueGirlName } from "@/lib/girlNames";
import { Heart, Send, LogOut, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat — ChatMingle" },
      { name: "description", content: "Start your conversation. Meet a new companion and chat freely." },
    ],
  }),
  component: ChatPage,
});

type Stage = "name" | "matching" | "chatting";
type Msg = { role: "user" | "assistant"; content: string };

const PROGRESS_STEPS = [
  "Finding someone friendly nearby…",
  "Reading vibes and interests…",
  "Pouring a cup of chai…",
  "Almost there…",
];

function ChatPage() {
  const [stage, setStage] = useState<Stage>("name");
  const [userName, setUserName] = useState("");
  const [companion, setCompanion] = useState<string>("");

  // Restore stored name
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("user_name");
    if (saved) setUserName(saved);
  }, []);

  if (stage === "name") {
    return (
      <NameStage
        initial={userName}
        onSubmit={(n) => {
          localStorage.setItem("user_name", n);
          setUserName(n);
          setStage("matching");
        }}
      />
    );
  }
  if (stage === "matching") {
    return (
      <MatchingStage
        userName={userName}
        onReady={(name) => {
          setCompanion(name);
          setStage("chatting");
        }}
      />
    );
  }
  return <ChatRoom userName={userName} companion={companion} />;
}

/* ---------- Stage: Name ---------- */
function NameStage({ initial, onSubmit }: { initial: string; onSubmit: (n: string) => void }) {
  const [name, setName] = useState(initial);
  return (
    <>
      <Backdrop />
      <ChatTopBar />
      <main className="mx-auto flex min-h-[calc(100vh-100px)] max-w-md items-center px-5">
        <div className="card-3d w-full p-8">
          <div className="grid h-14 w-14 place-items-center rounded-2xl btn-hero">
            <Heart className="h-7 w-7" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold">What should we call you?</h1>
          <p className="mt-2 text-sm text-muted-foreground">Just your first name — it stays on your device.</p>
          <form
            className="mt-6 flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              const v = name.trim();
              if (v.length >= 2) onSubmit(v);
            }}
          >
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul"
              maxLength={30}
              className="w-full rounded-2xl border border-border bg-input px-5 py-3.5 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="submit"
              disabled={name.trim().length < 2}
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-medium btn-hero disabled:opacity-50"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

/* ---------- Stage: Matching (fake progress) ---------- */
function MatchingStage({ userName, onReady }: { userName: string; onReady: (name: string) => void }) {
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    let p = 0;
    const tick = setInterval(() => {
      // Smooth-ish randomized progress
      const inc = Math.random() * 9 + 4;
      p = Math.min(100, p + inc);
      setProgress(p);
      setStepIdx(Math.min(PROGRESS_STEPS.length - 1, Math.floor((p / 100) * PROGRESS_STEPS.length)));
      if (p >= 100) {
        clearInterval(tick);
        const name = pickUniqueGirlName();
        setTimeout(() => onReady(name), 600);
      }
    }, 350);
    return () => clearInterval(tick);
  }, [onReady]);

  return (
    <>
      <Backdrop />
      <ChatTopBar />
      <main className="mx-auto flex min-h-[calc(100vh-100px)] max-w-md items-center px-5">
        <div className="card-3d w-full p-8 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full btn-hero animate-float">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="mt-6 font-display text-2xl font-semibold">Hey {userName} 👋</h2>
          <p className="mt-2 text-sm text-muted-foreground">{PROGRESS_STEPS[stepIdx]}</p>
          <div className="mt-7 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-[width] duration-300"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, var(--primary), var(--accent))",
              }}
            />
          </div>
          <div className="mt-3 text-xs text-muted-foreground">{Math.floor(progress)}%</div>
        </div>
      </main>
    </>
  );
}

/* ---------- Stage: Chat Room ---------- */
function ChatRoom({ userName, companion }: { userName: string; companion: string }) {
  const navigate = useNavigate();
  const sendChatFn = useServerFn(sendChat);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: `Hi ${userName}! I'm ${companion} 🌸 So nice to meet you. How's your day going?` },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, sending]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setSending(true);
    try {
      const res = await sendChatFn({ data: { userName, companionName: companion, messages: next } });
      setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry yaar, my network's acting up. Try again?" }]);
    } finally {
      setSending(false);
    }
  };

  const endChat = () => {
    navigate({ to: "/" });
  };

  return (
    <>
      <Backdrop />
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-3 py-4 sm:px-5 sm:py-6">

        <div className="card-3d flex flex-1 flex-col overflow-hidden p-0">
          {/* Chat header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full btn-hero text-base font-semibold">
                {companion[0]}
              </div>
              <div>
                <div className="font-medium">{companion}</div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> AI companion · online
                </div>
              </div>
            </div>
            <button
              onClick={endChat}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium transition hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="h-3.5 w-3.5" /> End chat
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollerRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5" style={{ maxHeight: "60vh", minHeight: "320px" }}>
            {messages.map((m, i) => (
              <Bubble key={i} msg={m} companion={companion} />
            ))}
            {sending && (
              <div className="flex items-end gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-full btn-hero text-xs font-semibold">
                  {companion[0]}
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
                  <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                  <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                  <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-border p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message ${companion}…`}
                className="flex-1 rounded-full border border-border bg-input px-5 py-3 text-sm outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={!input.trim() || sending}
                className="grid h-11 w-11 place-items-center rounded-full btn-hero disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

function Bubble({ msg, companion }: { msg: Msg; companion: string }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[78%] rounded-2xl rounded-tr-sm btn-hero px-4 py-2.5 text-sm text-primary-foreground">
          {msg.content}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-end gap-2">
      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full btn-hero text-xs font-semibold">
        {companion[0]}
      </div>
      <div className="max-w-[78%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5 text-sm">
        {msg.content}
      </div>
    </div>
  );
}

function ChatTopBar() {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
      <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs font-medium backdrop-blur hover:bg-card">
        <ArrowLeft className="h-3.5 w-3.5" /> Home
      </Link>
      <Logo className="h-8 w-auto" />
      <div className="w-[76px]" />
    </div>
  );
}
