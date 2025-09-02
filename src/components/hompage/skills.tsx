"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Framer Motion",
  "Tailwind CSS",
  "Node.js",
  "Web Accessibility",
  "RSC + Server Actions",
  "Three.js",
  "Vite",
  "GraphQL",
  "Testing",
]

function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 left-0 h-[60rem] w-[60rem] rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-rose-500/20 via-fuchsia-500/10 to-transparent blur-3xl" />
      <div className="absolute -right-40 top-20 h-[60rem] w-[60rem] rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-emerald-400/20 via-teal-400/10 to-transparent blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.05),transparent)]" />
    </div>
  )
}

function FloatingBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        className="absolute left-10 top-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-2xl"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-rose-500/20 blur-2xl"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t bg-white relative py-16">
      <AuroraBackground />
      <FloatingBlobs />
      <div className="mx-auto max-w-6xl px-4 md:px-6 relative z-10">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-semibold bg-black bg-clip-text text-transparent">
            Skills
          </h2>
          <p className="mt-2 text-muted-foreground max-w-md mx-auto sm:mx-0">
            A toolbox I use to turn ideas into polished products.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
          }}
          className="flex flex-wrap gap-3 justify-center sm:justify-start"
        >
          {skills.map((s) => (
            <motion.div
              key={s}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            >
              <Badge
                variant="secondary"
                className="border bg-background/60 px-3 py-1 backdrop-blur-sm transition-transform hover:scale-105 hover:bg-white/20 cursor-default"
              >
                {s}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
