export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="animate-blob absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-primary/40" />
      <div className="animate-blob absolute top-1/3 -right-32 h-[480px] w-[480px] rounded-full bg-accent/40" style={{ animationDelay: "-6s" }} />
      <div className="animate-blob absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-primary/30" style={{ animationDelay: "-12s" }} />
    </div>
  );
}
