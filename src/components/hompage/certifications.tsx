"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type Cert = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  Image?: string;
  description: string;
  tags: string[];
};

function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 left-0 h-[60rem] w-[60rem] rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-rose-500/20 via-fuchsia-500/10 to-transparent blur-3xl" />
      <div className="absolute -right-40 top-20 h-[60rem] w-[60rem] rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-emerald-400/20 via-teal-400/10 to-transparent blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.05),transparent)]" />
    </div>
  );
}

const certs: Cert[] = [
  {
    id: 1,
    title: "Google UX Design Professional Certificate",
    issuer: "Google",
    date: "2024",
    credentialId: "ABC-123-UX",
    verifyUrl: "#",
    Image:
      "https://i.pinimg.com/1200x/91/ce/7a/91ce7a6b7c6bffe3bf3a646eb7fc7767.jpg",
    description:
      "Comprehensive program covering user experience design principles, user research, wireframing, prototyping, and usability testing.",
    tags: ["UX Design", "User Research", "Prototyping", "Figma"],
  },
  {
    id: 2,
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-CLF-001",
    verifyUrl: "#",
    Image:
      "https://i.pinimg.com/1200x/34/85/ac/3485acf4ed112bcbd5f328e670a81e9b.jpg",
    description:
      "Foundational certification demonstrating cloud computing knowledge and AWS services understanding for technical and business roles.",
    tags: ["Cloud Computing", "AWS", "Infrastructure", "Security"],
  },
  {
    id: 3,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-CSA-002",
    verifyUrl: "#",
    Image:
      "https://i.pinimg.com/736x/b9/92/58/b992583b2de4f01b69a4cb1e43d2da3c.jpg",
    description:
      "Advanced certification demonstrating knowledge of AWS architecture, deployment, and best practices for scalable solutions.",
    tags: ["Cloud Computing", "AWS", "Architecture", "Best Practices"],
  },
  {
    id: 4,
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    date: "2024",
    credentialId: "ABC-123-DA",
    verifyUrl: "#",
    Image:
      "https://i.pinimg.com/736x/b9/24/01/b92401d7d7851ea4ee59c6aaed11c5c5.jpg",
    description:
      "Comprehensive program covering data analysis, visualization, and machine learning using Google tools.",
    tags: ["Data Analytics", "Google", "Machine Learning", "Data Visualization"],
  },
  {
    id: 5,
    title: "Google Project Management Professional Certificate",
    issuer: "Google",
    date: "2024",
    credentialId: "ABC-123-PM",
    verifyUrl: "#",
    Image:
      "https://i.pinimg.com/1200x/51/13/3b/51133b2a32917490d572dc3e1f66be35.jpg",
    description:
      "Comprehensive program covering project management principles, methodologies, and tools using Google Workspace.",
    tags: ["Project Management", "Google", "Agile", "Collaboration"],
  },
];

