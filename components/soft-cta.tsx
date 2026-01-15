"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "./ui/button";

export function SoftCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Animate the decorative lines expanding from center
            gsap.fromTo(
              lineLeftRef.current,
              { width: 0, opacity: 0 },
              {
                width: "100%",
                opacity: 1,
                duration: 1,
                ease: "power3.out",
              }
            );

            gsap.fromTo(
              lineRightRef.current,
              { width: 0, opacity: 0 },
              {
                width: "100%",
                opacity: 1,
                duration: 1,
                ease: "power3.out",
              }
            );

            // Staggered text reveal
            gsap.fromTo(
              ".cta-heading",
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.3,
                ease: "power3.out",
                clearProps: "transform",
              }
            );

            gsap.fromTo(
              ".cta-paragraph",
              { y: 25, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.15,
                delay: 0.5,
                ease: "power3.out",
                clearProps: "transform",
              }
            );

            gsap.fromTo(
              ".cta-button",
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: 0.9,
                ease: "power3.out",
                clearProps: "transform",
              }
            );

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F8F7F4] py-24 lg:py-32 overflow-hidden"
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Decorative lines */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex-1 flex justify-end">
            <div
              ref={lineLeftRef}
              className="h-px bg-gradient-to-l from-axonna-navy/30 to-transparent"
              style={{ width: 0 }}
            />
          </div>
          <div className="w-2 h-2 rounded-full bg-axonna-blue/60" />
          <div className="flex-1">
            <div
              ref={lineRightRef}
              className="h-px bg-gradient-to-r from-axonna-navy/30 to-transparent"
              style={{ width: 0 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="cta-heading text-2xl sm:text-3xl lg:text-4xl font-serif text-axonna-navy leading-snug tracking-tight">
            Not sure where AI actually fits in your business?
          </h2>

          <p className="cta-paragraph mt-8 text-base sm:text-lg text-axonna-navy/65 leading-relaxed max-w-2xl mx-auto">
            Most companies feel pressure to &ldquo;do something with AI&rdquo;
            but lack a clear way to evaluate where it helps and where it does
            not.
          </p>

          <p className="cta-paragraph mt-5 text-base sm:text-lg text-axonna-navy/65 leading-relaxed max-w-2xl mx-auto">
            Our{" "}
            <span className="text-axonna-navy/90 font-medium">
              AI Readiness and Implementation Framework
            </span>{" "}
            creates clarity by connecting business objectives, operational
            realities, and modern technology into a single, actionable view.
          </p>

          <div className="cta-button mt-10">
            <Button
              data-cal-namespace="30min"
              data-cal-link="sakshamsaraswat/30min"
              data-cal-config='{"layout":"month_view"}'
              className="rounded-full h-12 px-8 text-base font-medium bg-axonna-navy text-white hover:bg-axonna-navy-light transition-all duration-300 shadow-md shadow-axonna-navy/10 cursor-pointer"
            >
              Book a discovery call
            </Button>
          </div>
        </div>

        {/* Decorative bottom lines */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="flex-1 flex justify-end">
            <div className="w-full h-px bg-gradient-to-l from-axonna-navy/20 to-transparent" />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-axonna-navy/20" />
          <div className="flex-1">
            <div className="w-full h-px bg-gradient-to-r from-axonna-navy/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
