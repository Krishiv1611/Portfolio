"use client";

import { ArrowUpRight, Loader2, Mail, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile, socialLinks } from "@/lib/profile";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          message: String(form.get("message") ?? "")
        })
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message ?? "Unable to send message.");
      setStatus("success");
      setMessage(data.message ?? "Message sent. I will get back to you soon.");
      formElement.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send message.");
    }
  }

  return (
    <section id="contact" className="section-band bg-ink pt-20 md:pt-28">
      <div className="section-shell">
        <SectionHeading eyebrow="08 / Contact" title="Looking for someone who learns fast and builds across the stack?">
          I am open to software engineering internships and applied AI product teams where I can contribute, learn from strong engineers, and keep growing through real systems.
        </SectionHeading>

        <div className="grid gap-12 pb-20 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16 md:pb-28">
          <div data-reveal>
            <Mail className="h-5 w-5 text-white/44" />
            <h3 className="mt-7 text-2xl font-semibold text-white">Start a conversation.</h3>
            <a
              href={profile.links.email}
              className="focus-ring mt-4 inline-block rounded-sm text-sm font-medium text-white/66 hover:text-white"
            >
              {profile.email}
            </a>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/42">{profile.availability}</p>

            <div className="mt-8 border-t border-white/12">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="pressable focus-ring flex min-h-12 items-center justify-between border-b border-white/12 px-1 text-sm text-white/52 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/28" />
                </a>
              ))}
            </div>
          </div>

          <form
            data-reveal
            onSubmit={onSubmit}
            className="border border-white/12 bg-[#0b0b0d] p-6 md:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-xs font-medium text-white/58">
                Name
                <input
                  name="name"
                  required
                  minLength={2}
                  autoComplete="name"
                  className="mt-2 min-h-12 w-full rounded-md border-white/12 bg-white/[0.035] px-4 text-sm text-white placeholder:text-white/24 focus:border-white/38 focus:ring-1 focus:ring-white/24"
                  placeholder="Your name"
                />
              </label>
              <label className="text-xs font-medium text-white/58">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-2 min-h-12 w-full rounded-md border-white/12 bg-white/[0.035] px-4 text-sm text-white placeholder:text-white/24 focus:border-white/38 focus:ring-1 focus:ring-white/24"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="mt-5 block text-xs font-medium text-white/58">
              Message
              <textarea
                name="message"
                required
                minLength={10}
                rows={6}
                className="mt-2 w-full resize-none rounded-md border-white/12 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-white placeholder:text-white/24 focus:border-white/38 focus:ring-1 focus:ring-white/24"
                placeholder="Tell me about the team, role, or product..."
              />
            </label>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "loading"}
                className="pressable focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-black hover:bg-white/84 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Send message
              </button>
              {message ? (
                <p
                  role="status"
                  aria-live="polite"
                  className={`text-sm ${status === "success" ? "text-white/66" : "text-coral"}`}
                >
                  {message}
                </p>
              ) : null}
            </div>
          </form>
        </div>

        <footer className="flex flex-col gap-3 border-t border-white/12 py-7 font-mono text-[10px] uppercase text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>Krishiv Arora / Aspiring Full-Stack & AI Engineer</span>
          <span>Third-year B.Tech CSE / New Delhi, India</span>
        </footer>
      </div>
    </section>
  );
}
