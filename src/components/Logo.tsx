import logo from "@/assets/chatmingle-logo.png.asset.json";

export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return <img src={logo.url} alt="ChatMingle" className={className} draggable={false} />;
}
