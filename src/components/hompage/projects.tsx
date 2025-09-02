"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  links?: { github?: string; demo?: string };
};

const projects: Project[] = [
  {
    title: "Realtime Dashboard",
    description: "Streaming charts with server actions and optimistic updates.",
    image: "https://i.pinimg.com/1200x/39/50/74/395074fe064db21f5a3f51f56fc48df2.jpg",
    tags: ["Next.js", "WebSockets", "Tailwind"],
    links: { github: "#", demo: "#" },
  },
  {
    title: "3D Product Showcase",
    description: "Interactive 3D viewer with smooth camera transitions.",
    image: "https://i.pinimg.com/1200x/02/86/bb/0286bb72a15f9473bc986c99b9f9859d.jpg",
    tags: ["React Three Fiber", "Framer Motion"],
    links: { demo: "#" },
  },
   {
    title: "3D Product Showcase",
    description: "Interactive 3D viewer with smooth camera transitions.",
    image: "https://i.pinimg.com/1200x/02/86/bb/0286bb72a15f9473bc986c99b9f9859d.jpg",
    tags: ["React Three Fiber", "Framer Motion"],
    links: { demo: "#" },
  }, {
    title: "3D Product Showcase",
    description: "Interactive 3D viewer with smooth camera transitions.",
    image: "https://i.pinimg.com/1200x/02/86/bb/0286bb72a15f9473bc986c99b9f9859d.jpg",
    tags: ["React Three Fiber", "Framer Motion"],
    links: { demo: "#" },
  }, {
    title: "3D Product Showcase",
    description: "Interactive 3D viewer with smooth camera transitions.",
    image: "https://i.pinimg.com/1200x/02/86/bb/0286bb72a15f9473bc986c99b9f9859d.jpg",
    tags: ["React Three Fiber", "Framer Motion"],
    links: { demo: "#" },
  }, {
    title: "3D Product Showcase",
    description: "Interactive 3D viewer with smooth camera transitions.",
    image: "https://i.pinimg.com/1200x/02/86/bb/0286bb72a15f9473bc986c99b9f9859d.jpg",
    tags: ["React Three Fiber", "Framer Motion"],
    links: { demo: "#" },
  },  
  // Add more projects as needed
];

// --- TiltCard for hover effect ---
function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-50, 50], [8, -8]);
  const rotateY = useTransform(springX, [-50, 50], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = e.clientX - rect.left - rect.width / 2;
    const centerY = e.clientY - rect.top - rect.height / 2;
    x.set((centerX / (rect.width / 2)) * 50);
    y.set((centerY / (rect.height / 2)) * 50);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" as const }}
      className="group h-full"
    >
      {children}
    </motion.div>
  );
}

// --- ProjectCard ---
function ProjectCard({ p }: { p: Project }) {
  return (
    <TiltCard>
      <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
        <Card tabIndex={0} className="h-full border-muted-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary">
          <CardHeader>
            <CardTitle className="flex items-start justify-between gap-2">
              <span>{p.title}</span>
              <span className="flex shrink-0 gap-1">
                {p.links?.github && (
                  <Button variant="ghost" size="icon" asChild className="hover:scale-105">
                    <a href={p.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {p.links?.demo && (
                  <Button variant="ghost" size="icon" asChild className="hover:scale-105">
                    <a href={p.links.demo} target="_blank" rel="noreferrer" aria-label="Live Demo">
                      <Globe className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border bg-muted">
              <motion.div className="absolute inset-0" whileHover={{ scale: 1.04 }}>
                <Image
                  src={p.image || "/placeholder.svg"}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.div>
            </div>
            <p className="text-sm text-muted-foreground">{p.description}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <Badge key={t} variant="secondary" className="border bg-background/60 backdrop-blur">{t}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </TiltCard>
  );
}

// --- Projects Component ---
export default function Projects() {
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };

  return (
    <section id="projects" className="relative scroll-mt-20 border-t border-b bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">Featured Projects</h2>
            <p className="mt-2 text-muted-foreground">A selection of work with a focus on UX, performance, and motion.</p>
          </div>
        </div>
        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <motion.div key={p.title} variants={item}>
              <ProjectCard p={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
