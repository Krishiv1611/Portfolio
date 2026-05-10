"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillPathways, techCategories } from "@/lib/profile";
import { cn } from "@/lib/utils";

type Pathway = (typeof skillPathways)[number];

export function TechStackSection() {
  const [activePathId, setActivePathId] = useState<Pathway["id"]>("frontend");
  const [activeSkill, setActiveSkill] = useState("HTML");
  const activePath = skillPathways.find((path) => path.id === activePathId) ?? skillPathways[0];

  const skillToPath = useMemo(() => {
    const map = new Map<string, Pathway>();
    skillPathways.forEach((path) => path.nodes.forEach((node) => map.set(node, path)));
    return map;
  }, []);

  function selectSkill(skill: string, preferredPathId?: Pathway["id"]) {
    const normalizedSkill = normalizeSkill(skill);
    const path =
      (preferredPathId ? skillPathways.find((item) => item.id === preferredPathId) : undefined) ??
      skillToPath.get(normalizedSkill);
    if (!path) {
      return;
    }
    setActivePathId(path.id);
    setActiveSkill(normalizedSkill);
  }

  return (
    <section id="skills" className="section-shell relative py-24">
      <SectionHeading eyebrow="Tech Stack" title="Interactive skill pathways, not a static logo wall.">
        Click a skill and the connected stack lights up: frontend, backend, GenAI, and systems tooling.
      </SectionHeading>

      <div className="grid gap-5 lg:grid-cols-[0.84fr_1.16fr]">
        <div className="space-y-4">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="glass rounded-3xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ delay: categoryIndex * 0.06 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-2xl bg-primary/10 p-3 text-primary ring-1 ring-primary/15">
                  <category.icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold text-white">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => {
                  const normalizedItem = normalizeSkill(item);
                  const selected =
                    activeSkill === normalizedItem ||
                    (activePath.nodes as readonly string[]).includes(normalizedItem);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => selectSkill(item)}
                      className={cn(
                        "focus-ring rounded-full border px-3 py-2 text-sm transition",
                        selected
                          ? "border-primary/45 bg-primary/10 text-white"
                          : "border-white/10 bg-white/[0.035] text-slate-400 hover:border-white/20 hover:text-white"
                      )}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="glass overflow-hidden rounded-[32px] p-5 md:p-7"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75 }}
        >
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm text-slate-400">
                <MousePointer2 className="h-4 w-4 text-primary" />
                Tap any node to generate its path
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Skill Pathways</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex">
              {skillPathways.map((path) => (
                <button
                  key={path.id}
                  type="button"
                  onClick={() => {
                    setActivePathId(path.id);
                    setActiveSkill(path.nodes[0]);
                  }}
                  className={cn(
                    "focus-ring rounded-full border px-3 py-2 text-xs font-semibold transition",
                    activePathId === path.id
                      ? "border-white/20 bg-white text-slate-950"
                      : "border-white/10 bg-white/[0.035] text-slate-400 hover:text-white"
                  )}
                >
                  {path.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {skillPathways.map((path) => (
              <PathwayRow
                key={path.id}
                path={path}
                active={path.id === activePathId}
                activeSkill={activeSkill}
                onSelect={(skill) => selectSkill(skill, path.id)}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activePath.id}-${activeSkill}`}
              className="mt-7 rounded-3xl border border-white/10 bg-slate-950/54 p-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="rounded-2xl p-3 ring-1"
                  style={{
                    backgroundColor: `${activePath.color}18`,
                    color: activePath.color,
                    borderColor: `${activePath.color}33`
                  }}
                >
                  <activePath.icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {activePath.label} path
                  </p>
                  <h4 className="mt-1 text-xl font-semibold text-white">{activeSkill}</h4>
                  <p className="mt-3 leading-7 text-slate-300">{activePath.summary}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function normalizeSkill(skill: string) {
  const aliases: Record<string, string> = {
    "React.js": "React",
    "Neon": "Neon/PostgreSQL"
  };

  return aliases[skill] ?? skill;
}

function PathwayRow({
  path,
  active,
  activeSkill,
  onSelect
}: {
  path: Pathway;
  active: boolean;
  activeSkill: string;
  onSelect: (skill: string) => void;
}) {
  return (
    <motion.div
      className={cn(
        "rounded-3xl border p-4 transition",
        active ? "border-white/15 bg-white/[0.045]" : "border-white/8 bg-white/[0.018] opacity-55"
      )}
      animate={{ opacity: active ? 1 : 0.52 }}
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className="rounded-xl p-2"
          style={{ backgroundColor: `${path.color}16`, color: path.color }}
        >
          <path.icon className="h-4 w-4" />
        </span>
        <p className="text-sm font-semibold text-white">{path.label}</p>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-max items-center">
          {path.nodes.map((node, index) => {
            const selected = active && activeSkill === node;
            const pathActive = active;
            return (
              <div key={node} className="flex items-center">
                <motion.button
                  type="button"
                  onClick={() => onSelect(node)}
                  className={cn(
                    "focus-ring relative rounded-full border px-4 py-2 text-sm font-medium transition",
                    selected
                      ? "border-white bg-white text-slate-950"
                      : pathActive
                        ? "border-white/15 bg-slate-950/62 text-white"
                        : "border-white/10 bg-slate-950/38 text-slate-500"
                  )}
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {selected ? (
                    <motion.span
                      layoutId="active-skill-glow"
                      className="absolute inset-0 -z-10 rounded-full blur-xl"
                      style={{ backgroundColor: `${path.color}55` }}
                    />
                  ) : null}
                  {node}
                </motion.button>

                {index < path.nodes.length - 1 ? (
                  <div className="relative h-px w-10 bg-white/10 sm:w-14">
                    <motion.div
                      className="absolute inset-y-0 left-0 origin-left"
                      style={{ backgroundColor: path.color }}
                      animate={{ scaleX: active ? 1 : 0 }}
                      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
