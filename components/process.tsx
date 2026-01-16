"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const processSteps = [
  {
    step: "01",
    title: "Strategic Assessment",
    description:
      "We evaluate your business goals, data landscape, and operational workflows to identify high-impact AI opportunities.",
  },
  {
    step: "02",
    title: "Solution Design",
    description:
      "Our team architects intelligent systems tailored to your specific processes, ensuring seamless fit with existing operations.",
  },
  {
    step: "03",
    title: "Guided Implementation",
    description:
      "We integrate AI solutions into your infrastructure with minimal disruption, training your team along the way.",
  },
  {
    step: "04",
    title: "Continuous Optimization",
    description:
      "We monitor performance, refine models, and scale solutions as your business evolves and new opportunities emerge.",
  },
];

const assessmentItems = [
  "Data readiness",
  "Workflow integration",
  "Technical architecture",
  "Organizational alignment",
  "Economic impact",
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            gsap.fromTo(
              ".process-heading",
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );

            gsap.fromTo(
              ".process-subtext",
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, delay: 0.15, ease: "power3.out" }
            );

            gsap.fromTo(
              ".process-card",
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.12,
                delay: 0.3,
                ease: "power3.out",
                clearProps: "transform",
              }
            );

            setTimeout(() => {
              startCardAnimations();
            }, 900);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const startCardAnimations = () => {
    // Step 1: Scanning animation
    gsap.to(".scan-ring", {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "none",
    });

    gsap.to(".scan-pulse-ring", {
      scale: 1.8,
      opacity: 0,
      duration: 2,
      repeat: -1,
      ease: "power1.out",
    });

    gsap.to(".check-item", {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.4,
      delay: 0.3,
      ease: "power2.out",
    });

    gsap.to(".check-mark", {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      stagger: 0.4,
      delay: 0.6,
      ease: "back.out(2)",
    });

    // Step 2: AI Engine pulse animation (handled by CSS)

    // Step 4: KPI number animations
    const animateKPI = (selector: string, start: number, end: number, decimals: number = 0) => {
      const element = document.querySelector(selector);
      if (element) {
        gsap.fromTo(
          { value: start },
          { value: end },
          {
            value: end,
            duration: 2,
            delay: 0.5,
            ease: "power2.out",
            onUpdate: function () {
              const currentValue = this.targets()[0].value;
              element.textContent = decimals > 0
                ? currentValue.toFixed(decimals)
                : Math.round(currentValue).toString();
            },
          }
        );
      }
    };

    animateKPI(".kpi-value-1", 65, 87, 0);
    animateKPI(".kpi-value-2", 180, 240, 0);
    animateKPI(".kpi-value-3", 2.1, 3.2, 1);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FAFAFA] py-20 sm:py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0B1B32]/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="process-heading text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0B1B32] leading-[1.1] tracking-tight">
            A Simple, Smart, and{" "}
            <span className="italic text-[#2563EB]">Scalable</span> Process
          </h2>

          <p className="process-subtext mt-6 text-base sm:text-lg text-[#0B1B32]/60 max-w-2xl mx-auto leading-relaxed">
            We design, develop, and implement AI solutions that help your
            business work smarter, not harder
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {/* Step 1 - Strategic Assessment */}
          <div className="process-card bg-white border border-[#0B1B32]/[0.06] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-[#0B1B32]/10 transition-all duration-500">
            <div className="mb-5">
              <span className="text-[#2563EB] text-sm font-semibold tracking-wide">
                {processSteps[0].step}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#0B1B32] mt-1">
                {processSteps[0].title}
              </h3>
            </div>

            <p className="text-[#0B1B32]/60 text-sm sm:text-base leading-relaxed mb-6">
              {processSteps[0].description}
            </p>

            <div className="relative h-40 sm:h-52 bg-[#0B1B32] rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex">
                {/* Scanning Animation - Left Side */}
                <div className="w-[45%] sm:w-1/2 flex items-center justify-center relative border-r border-white/10">
                  <div className="absolute w-16 h-16 sm:w-28 sm:h-28 rounded-full border border-white/10" />
                  <svg className="scan-ring absolute w-14 h-14 sm:w-24 sm:h-24" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="url(#scanGradient)"
                      strokeWidth="2"
                      strokeDasharray="60 200"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="scan-pulse-ring absolute w-7 h-7 sm:w-12 sm:h-12 rounded-full border-2 border-[#38BDF8]/40" />
                  <div className="relative w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-[#38BDF8]/10 flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#38BDF8]" />
                  </div>
                  <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 text-center px-1">
                    <span className="text-[8px] sm:text-xs text-white/50 leading-tight">Analyzing processes</span>
                  </div>
                </div>

                {/* Checklist - Right Side */}
                <div className="w-[55%] sm:w-1/2 py-2 sm:py-4 px-2 sm:px-5 flex flex-col justify-center">
                  <div className="space-y-1.5 sm:space-y-2.5">
                    {assessmentItems.map((item) => (
                      <div
                        key={item}
                        className="check-item flex items-center gap-1.5 sm:gap-2.5"
                        style={{ opacity: 0, transform: "translateX(-10px)" }}
                      >
                        <div className="relative w-3 h-3 sm:w-4 sm:h-4 rounded border border-white/20 bg-white/5 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="check-mark w-2 h-2 sm:w-2.5 sm:h-2.5 text-[#38BDF8]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                            style={{ opacity: 0, transform: "scale(0)" }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[9px] sm:text-xs text-white/70 leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 - Solution Design - Technical Architecture Diagram */}
          <div className="process-card bg-white border border-[#0B1B32]/[0.06] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-[#0B1B32]/10 transition-all duration-500">
            <div className="mb-5">
              <span className="text-[#2563EB] text-sm font-semibold tracking-wide">
                {processSteps[1].step}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#0B1B32] mt-1">
                {processSteps[1].title}
              </h3>
            </div>

            <p className="text-[#0B1B32]/60 text-sm sm:text-base leading-relaxed mb-6">
              {processSteps[1].description}
            </p>

            <div className="relative h-40 sm:h-52 bg-[#0B1B32] rounded-xl overflow-hidden">
              {/* Technical Architecture Diagram */}
              <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
                <div className="w-full max-w-[280px] sm:max-w-[400px] flex items-center justify-between gap-1 sm:gap-3">

                  {/* Left Column - Data Sources */}
                  <div className="flex flex-col gap-1 sm:gap-2 diagram-col diagram-col-1">
                    {[
                      { icon: "M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z M9 12h6 M12 9v6", label: "Database" },
                      { icon: "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5", label: "APIs" },
                      { icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8", label: "Files" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="diagram-node flex items-center gap-1 sm:gap-2 bg-white/[0.06] border border-white/[0.1] rounded px-1.5 py-1 sm:px-2.5 sm:py-2"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white/50 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d={item.icon} />
                        </svg>
                        <span className="text-[7px] sm:text-[9px] text-white/60 whitespace-nowrap">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Connection Lines Left */}
                  <div className="flex flex-col items-center justify-center diagram-lines diagram-lines-1">
                    <svg className="w-6 sm:w-14 h-16 sm:h-24" viewBox="0 0 60 100">
                      {/* Database to AI Engine (top) */}
                      <line x1="0" y1="17" x2="55" y2="50" stroke="#38BDF8" strokeWidth="1.5" opacity="0.6" />
                      {/* APIs to AI Engine (middle) */}
                      <line x1="0" y1="50" x2="55" y2="50" stroke="#38BDF8" strokeWidth="1.5" opacity="0.7" />
                      {/* Files to AI Engine (bottom) */}
                      <line x1="0" y1="83" x2="55" y2="50" stroke="#38BDF8" strokeWidth="1.5" opacity="0.6" />
                      {/* Animated dots */}
                      <circle r="2" fill="#38BDF8">
                        <animateMotion dur="1.5s" repeatCount="indefinite" path="M 0 17 L 55 50" />
                      </circle>
                      <circle r="2" fill="#38BDF8">
                        <animateMotion dur="1.5s" repeatCount="indefinite" path="M 0 50 L 55 50" begin="0.5s" />
                      </circle>
                      <circle r="2" fill="#38BDF8">
                        <animateMotion dur="1.5s" repeatCount="indefinite" path="M 0 83 L 55 50" begin="1s" />
                      </circle>
                    </svg>
                  </div>

                  {/* Center - AI Engine */}
                  <div className="diagram-center relative flex-shrink-0">
                    <div className="ai-engine-pulse absolute inset-0 rounded-lg sm:rounded-xl bg-[#38BDF8]/20" />
                    <div className="relative w-12 h-12 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#2563EB] flex flex-col items-center justify-center shadow-lg shadow-[#38BDF8]/25 border border-white/10">
                      <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                      </svg>
                      <span className="hidden sm:block text-[8px] text-white/90 font-medium tracking-wide mt-0.5">AI ENGINE</span>
                    </div>
                  </div>

                  {/* Connection Lines Right */}
                  <div className="flex flex-col items-center justify-center diagram-lines diagram-lines-2">
                    <svg className="w-6 sm:w-14 h-16 sm:h-24" viewBox="0 0 60 100">
                      {/* AI Engine to Analytics (top) */}
                      <line x1="5" y1="50" x2="60" y2="17" stroke="#28C840" strokeWidth="1.5" opacity="0.6" />
                      {/* AI Engine to Automation (middle) */}
                      <line x1="5" y1="50" x2="60" y2="50" stroke="#28C840" strokeWidth="1.5" opacity="0.7" />
                      {/* AI Engine to Insights (bottom) */}
                      <line x1="5" y1="50" x2="60" y2="83" stroke="#28C840" strokeWidth="1.5" opacity="0.6" />
                      {/* Animated dots */}
                      <circle r="2" fill="#28C840">
                        <animateMotion dur="1.5s" repeatCount="indefinite" path="M 5 50 L 60 17" begin="0.75s" />
                      </circle>
                      <circle r="2" fill="#28C840">
                        <animateMotion dur="1.5s" repeatCount="indefinite" path="M 5 50 L 60 50" begin="1.25s" />
                      </circle>
                      <circle r="2" fill="#28C840">
                        <animateMotion dur="1.5s" repeatCount="indefinite" path="M 5 50 L 60 83" begin="1.75s" />
                      </circle>
                    </svg>
                  </div>

                  {/* Right Column - Outputs */}
                  <div className="flex flex-col gap-1 sm:gap-2 diagram-col diagram-col-2">
                    {[
                      { icon: "M3 3v18h18 M18 9l-5 5-4-4-6 6", label: "Analytics", color: "text-[#28C840]/70" },
                      { icon: "M12 8v4l3 3 M12 2a10 10 0 100 20 10 10 0 000-20z", label: "Automation", color: "text-[#F59E0B]/70" },
                      { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", label: "Insights", color: "text-[#38BDF8]/70" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="diagram-node flex items-center gap-1 sm:gap-2 bg-white/[0.06] border border-white/[0.1] rounded px-1.5 py-1 sm:px-2.5 sm:py-2"
                        style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                      >
                        <svg className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${item.color} flex-shrink-0`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d={item.icon} />
                        </svg>
                        <span className="text-[7px] sm:text-[9px] text-white/60 whitespace-nowrap">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <style jsx>{`
                .diagram-col, .diagram-center, .diagram-lines {
                  opacity: 0;
                  animation: diagramFadeIn 0.6s ease-out forwards;
                }
                .diagram-col-1 { animation-delay: 0.1s; }
                .diagram-lines-1 { animation-delay: 0.3s; }
                .diagram-center { animation-delay: 0.4s; }
                .diagram-lines-2 { animation-delay: 0.5s; }
                .diagram-col-2 { animation-delay: 0.6s; }
                .ai-engine-pulse {
                  animation: enginePulse 2.5s ease-out infinite;
                }
                @keyframes diagramFadeIn {
                  from { opacity: 0; transform: translateY(8px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                @keyframes enginePulse {
                  0% { transform: scale(1); opacity: 0.4; }
                  100% { transform: scale(1.6); opacity: 0; }
                }
              `}</style>
            </div>
          </div>

          {/* Step 3 - Guided Implementation - IDE Window */}
          <div className="process-card bg-white border border-[#0B1B32]/[0.06] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-[#0B1B32]/10 transition-all duration-500">
            <div className="mb-5">
              <span className="text-[#2563EB] text-sm font-semibold tracking-wide">
                {processSteps[2].step}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#0B1B32] mt-1">
                {processSteps[2].title}
              </h3>
            </div>

            <p className="text-[#0B1B32]/60 text-sm sm:text-base leading-relaxed mb-6">
              {processSteps[2].description}
            </p>

            <div className="relative h-44 sm:h-52 bg-[#1E1E1E] rounded-xl overflow-hidden shadow-2xl">
              {/* IDE Window Chrome */}
              <div className="absolute top-0 left-0 right-0 h-7 bg-[#323233] flex items-center px-3 gap-2">
                {/* Traffic lights */}
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                {/* Tab */}
                <div className="ml-4 flex items-center gap-2 bg-[#1E1E1E] px-3 py-1 rounded-t text-[10px]">
                  <svg className="w-3 h-3 text-[#519ABA]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.083-.382-.042-.536.096-.377.464-.49.857-.386.269.071.517.279.675.545.708-.451.708-.451 1.201-.752-.185-.278-.275-.398-.398-.495-.496-.528-1.166-.793-2.238-.766l-.555.064c-.534.12-.989.382-1.277.707-.937.987-.672 2.724.495 3.443 1.156.751 2.853.911 3.066 1.618.195.803-.596 1.063-1.349.969-.559-.081-.872-.391-1.209-.842l-1.251.72c.143.287.304.419.461.596.928.953 3.253 1.063 4.012-.306.029-.052.103-.231.156-.443l.023-.114zm-7.658-3.807c-.292-.689-.477-1.192-.516-1.703l.014-.128-2.084.009-.001 6.377 1.625-.008-.001-4.24c.086.182.204.388.349.62.078.122.157.246.247.376l.367-.043v-1.26z"/>
                  </svg>
                  <span className="text-white/70">ai-pipeline.ts</span>
                </div>
              </div>

              {/* Code Editor */}
              <div className="absolute top-7 left-0 right-0 bottom-0 flex overflow-hidden">
                {/* Line Numbers */}
                <div className="w-8 sm:w-10 bg-[#1E1E1E] border-r border-white/5 pt-2 flex flex-col items-end pr-2 text-[9px] sm:text-[10px] text-white/20 font-mono">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="leading-[14px] sm:leading-[16px]">{i + 1}</div>
                  ))}
                </div>

                {/* Code Content - Scrolling */}
                <div className="flex-1 overflow-hidden relative">
                  <div className="code-scroll absolute left-0 right-0 pt-2 px-2 sm:px-3 font-mono text-[9px] sm:text-[10px] leading-[14px] sm:leading-[16px]">
                    <div><span className="text-[#C586C0]">import</span><span className="text-white/90"> {"{"} </span><span className="text-[#9CDCFE]">Pipeline</span><span className="text-white/90">, </span><span className="text-[#9CDCFE]">Model</span><span className="text-white/90"> {"}"} </span><span className="text-[#C586C0]">from</span><span className="text-[#CE9178]"> &apos;@axonna/ai&apos;</span></div>
                    <div><span className="text-[#C586C0]">import</span><span className="text-white/90"> {"{"} </span><span className="text-[#9CDCFE]">DataSource</span><span className="text-white/90"> {"}"} </span><span className="text-[#C586C0]">from</span><span className="text-[#CE9178]"> &apos;./connectors&apos;</span></div>
                    <div className="text-white/30">&nbsp;</div>
                    <div><span className="text-[#569CD6]">const</span><span className="text-[#9CDCFE]"> config</span><span className="text-white/90"> = {"{"}</span></div>
                    <div><span className="text-white/90">  </span><span className="text-[#9CDCFE]">model</span><span className="text-white/90">: </span><span className="text-[#CE9178]">&apos;gpt-4-turbo&apos;</span><span className="text-white/90">,</span></div>
                    <div><span className="text-white/90">  </span><span className="text-[#9CDCFE]">temperature</span><span className="text-white/90">: </span><span className="text-[#B5CEA8]">0.7</span><span className="text-white/90">,</span></div>
                    <div><span className="text-white/90">  </span><span className="text-[#9CDCFE]">maxTokens</span><span className="text-white/90">: </span><span className="text-[#B5CEA8]">2048</span></div>
                    <div><span className="text-white/90">{"}"};</span></div>
                    <div className="text-white/30">&nbsp;</div>
                    <div><span className="text-[#569CD6]">export</span><span className="text-[#569CD6]"> async</span><span className="text-[#569CD6]"> function</span><span className="text-[#DCDCAA]"> initPipeline</span><span className="text-white/90">() {"{"}</span></div>
                    <div><span className="text-white/90">  </span><span className="text-[#569CD6]">const</span><span className="text-[#9CDCFE]"> pipeline</span><span className="text-white/90"> = </span><span className="text-[#569CD6]">new</span><span className="text-[#4EC9B0]"> Pipeline</span><span className="text-white/90">(config);</span></div>
                    <div className="text-white/30">&nbsp;</div>
                    <div><span className="text-white/90">  </span><span className="text-[#6A9955]">// Connect to data sources</span></div>
                    <div><span className="text-white/90">  </span><span className="text-[#C586C0]">await</span><span className="text-white/90"> pipeline.</span><span className="text-[#DCDCAA]">connect</span><span className="text-white/90">(</span><span className="text-[#4EC9B0]">DataSource</span><span className="text-white/90">);</span></div>
                    <div className="text-white/30">&nbsp;</div>
                    <div><span className="text-white/90">  </span><span className="text-[#6A9955]">// Initialize ML model</span></div>
                    <div><span className="text-white/90">  </span><span className="text-[#569CD6]">const</span><span className="text-[#9CDCFE]"> model</span><span className="text-white/90"> = </span><span className="text-[#C586C0]">await</span><span className="text-[#4EC9B0]"> Model</span><span className="text-white/90">.</span><span className="text-[#DCDCAA]">load</span><span className="text-white/90">();</span></div>
                    <div><span className="text-white/90">  pipeline.</span><span className="text-[#DCDCAA]">setModel</span><span className="text-white/90">(model);</span></div>
                    <div className="text-white/30">&nbsp;</div>
                    <div><span className="text-white/90">  </span><span className="text-[#C586C0]">return</span><span className="text-white/90"> pipeline;</span></div>
                    <div><span className="text-white/90">{"}"}</span></div>
                    <div className="text-white/30">&nbsp;</div>
                    <div><span className="text-[#6A9955]">// Process incoming data</span></div>
                    <div><span className="text-[#569CD6]">export</span><span className="text-[#569CD6]"> async</span><span className="text-[#569CD6]"> function</span><span className="text-[#DCDCAA]"> process</span><span className="text-white/90">(</span><span className="text-[#9CDCFE]">data</span><span className="text-white/90">) {"{"}</span></div>
                    <div><span className="text-white/90">  </span><span className="text-[#569CD6]">const</span><span className="text-[#9CDCFE]"> result</span><span className="text-white/90"> = </span><span className="text-[#C586C0]">await</span><span className="text-white/90"> pipeline.</span><span className="text-[#DCDCAA]">run</span><span className="text-white/90">(data);</span></div>
                    <div><span className="text-white/90">  </span><span className="text-[#C586C0]">return</span><span className="text-white/90"> result.</span><span className="text-[#DCDCAA]">transform</span><span className="text-white/90">();</span></div>
                    <div><span className="text-white/90">{"}"}</span></div>
                  </div>
                </div>
              </div>

              {/* Subtle scan line effect */}
              <div className="ide-scanline absolute left-0 right-0 h-8 bg-gradient-to-b from-[#38BDF8]/5 to-transparent pointer-events-none" />

              <style jsx>{`
                .code-scroll {
                  animation: scrollCode 12s linear infinite;
                }
                .ide-scanline {
                  animation: scanlineMove 3s ease-in-out infinite;
                }
                @keyframes scrollCode {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-50%); }
                }
                @keyframes scanlineMove {
                  0%, 100% { top: 28px; opacity: 0.5; }
                  50% { top: calc(100% - 32px); opacity: 0.8; }
                }
              `}</style>
            </div>
          </div>

          {/* Step 4 - Continuous Optimization - Metrics Dashboard */}
          <div className="process-card bg-white border border-[#0B1B32]/[0.06] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-[#0B1B32]/10 transition-all duration-500">
            <div className="mb-5">
              <span className="text-[#2563EB] text-sm font-semibold tracking-wide">
                {processSteps[3].step}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#0B1B32] mt-1">
                {processSteps[3].title}
              </h3>
            </div>

            <p className="text-[#0B1B32]/60 text-sm sm:text-base leading-relaxed mb-6">
              {processSteps[3].description}
            </p>

            <div className="relative h-44 sm:h-52 bg-[#0B1B32] rounded-xl overflow-hidden p-3 sm:p-4">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#28C840] animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] text-white/50 font-medium tracking-wide uppercase">Live Metrics</span>
                </div>
                <div className="text-[8px] sm:text-[9px] text-white/30 font-mono">Updated 2s ago</div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {/* KPI 1 - Efficiency */}
                <div className="kpi-card bg-white/[0.04] rounded-lg p-2 sm:p-3 border border-white/[0.06]">
                  <div className="text-[8px] sm:text-[9px] text-white/40 mb-1 uppercase tracking-wide">Efficiency</div>
                  <div className="flex items-end gap-1">
                    <span className="kpi-value-1 text-lg sm:text-xl font-semibold text-white tabular-nums">87</span>
                    <span className="text-[10px] sm:text-xs text-white/50 mb-0.5">%</span>
                    <div className="flex items-center ml-auto">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#28C840]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 14l5-5 5 5H7z"/>
                      </svg>
                      <span className="text-[8px] sm:text-[9px] text-[#28C840]">+12%</span>
                    </div>
                  </div>
                  {/* Mini Chart */}
                  <svg className="w-full h-6 sm:h-8 mt-1" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path className="chart-line-1" d="M 0 25 Q 15 22 25 20 T 50 15 T 75 10 T 100 5" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M 0 25 Q 15 22 25 20 T 50 15 T 75 10 T 100 5 L 100 30 L 0 30 Z" fill="url(#chartGrad1)" />
                  </svg>
                </div>

                {/* KPI 2 - Cost Savings */}
                <div className="kpi-card bg-white/[0.04] rounded-lg p-2 sm:p-3 border border-white/[0.06]">
                  <div className="text-[8px] sm:text-[9px] text-white/40 mb-1 uppercase tracking-wide">Cost Saved</div>
                  <div className="flex items-end gap-0.5">
                    <span className="text-[10px] sm:text-xs text-white/50 mb-0.5">$</span>
                    <span className="kpi-value-2 text-lg sm:text-xl font-semibold text-white tabular-nums">240</span>
                    <span className="text-[10px] sm:text-xs text-white/50 mb-0.5">K</span>
                    <div className="flex items-center ml-auto">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#28C840]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 14l5-5 5 5H7z"/>
                      </svg>
                      <span className="text-[8px] sm:text-[9px] text-[#28C840]">+8%</span>
                    </div>
                  </div>
                  {/* Mini Chart */}
                  <svg className="w-full h-6 sm:h-8 mt-1" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#28C840" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#28C840" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path className="chart-line-2" d="M 0 28 Q 20 25 35 22 T 60 18 T 85 12 T 100 8" fill="none" stroke="#28C840" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M 0 28 Q 20 25 35 22 T 60 18 T 85 12 T 100 8 L 100 30 L 0 30 Z" fill="url(#chartGrad2)" />
                  </svg>
                </div>

                {/* KPI 3 - ROI */}
                <div className="kpi-card bg-white/[0.04] rounded-lg p-2 sm:p-3 border border-white/[0.06]">
                  <div className="text-[8px] sm:text-[9px] text-white/40 mb-1 uppercase tracking-wide">ROI</div>
                  <div className="flex items-end gap-0.5">
                    <span className="kpi-value-3 text-lg sm:text-xl font-semibold text-white tabular-nums">3.2</span>
                    <span className="text-[10px] sm:text-xs text-white/50 mb-0.5">x</span>
                    <div className="flex items-center ml-auto">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#28C840]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 14l5-5 5 5H7z"/>
                      </svg>
                      <span className="text-[8px] sm:text-[9px] text-[#28C840]">+24%</span>
                    </div>
                  </div>
                  {/* Mini Chart */}
                  <svg className="w-full h-6 sm:h-8 mt-1" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path className="chart-line-3" d="M 0 26 Q 25 24 40 20 T 70 12 T 100 4" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M 0 26 Q 25 24 40 20 T 70 12 T 100 4 L 100 30 L 0 30 Z" fill="url(#chartGrad3)" />
                  </svg>
                </div>
              </div>

              {/* Bottom Status Bar */}
              <div className="absolute bottom-2 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#38BDF8]" />
                    <span className="text-[7px] sm:text-[8px] text-white/30">Efficiency</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#28C840]" />
                    <span className="text-[7px] sm:text-[8px] text-white/30">Cost</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#F59E0B]" />
                    <span className="text-[7px] sm:text-[8px] text-white/30">ROI</span>
                  </div>
                </div>
                <div className="dashboard-pulse flex items-center gap-1.5 bg-white/[0.05] px-2 py-0.5 rounded">
                  <div className="w-1 h-1 rounded-full bg-[#28C840] animate-pulse" />
                  <span className="text-[7px] sm:text-[8px] text-white/40">All systems optimal</span>
                </div>
              </div>

              <style jsx>{`
                .kpi-card {
                  animation: fadeInUp 0.6s ease-out forwards;
                  opacity: 0;
                }
                .kpi-card:nth-child(1) { animation-delay: 0.1s; }
                .kpi-card:nth-child(2) { animation-delay: 0.2s; }
                .kpi-card:nth-child(3) { animation-delay: 0.3s; }
                .chart-line-1, .chart-line-2, .chart-line-3 {
                  stroke-dasharray: 150;
                  stroke-dashoffset: 150;
                  animation: drawLine 2s ease-out forwards;
                }
                .chart-line-1 { animation-delay: 0.5s; }
                .chart-line-2 { animation-delay: 0.7s; }
                .chart-line-3 { animation-delay: 0.9s; }
                @keyframes fadeInUp {
                  from { opacity: 0; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                @keyframes drawLine {
                  to { stroke-dashoffset: 0; }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
