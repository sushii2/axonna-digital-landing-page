"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "./ui/button";
import { DotWaveBackground } from "./dot-wave-background";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function PrimaryCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/steve-t-slaughter/30min",
      });
    }
  };

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            gsap.fromTo(
              cardRef.current,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                clearProps: "transform",
              }
            );

            gsap.fromTo(
              ".cta-word",
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.08,
                delay: 0.4,
                ease: "power3.out",
                clearProps: "transform",
              }
            );

            gsap.fromTo(
              ".primary-cta-description",
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.8,
                ease: "power3.out",
                clearProps: "transform",
              }
            );

            gsap.fromTo(
              ".primary-cta-button",
              { y: 20, opacity: 0, scale: 0.9 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                delay: 1,
                ease: "back.out(1.7)",
                clearProps: "transform",
              }
            );

            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9] py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Card */}
        <div
          ref={cardRef}
          className="relative bg-[#0B1B32] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 lg:p-20 overflow-hidden"
        >
          {/* Dot Wave Background inside card */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <DotWaveBackground
              dotColor="rgba(255, 255, 255, 0.08)"
              dotSize={2}
              spacing={25}
              waveAmplitude={15}
              waveSpeed={0.01}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-3xl mx-auto px-2 sm:px-0">
            {/* Headline with word animation */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-white leading-[1.1] tracking-tight">
              <span className="cta-word inline-block">A</span>{" "}
              <span className="cta-word inline-block">clearer</span>{" "}
              <span className="cta-word inline-block">path</span>{" "}
              <span className="cta-word inline-block">through</span>{" "}
              <br className="hidden sm:block" />
              <span className="cta-word inline-block italic text-[#38BDF8]">
                AI
              </span>{" "}
              <span className="cta-word inline-block italic text-[#38BDF8]">
                adoption
              </span>
            </h2>

            {/* Description */}
            <p className="primary-cta-description mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl text-white/60 leading-relaxed">
              Whether you are dealing with fragmented systems, manual
              workarounds, or uncertainty about where AI fits, our framework
              helps you decide what to invest in now and what to ignore.
            </p>

            {/* Button */}
            <div className="primary-cta-button mt-8 sm:mt-12">
              <Button
                onClick={openCalendly}
                className="group relative w-full sm:w-auto rounded-full h-auto min-h-[48px] sm:min-h-[56px] py-3 sm:py-4 px-5 sm:px-10 text-sm sm:text-lg font-medium bg-white text-[#0B1B32] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#38BDF8]/20 cursor-pointer"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#0B1B32] whitespace-normal leading-tight">
                  Schedule a 30-minute intro call
                </span>
                <div className="absolute inset-0 bg-[#38BDF8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Button>
            </div>

            {/* Trust indicator */}
            <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-white/40">
              No commitment required · 100% confidential
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
