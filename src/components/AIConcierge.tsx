import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { chatFn } from "../server-fns/chat.server";
import iconUrl from "@/assets/Logo/ICON.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "How many coaches do I need for 150 people?",
  "What's the price for a London to Edinburgh trip?",
  "Do you do airport transfers?",
  "Can I book a Rolls-Royce for a wedding?",
];

// Shared state via module-level ref so ConciergeCTA can toggle it
type ToggleFn = () => void;
let _toggle: ToggleFn | null = null;
export function toggleChatbot() { _toggle?.(); }
export function getChatbotIcon() { return iconUrl; }

export function AIConcierge() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm the SJT Coaches AI concierge. Ask me anything about our fleet, pricing, or services — I'm here to help.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Register toggle function
  useEffect(() => {
    _toggle = () => setOpen((o) => !o);
    return () => { _toggle = null; };
  }, []);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");
    const userMsg: Message = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);
    try {
      const { reply } = await chatFn({ data: { messages: next.slice(-10) } });
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Sorry, I'm having trouble right now. Please call 020 7167 6648 or email info@sjtcoaches.co.uk." }]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed bottom-24 right-4 md:right-6 z-[9998] w-[340px] sm:w-[380px] bg-white border border-border shadow-2xl flex flex-col print:hidden"
      style={{ maxHeight: "420px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-ink text-ivory border-b border-ivory/10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center">
            <img src={iconUrl} alt="SJT" className="h-7 w-7 object-contain" />
          </div>
          <div>
            <div className="text-sm font-medium">SJT Concierge</div>
            <div className="flex items-center gap-1.5 text-[0.6rem] text-ivory/50">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI Assistant
            </div>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="text-ivory/60 hover:text-ivory transition-colors" aria-label="Close chat">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/30" style={{ minHeight: 0 }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
              m.role === "user"
                ? "bg-ink text-ivory rounded-tl-xl rounded-tr-sm rounded-bl-xl rounded-br-xl"
                : "bg-white border border-border text-ink rounded-tl-sm rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm"
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-border px-3.5 py-2.5 rounded-tl-sm rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin text-champagne-deep" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-3 py-2 border-t border-border bg-white flex flex-wrap gap-1.5">
          {SUGGESTED.map((s) => (
            <button key={s} onClick={() => send(s)}
              className="text-[0.65rem] px-2.5 py-1 border border-border rounded-full hover:border-champagne-deep hover:text-champagne-deep transition-colors text-muted-foreground">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-3 border-t border-border bg-white">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask anything…"
          className="flex-1 text-sm outline-none bg-transparent placeholder:text-muted-foreground"
          disabled={loading}
        />
        <button onClick={() => send()} disabled={!input.trim() || loading}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-ivory hover:bg-midnight disabled:opacity-30 transition-colors shrink-0"
          aria-label="Send">
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