export default function Certifications() {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  // Autoplay
  useEffect(() => {
    if (isInView && !isHovering) {
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % certs.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (carouselRef.current) observer.observe(carouselRef.current);
    return () => observer.disconnect();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")
        setActive((prev) => (prev - 1 + certs.length) % certs.length);
      if (e.key === "ArrowRight")
        setActive((prev) => (prev + 1) % certs.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Touch gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };
  const onTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance)
      setActive((prev) => (prev + 1) % certs.length);
    else if (distance < -minSwipeDistance)
      setActive((prev) => (prev - 1 + certs.length) % certs.length);
  };

  const getCardAnimationClass = (index: number) => {
    const isActive = index === active;
    const isNext = index === (active + 1) % certs.length;
    const isPrev = index === (active - 1 + certs.length) % certs.length;

    if (isActive) return "scale-100 opacity-100 z-20 translate-x-0 rotate-y-0";

    if (typeof window !== "undefined" && window.innerWidth < 640)
      return "scale-90 opacity-0 translate-x-0";

    if (isNext)
      return "translate-x-[30%] sm:translate-x-[35%] md:translate-x-[40%] scale-90 sm:scale-95 opacity-40 sm:opacity-60 z-10 rotate-y-6";
    if (isPrev)
      return "translate-x-[-30%] sm:translate-x-[-35%] md:translate-x-[-40%] scale-90 sm:scale-95 opacity-40 sm:opacity-60 z-10 -rotate-y-6";

    return "scale-90 opacity-0 translate-x-0";
  };

  return (
    <section
      id="certifications"
      className="bg-white w-full mx-auto flex items-center justify-center py-8 sm:py-12 lg:py-16 min-h-screen border-b"
      aria-label="Certifications Carousel"
    >
      <AuroraBackground />
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-black bg-clip-text text-transparent">
            Professional Certifications
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-slate-600 font-medium">
            Continuous Learning & Expertise
          </p>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-500 max-w-xs sm:max-w-2xl mx-auto leading-relaxed">
            Explore my professional development journey through
            industry-recognized certifications that demonstrate commitment to
            excellence and specialized knowledge.
          </p>
        </div>

        <div
          className="relative overflow-hidden h-auto min-h-[500px] xs:min-h-[520px] sm:min-h-[600px] md:h-[680px] lg:h-[750px] xl:h-[800px]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={carouselRef}
          aria-live="polite"
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            {certs.map((cert, index) => (
              <div
                key={cert.id}
                className={`absolute top-0 w-full max-w-[320px] xs:max-w-[340px] sm:max-w-[380px] md:max-w-lg lg:max-w-xl px-2 sm:px-0 transform transition-all duration-500 ease-out ${getCardAnimationClass(
                  index
                )}`}
              >
                <Card className="overflow-hidden bg-white/90 backdrop-blur-sm h-auto sm:h-[550px] md:h-[600px] lg:h-[650px] xl:h-[700px] border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col hover:scale-105">
                  <div className="relative h-56 xs:h-60 sm:h-64 md:h-72 lg:h-80 overflow-hidden bg-gradient-to-br from-white to-slate-50">
                    <div className="relative w-full h-60">
                      {" "}
                      {/* or h-[your-height] */}
                      <Image
                        src={cert.Image || "/placeholder.svg"}
                        alt={`${cert.issuer} certificate`}
                        className="object-contain bg-gray-50 opacity-0 transition-opacity duration-700 ease-in"
                        loading="lazy"
                        onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Ctext x='200' y='100' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='Arial' font-size='16'%3ECertificate Image%3C/text%3E%3C/svg%3E";
                        }}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    <span className="absolute left-2 sm:left-3 top-2 sm:top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] xs:text-[10px] sm:text-xs backdrop-blur shadow-sm">
                      <Award className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 text-emerald-500" />
                      Certified
                    </span>
                  </div>

                  <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-gray-900 line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base md:text-lg font-medium mb-3">
                      {cert.issuer}
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed flex-grow mb-4 sm:mb-6 line-clamp-4 sm:line-clamp-none">
                      {cert.description}
                    </p>

                    <div className="mt-auto space-y-4 sm:space-y-6">
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {cert.tags.slice(0, 4).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-50 text-gray-600 rounded-full text-xs sm:text-sm md:text-base leading-tight font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className="border bg-gray-50 text-[9px] xs:text-[10px] sm:text-xs"
                        >
                          {cert.date}
                        </Badge>
                        {cert.verifyUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="hover:translate-x-0.5 transition-transform text-[10px] xs:text-xs sm:text-sm p-1 sm:p-2"
                          >
                            <a
                              href={cert.verifyUrl}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Verify credential"
                            >
                              Verify
                              <ExternalLink className="ml-1 h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" />
                            </a>
                          </Button>
                        )}
                      </div>

                      {cert.credentialId && (
                        <div className="text-[9px] xs:text-[10px] sm:text-xs text-gray-400">
                          ID: {cert.credentialId}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:block">
            <button
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all hover:scale-110"
              onClick={() =>
                setActive((prev) => (prev - 1 + certs.length) % certs.length)
              }
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all hover:scale-110"
              onClick={() => setActive((prev) => (prev + 1) % certs.length)}
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Pagination dots */}
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center items-center space-x-2 sm:space-x-3 z-30">
            {certs.map((_, idx) => (
              <button
                key={idx}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  active === idx
                    ? "bg-gray-500 w-3 sm:w-4 md:w-5"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setActive(idx)}
                aria-label={`Go to certification ${idx + 1}`}
              />
            ))}
          </div>

          {/* Mobile swipe hint */}
          <div className="sm:hidden absolute bottom-1 left-0 right-0 flex justify-center">
            <p className="text-[10px] text-gray-400 bg-white/80 px-2 py-1 rounded-full">
              Swipe to navigate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
