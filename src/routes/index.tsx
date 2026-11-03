import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { businesses, habits, type BizKey } from "@/lib/habits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Padlock — Keep your small business safe, one tiny habit at a time" },
      { name: "description", content: "8 plain-English habits that protect your email, money and customers. No jargon. About an hour, total." },
      { property: "og:title", content: "Padlock — Small business safety, made simple" },
      { property: "og:description", content: "8 plain-English habits that protect your email, money and customers. No jargon." },
    ],
  }),
  component: Index,
});

const STORE = "padlock-v1";

function Index() {
  const [biz, setBiz] = useState<BizKey | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(STORE) || "{}");
      if (s.biz) setBiz(s.biz);
      if (s.done) setDone(s.done);
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem(STORE, JSON.stringify({ biz, done }));
  }, [biz, done]);

  const b = businesses[biz ?? "other"];
  const pct = Math.round((done.length / habits.length) * 100);
  const next = habits.find((h) => !done.includes(h.id));
  const toggle = (id: string) => setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));

  return (
    <main className="mx-auto max-w-3xl px-5 pb-24">
      <header className="flex items-center justify-between py-6">
        <div className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-foreground text-background">🔒</span>
          Padlock
        </div>
        {biz && (
          <button onClick={() => setBiz(null)} className="rounded-full border px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted">
            {b.emoji} {b.label} · change
          </button>
        )}
      </header>

      {!biz ? (
        <section className="pt-10 animate-in fade-in slide-in-from-bottom-2">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">For people who run it all themselves</p>
          <h1 className="text-5xl font-bold leading-[1.05] md:text-6xl">
            Keep your business <span className="marker">safe from scammers</span>.
          </h1>
          <p className="mt-6 max-w-xl text-xl text-muted-foreground">
            8 small habits. Plain English. Most take 5 minutes. No tech skills needed.
          </p>
          <h2 className="mt-14 text-2xl font-bold">What do you do?</h2>
          <p className="text-muted-foreground">We'll use examples from your world.</p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {(Object.keys(businesses) as BizKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setBiz(k)}
                className="group rounded-2xl border bg-card p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-foreground hover:shadow-lift"
              >
                <div className="text-4xl transition group-hover:scale-110">{businesses[k].emoji}</div>
                <div className="mt-3 text-lg font-semibold">{businesses[k].label}</div>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="animate-in fade-in">
          <div className="rounded-3xl bg-foreground p-7 text-background shadow-lift">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm opacity-70">Your safety score</p>
                <p className="font-display text-6xl font-bold">
                  {done.length}<span className="text-3xl opacity-50">/{habits.length}</span>
                </p>
              </div>
              <p className="max-w-[14rem] text-right text-sm opacity-80">
                {pct === 100 ? "You're safer than most businesses. 🎉" : pct >= 50 ? "Great going — halfway there." : "Every habit closes a door on scammers."}
              </p>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-background/15">
              <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
            {next && (
              <button
                onClick={() => setOpen(next.id)}
                className="mt-6 w-full rounded-2xl bg-primary px-5 py-4 text-left text-primary-foreground transition hover:brightness-110"
              >
                <span className="text-sm opacity-80">Do next · {next.minutes} min</span>
                <span className="block text-lg font-semibold">{next.title} →</span>
              </button>
            )}
          </div>

          <ol className="mt-8 space-y-3">
            {habits.map((h, i) => {
              const isDone = done.includes(h.id);
              const isOpen = open === h.id;
              return (
                <li key={h.id} className={`overflow-hidden rounded-2xl border bg-card shadow-soft transition ${isOpen ? "border-foreground" : ""}`}>
                  <button onClick={() => setOpen(isOpen ? null : h.id)} className="flex w-full items-center gap-4 p-5 text-left">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-lg font-bold ${isDone ? "bg-success text-success-foreground" : "bg-secondary"}`}>
                      {isDone ? "✓" : i + 1}
                    </span>
                    <span className="flex-1">
                      <span className={`block text-lg font-semibold ${isDone ? "text-muted-foreground line-through" : ""}`}>{h.title}</span>
                      <span className="block text-muted-foreground">{h.oneLiner}</span>
                    </span>
                    <span className="hidden rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground sm:block">{h.minutes} min</span>
                  </button>
                  {isOpen && (
                    <div className="space-y-5 border-t px-5 pb-6 pt-5 animate-in fade-in slide-in-from-top-1">
                      <div className="rounded-xl bg-accent p-4 text-accent-foreground">
                        <p className="text-xs font-bold uppercase tracking-widest">Think of it like this</p>
                        <p className="mt-1 font-display text-xl leading-snug">{h.likeThis}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary">Why it matters for you</p>
                        <p className="mt-1 text-lg">{h.whyYou(b)}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary">Do it now</p>
                        <ul className="mt-2 space-y-2">
                          {h.steps.map((s, j) => (
                            <li key={j} className="flex gap-3 text-lg">
                              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 text-xs font-bold">{j + 1}</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => {
                          toggle(h.id);
                          if (!isDone) setOpen(habits.find((x) => x.id !== h.id && !done.includes(x.id))?.id ?? null);
                        }}
                        className={`w-full rounded-xl px-5 py-4 text-lg font-semibold transition ${isDone ? "border bg-card" : "bg-success text-success-foreground hover:brightness-110"}`}
                      >
                        {isDone ? "Undo" : "✓ Done — next one"}
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Saved on this device only. Based on official U.S. government (NIST) guidance for one-person businesses — translated into plain English.
          </p>
        </section>
      )}
    </main>
  );
}
