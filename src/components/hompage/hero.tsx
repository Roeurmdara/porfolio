"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import Link from "next/link"
import { ScrollReveal } from "../ScrollReveal" // Adjust path as needed

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
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-rose-500/20 blur-2xl"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden" aria-label="Hero">
    
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-20 pt-16 md:grid-cols-2 md:gap-10 md:px-6 md:pb-28 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Available for freelance
          </div>
          
          {/* Replace the h1 with ScrollReveal */}
          <ScrollReveal
            size="xl"
            align="left"
            variant="default"
            enableBlur={true}
            baseOpacity={0.15}
            staggerDelay={0.08}
            threshold={0.3}
            containerClassName="mt-4"
            textClassName="font-bold tracking-tight"
            springConfig={{
              damping: 20,
              stiffness: 120,
              mass: 0.8
            }}
          >
            I build delightful products that feel fast and fluid.
          </ScrollReveal>
          
          {/* Also add ScrollReveal to the description */}
          <ScrollReveal
            size="md"
            align="left"
            variant="muted"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.04}
            threshold={0.4}
            containerClassName="mt-4"
            springConfig={{
              damping: 25,
              stiffness: 100,
              mass: 1
            }}
          >
            Frontend engineer focused on performant interfaces, creative motion, and accessible design. Currently exploring React Server Components, streaming UIs, and 3D on the web.
          </ScrollReveal>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="group">
              <Link href="#projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="/professional-resume.png" download>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
          <div className="mt-6 flex gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-emerald-500/10 px-2 py-1">Next.js</span>
            <span className="rounded-full bg-rose-500/10 px-2 py-1">Framer Motion</span>
            <span className="rounded-full bg-amber-500/10 px-2 py-1">TypeScript</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative z-10"
        >
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
            <motion.img
              src="https://i.pinimg.com/1200x/c2/94/ba/c294bac3f087bc43afa7830b0dbfd4be.jpg"
              alt="Abstract portrait"
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
            />
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,250,250,0.0),rgba(0,0,0,0.3))]"
              animate={{ opacity: [0.4, 0.25, 0.4] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}