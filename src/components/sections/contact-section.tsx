"use client";

import { motion } from "framer-motion";
import { Loader2, Mail, Send } from "lucide-react";
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

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? "")
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to send message.");
      }

      setStatus("success");
      setMessage(data.message ?? "Message sent. I will get back to you soon.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send message.");
    }
  }

  return (
    <section id="contact" className="section-shell relative py-24">
      <SectionHeading eyebrow="Contact" title="Let’s build something useful, elegant, and technically serious.">
        Reach out for AI engineering, full-stack product work, collaboration, or internship opportunities.
      </SectionHeading>

      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          className="glass rounded-[32px] p-7"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.72 }}
        >
          <span className="rounded-2xl bg-primary/10 p-3 text-primary ring-1 ring-primary/15">
            <Mail className="inline h-6 w-6" />
          </span>
          <h3 className="mt-7 text-2xl font-semibold text-white">Contact Details</h3>
          <p className="mt-4 leading-7 text-slate-300">
            I’m reachable by email and active across GitHub, LinkedIn, LeetCode, and CodeChef.
          </p>
          <a
            href={profile.links.email}
            className="mt-6 inline-block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 transition hover:border-primary/35 hover:text-white"
          >
            {profile.email}
          </a>
          <div className="mt-7 flex gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="focus-ring rounded-full border border-white/10 p-3 text-slate-300 transition hover:border-primary/35 hover:bg-primary/10 hover:text-white"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          className="glass rounded-[32px] p-6 md:p-7"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.72, delay: 0.08 }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-300">
              Name
              <input
                name="name"
                required
                minLength={2}
                className="mt-2 w-full rounded-2xl border-white/10 bg-slate-950/55 px-4 py-3 text-white placeholder:text-slate-600 focus:border-primary focus:ring-primary"
                placeholder="Your name"
              />
            </label>
            <label className="text-sm font-medium text-slate-300">
              Email
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-2xl border-white/10 bg-slate-950/55 px-4 py-3 text-white placeholder:text-slate-600 focus:border-primary focus:ring-primary"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="mt-4 block text-sm font-medium text-slate-300">
            Message
            <textarea
              name="message"
              required
              minLength={10}
              rows={6}
              className="mt-2 w-full resize-none rounded-2xl border-white/10 bg-slate-950/55 px-4 py-3 text-white placeholder:text-slate-600 focus:border-primary focus:ring-primary"
              placeholder="Tell me what you want to build..."
            />
          </label>
          <button
            type="submit"
            disabled={status === "loading"}
            className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send Message
          </button>
          {message ? (
            <p className={status === "success" ? "mt-4 text-sm text-accent" : "mt-4 text-sm text-amber-100"}>
              {message}
            </p>
          ) : null}
        </motion.form>
      </div>
    </section>
  );
}
