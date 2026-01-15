"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const frameworkSteps = [
  {
    number: "01",
    title: "Top-down business evaluation",
    description:
      "We start with your business goals, constraints, and operating model. Technology decisions flow from strategy, not the other way around.",
  },
  {
    number: "02",
    title: "Operational reality check",
    description:
      "We assess data quality, system maturity, workflows, and team readiness to ensure AI initiatives are grounded in how work actually gets done.",
  },
  {
    number: "03",
    title: "Prioritized use cases with ROI",
    description:
      "The framework identifies high-impact, low-risk opportunities first, focusing on improvements that can be measured and sustained.",
  },
  {
    number: "04",
    title: "Implementation, not theory",
    description:
      "Every recommendation is tied to practical execution, including system integration, process changes, and operator adoption.",
  },
  {
    number: "05",
    title: "Built to evolve",
    description:
      "The framework is designed to help your organization adapt as AI capabilities change, without needing constant reinvention.",
  },
];

export function Framework() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            gsap.fromTo(
              ".framework-heading",
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );

            gsap.fromTo(
              ".framework-content",
              { x: -30, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.7,
                delay: 0.3,
                ease: "power3.out",
                clearProps: "transform",
              }
            );

            gsap.fromTo(
              ".framework-tab",
              { x: 30, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                delay: 0.4,
                ease: "power3.out",
                clearProps: "transform,opacity",
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

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;

    // Animate out current content
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(index);
        // Animate in new content
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
        );
      },
    });
  };

  const activeStep = frameworkSteps[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="framework"
      className="relative bg-axonna-navy py-24 lg:py-32 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <h2 className="framework-heading text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-[1.15] tracking-tight max-w-2xl">
            AI Readiness &{" "}
            <span className="italic text-axonna-accent">Implementation</span>{" "}
            Framework
          </h2>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:gap-6 items-stretch">
          {/* Expanded Content Panel */}
          <div className="framework-content flex-1 max-w-2xl">
            <div
              ref={contentRef}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-10 h-full min-h-[360px]"
            >
              <span className="text-6xl font-serif italic text-axonna-accent/80">
                {activeStep.number}.
              </span>

              <h3 className="mt-6 text-2xl lg:text-3xl font-medium text-white leading-snug">
                {activeStep.title}
              </h3>

              <div className="mt-6 w-12 h-px bg-axonna-accent/50" />

              <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-lg">
                {activeStep.description}
              </p>
            </div>
          </div>

          {/* Vertical Tabs */}
          <div className="flex gap-2" style={{ minHeight: "360px" }}>
            {frameworkSteps.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={step.number}
                  onClick={() => handleTabClick(index)}
                  className={`framework-tab w-16 rounded-xl transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-axonna-accent"
                      : "bg-white/[0.05] hover:bg-white/[0.08] border border-white/10"
                  }`}
                >
                  {/* Tab content */}
                  <div className="h-full flex flex-col items-center justify-between py-6">
                    <span
                      className={`text-xl font-serif italic transition-colors duration-300 ${
                        isActive ? "text-axonna-navy" : "text-white"
                      }`}
                    >
                      {step.number}
                    </span>

                    {/* Vertical text */}
                    <div
                      className="flex-1 flex items-center justify-center my-4"
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                      }}
                    >
                      <span
                        className={`text-xs font-medium tracking-wide transition-colors duration-300 rotate-180 whitespace-nowrap ${
                          isActive
                            ? "text-axonna-navy/80"
                            : "text-white/90"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>

                    {/* Bottom indicator */}
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                        isActive ? "bg-axonna-navy/60" : "bg-white/50"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Layout - Accordion */}
        <div className="lg:hidden space-y-3">
          {frameworkSteps.map((step, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={step.number} className="framework-tab">
                <button
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-5 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-axonna-accent"
                      : "bg-white/[0.05] border border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-2xl font-serif italic ${
                        isActive ? "text-axonna-navy" : "text-white/40"
                      }`}
                    >
                      {step.number}.
                    </span>
                    <span
                      className={`text-base font-medium ${
                        isActive ? "text-axonna-navy" : "text-white/70"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                </button>

                {/* Expanded content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 pt-4">
                    <div className="w-10 h-px bg-axonna-accent/40 mb-4" />
                    <p className="text-base text-white/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
