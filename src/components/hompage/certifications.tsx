"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

type Cert = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  image?: string;
  description: string;
  tags: string[];
};

const certs: Cert[] = [
  {
    id: 1,
    title: "Google UX Design Professional Certificate",
    issuer: "Google",
    date: "2024",
    credentialId: "ABC-123-UX",
    verifyUrl: "#",
    image: "https://i.pinimg.com/1200x/91/ce/7a/91ce7a6b7c6bffe3bf3a646eb7fc7767.jpg",
    description: "Comprehensive program covering user experience design principles, user research, wireframing, prototyping, and usability testing.",
    tags: ["UX Design", "User Research", "Prototyping", "Figma"],
  },
  {
    id: 2,
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-CLF-001",
    verifyUrl: "#",
    image: "https://i.pinimg.com/1200x/34/85/ac/3485acf4ed112bcbd5f328e670a81e9b.jpg",
    description: "Foundational certification demonstrating cloud computing knowledge and AWS services understanding for technical and business roles.",
    tags: ["Cloud Computing", "AWS", "Infrastructure", "Security"],
  },
  {
    id: 3,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-CSA-002",
    verifyUrl: "#",
    image: "https://i.pinimg.com/736x/b9/92/58/b992583b2de4f01b69a4cb1e43d2da3c.jpg",
    description: "Advanced certification demonstrating knowledge of AWS architecture, deployment, and best practices for scalable solutions.",
    tags: ["Cloud Computing", "AWS", "Architecture", "Best Practices"],
  },
  {
    id: 4,
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    date: "2024",
    credentialId: "ABC-123-DA",
    verifyUrl: "#",
    image: "https://i.pinimg.com/736x/b9/24/01/b92401d7d7851ea4ee59c6aaed11c5c5.jpg",
    description: "Comprehensive program covering data analysis, visualization, and machine learning using Google tools.",
    tags: ["Data Analytics", "Google", "Machine Learning", "Data Visualization"],
  },
  {
    id: 5,
    title: "Google Project Management Professional Certificate",
    issuer: "Google",
    date: "2024",
    credentialId: "ABC-123-PM",
    verifyUrl: "#",
    image: "https://i.pinimg.com/1200x/51/13/3b/51133b2a32917490d572dc3e1f66be35.jpg",
    description: "Comprehensive program covering project management principles, methodologies, and tools using Google Workspace.",
    tags: ["Project Management", "Google", "Agile", "Collaboration"],
  },
];

export default function Certifications() {
  const [active, setActive] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % certs.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + certs.length) % certs.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Touch/Mouse drag handling
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const diff = startX - currentX;
    const threshold = 50;

    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }
    
    setStartX(0);
    setCurrentX(0);
  };

  if (!isClient) return null;

  return (
    <section className="py-32 px-6 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="mb-20">
        <h2 className="text-3xl font-semibold bg-black bg-clip-text text-transparent">
            Certifications
          </h2>
          <p className="text-gray-500 dark:text-gray-300 font-light">
            Professional credentials and achievements
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden">
          {/* Cards Slider */}
          <div
            className="flex transition-transform duration-700 ease-out cursor-grab active:cursor-grabbing"
            style={{
              transform: `translateX(calc(-${active * 100}% + ${isDragging ? (currentX - startX) : 0}px))`,
            }}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
          >
            {certs.map((cert, idx) => (
              <div
                key={cert.id}
                className="w-full flex-shrink-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
                  {/* First Card */}
                  <div className="group">
                    {/* Image */}
                    <div className="overflow-hidden mb-6 aspect-[4/3] bg-gray-200 dark:bg-gray-800">
                      <img
                        src={cert.image || "/placeholder.svg"}
                        alt={cert.title}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                      {cert.issuer} · {cert.date}
                    </p>
                    <h3 className="text-2xl font-light text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition mb-3">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-light line-clamp-2 mb-4">
                      {cert.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.tags.slice(0, 3).map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="text-xs text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Verify Link */}
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                      >
                        Verify Credential
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {/* Second Card */}
                  {certs[(idx + 1) % certs.length] && (
                    <div className="group">
                      {/* Image */}
                      <div className="overflow-hidden mb-6 aspect-[4/3] bg-gray-200 dark:bg-gray-800">
                        <img
                          src={certs[(idx + 1) % certs.length].image || "/placeholder.svg"}
                          alt={certs[(idx + 1) % certs.length].title}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Content */}
                      <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                        {certs[(idx + 1) % certs.length].issuer} · {certs[(idx + 1) % certs.length].date}
                      </p>
                      <h3 className="text-2xl font-light text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition mb-3">
                        {certs[(idx + 1) % certs.length].title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-light line-clamp-2 mb-4">
                        {certs[(idx + 1) % certs.length].description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {certs[(idx + 1) % certs.length].tags.slice(0, 3).map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="text-xs text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Verify Link */}
                      {certs[(idx + 1) % certs.length].verifyUrl && (
                        <a
                          href={certs[(idx + 1) % certs.length].verifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                        >
                          Verify Credential
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Third Card */}
                  {certs[(idx + 2) % certs.length] && (
                    <div className="group">
                      {/* Image */}
                      <div className="overflow-hidden mb-6 aspect-[4/3] bg-gray-200 dark:bg-gray-800">
                        <img
                          src={certs[(idx + 2) % certs.length].image || "/placeholder.svg"}
                          alt={certs[(idx + 2) % certs.length].title}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Content */}
                      <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                        {certs[(idx + 2) % certs.length].issuer} · {certs[(idx + 2) % certs.length].date}
                      </p>
                      <h3 className="text-2xl font-light text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition mb-3">
                        {certs[(idx + 2) % certs.length].title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-light line-clamp-2 mb-4">
                        {certs[(idx + 2) % certs.length].description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {certs[(idx + 2) % certs.length].tags.slice(0, 3).map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="text-xs text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Verify Link */}
                      {certs[(idx + 2) % certs.length].verifyUrl && (
                        <a
                          href={certs[(idx + 2) % certs.length].verifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                        >
                          Verify Credential
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors z-10"
            aria-label="Previous certification"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors z-10"
            aria-label="Next certification"
          >
            <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center gap-2 mt-16">
          {certs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === idx
                  ? "bg-black dark:bg-white w-8"
                  : "bg-gray-300 dark:bg-gray-700 w-1.5 hover:bg-gray-400 dark:hover:bg-gray-600"
              }`}
              aria-label={`Go to certification ${idx + 1}`}
            />
          ))}
        </div>

        {/* View All Button */}
      
      </div>
    </section>
  );
}