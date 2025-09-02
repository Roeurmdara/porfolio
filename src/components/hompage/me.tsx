"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ScrollReveal } from "../ScrollReveal" // adjust path

// --- Data for the accordion ---
const accordionItems = [
  { id: 1, title: 'Voice Assistant', imageUrl: 'https://i.pinimg.com/1200x/cb/f3/84/cbf38429029df202b2a9c5b7cbc6f2a2.jpg' },
  { id: 2, title: 'AI Image Generation', imageUrl: 'https://i.pinimg.com/736x/44/8e/73/448e73a30ddaf6fb526959dd34511f21.jpg' },
  { id: 3, title: 'AI Chatbot + Local RAG', imageUrl: 'https://i.pinimg.com/1200x/f9/7d/cc/f97dcc1f4c7d2e4ceb47b57dc13060c1.jpg' },
  { id: 4, title: 'AI Agent', imageUrl: 'https://i.pinimg.com/736x/02/86/bb/0286bb72a15f9473bc986c99b9f9859d.jpg' },
  { id: 5, title: 'Visual Understanding', imageUrl: 'https://i.pinimg.com/736x/42/85/7e/42857e2ecd68b18606579aaca5b9eb6f.jpg' },
]

// --- Accordion Item ---
type AccordionItemProps = {
  item: { id: number; title: string; imageUrl: string }
  isActive: boolean
  onMouseEnter: () => void
}

const AccordionItem = ({ item, isActive, onMouseEnter }: AccordionItemProps) => (
  <div
    className={`
      relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden cursor-pointer
      transition-all duration-700 ease-in-out
      ${isActive ? 'w-[300px] md:w-[400px]' : 'w-[60px] md:w-[80px]'}
      flex-shrink-0
    `}
    onMouseEnter={onMouseEnter}
  >
    <img
      src={item.imageUrl}
      alt={item.title}
      className="absolute inset-0 w-full h-full object-cover"
      onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error' }}
    />
    <div className="absolute inset-0 bg-black/30" />
    <span
      className={`
        absolute text-white text-lg font-semibold whitespace-nowrap
        transition-all duration-300 ease-in-out
        ${isActive
          ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0 text-center'
          : 'bottom-24 left-1/2 -translate-x-1/2 rotate-90 origin-bottom-left text-left'
        }
      `}
    >
      {item.title}
    </span>
  </div>
)

// --- Background Blobs ---
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

// --- Main Hero + Accordion ---
export default function HeroAccordion() {
  const [activeIndex, setActiveIndex] = useState(2)

  return (
    <section className="relative isolate overflow-hidden bg-white font-sans" aria-label="Hero">
     
      <div className="mx-auto max-w-6xl grid gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:px-6 md:py-24 items-center">
        
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <ScrollReveal
            size="xl"
            align="left"
            variant="default"
            enableBlur
            baseOpacity={0.15}
            staggerDelay={0.08}
            threshold={0.3}
            containerClassName="mt-4"
            textClassName="font-bold tracking-tight text-gray-900 text-4xl md:text-6xl"
          >
            Accelerate Gen-AI Tasks on Any Device
          </ScrollReveal>
          
          <ScrollReveal
            size="md"
            align="left"
            variant="muted"
            enableBlur
            baseOpacity={0.1}
            staggerDelay={0.04}
            threshold={0.4}
            containerClassName="mt-6"
            textClassName="text-gray-600 text-lg"
          >
            Build high-performance AI apps on-device without the hassle of model compression or edge deployment.
          </ScrollReveal>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-block bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </motion.div>

        {/* Right: Image Accordion */}
        <div className="w-full overflow-x-auto">
          <div className="flex flex-row items-center justify-start gap-4 p-2 md:p-4">
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
