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

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
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
    setHasAnimated(true);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headlineRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, clearProps: "transform" }
    )
      .fromTo(
        descriptionRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, clearProps: "transform" },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, clearProps: "transform" },
        "-=0.3"
      );
  }, [hasAnimated]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen bg-[#0B1B32] overflow-hidden"
    >
      {/* Dot Wave Background */}
      <div className="absolute inset-0">
        <DotWaveBackground
          dotColor="rgba(255, 255, 255, 0.12)"
          dotSize={2}
          spacing={30}
          waveAmplitude={20}
          waveSpeed={0.012}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 sm:pb-20 min-h-screen flex items-center">
        <div className="max-w-3xl w-full">
          <h1
            ref={headlineRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white leading-[1.1] tracking-tight"
          >
            Modern operations built for an{" "}
            <span className="italic text-[#38BDF8]">AI-powered</span> future
          </h1>

          <p
            ref={descriptionRef}
            className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl text-white/70 leading-relaxed max-w-2xl"
          >
            Axonna helps middle market companies modernize their technology and
            data systems so their teams can work better, make faster decisions,
            and improve margins.
          </p>

          <div ref={ctaRef} className="mt-8 sm:mt-10">
            <Button
              onClick={openCalendly}
              className="w-full sm:w-auto rounded-full h-12 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-medium bg-white text-[#0B1B32] hover:bg-[#38BDF8] transition-all duration-300 shadow-lg shadow-black/10 cursor-pointer"
            >
              Schedule a 30-minute intro call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
