"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

type Volunteer = {
  id: number;
  role: string;
  organization: string;
  period: string;
  image?: string;
  description: string;
  skills: string[];
  link?: string;
};

const volunteers: Volunteer[] = [
  {
    id: 1,
    role: "Media Team Volunteer",
    organization: "VMC Cambodia",
    period: "2024",
    image: "https://via.placeholder.com/600x400",
    description:
      "Created digital content, managed social media posts, and supported event coverage.",
    skills: ["Media", "Design", "Photography"],
  },
  {
    id: 2,
    role: "Technology Support Volunteer",
    organization: "Youth Tech Program",
    period: "2023",
    image: "https://i.pinimg.com/1200x/37/8c/2a/378c2afb981fb3bbd52b2314b3d14eed.jpg",
    description:
      "Assisted with IT support, website updates, and digital tools training.",
    skills: ["IT Support", "Web", "Problem Solving"],
  },
  {
    id: 3,
    role: "Event Organizer",
    organization: "Community Program",
    period: "2023",
    image: "https://via.placeholder.com/600x400",
    description: "Organized community events and coordinated volunteers.",
    skills: ["Leadership", "Communication"],
  },
  {
    id: 4,
    role: "Report & Documentation Volunteer",
    organization: "NGO Project",
    period: "2024",
    image: "https://via.placeholder.com/600x400",
    description: "Prepared reports and documented activities.",
    skills: ["Writing", "Reporting"],
  },
];

export default function VolunteerExperience() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [pause, setPause] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = 360; // approx card width + gap

  // Auto-scroll
  useEffect(() => {
    if (pause) return;

    const interval = setInterval(() => {
      if (!sliderRef.current) return;

      sliderRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });

      const nextIndex =
        activeIndex + 1 >= volunteers.length ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [pause, activeIndex]);

  // Navigation buttons
  const scrollLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    setActiveIndex(
      activeIndex - 1 < 0 ? volunteers.length - 1 : activeIndex - 1,
    );
  };
  const scrollRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    setActiveIndex((activeIndex + 1) % volunteers.length);
  };

  // Click dot
  const goToSlide = (index: number) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({ left: cardWidth * index, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <section className="py-1 px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-16 text-center">
          <h2 className="text-6xl font-light text-black dark:text-white">
            Volunteer & Intern Experience
          </h2>
          <p className="text-gray-500 mt-2">
            Community involvement & social contribution
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <div
            ref={sliderRef}
            onMouseEnter={() => setPause(true)}
            onMouseLeave={() => setPause(false)}
            className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
          >
            {volunteers.map((v, i) => (
              <div
                key={v.id}
                className="min-w-[320px] lg:min-w-[360px] snap-start"
              >
                <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 mb-5 overflow-hidden">
                  <img
                    src={v.image}
                    alt={v.role}
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  />
                </div>

                <p className="text-xs uppercase text-gray-400 mb-2">
                  {v.organization} · {v.period}
                </p>

                <h3 className="text-2xl font-light mb-3 text-black dark:text-white">
                  {v.role}
                </h3>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {v.description}
                </p>

                <div className="flex gap-2 flex-wrap mb-4">
                  {v.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-xs border px-3 py-1 rounded-full text-gray-500 dark:text-gray-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {v.link && (
                  <a
                    href={v.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black"
                  >
                    View Activity
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button onClick={scrollLeft} className="nav-btn left-0">
            <ChevronLeft />
          </button>
          <button onClick={scrollRight} className="nav-btn right-0">
            <ChevronRight />
          </button>

          {/* Dots indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {volunteers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition ${
                  activeIndex === idx
                    ? "bg-black dark:bg-white"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* View all */}
        <div className="flex justify-center mt-16"></div>
      </div>

      <style jsx>{`
        .nav-btn {
          position: absolute;
          top: 40%;
          display: none;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          padding: 0.5rem;
          cursor: pointer;
          z-index: 10;
        }
        @media (min-width: 1024px) {
          .nav-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
