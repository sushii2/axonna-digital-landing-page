"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Animate the divider line
            gsap.fromTo(
              ".footer-divider",
              { width: 0 },
              { width: "100%", duration: 1, ease: "power3.out" }
            );

            // Animate content
            gsap.fromTo(
              ".footer-brand",
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                delay: 0.3,
                ease: "power3.out",
                clearProps: "transform",
              }
            );

            gsap.fromTo(
              ".footer-tagline",
              { y: 15, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: 0.45,
                ease: "power3.out",
                clearProps: "transform",
              }
            );

            gsap.fromTo(
              ".footer-info",
              { y: 15, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                delay: 0.6,
                ease: "power3.out",
                clearProps: "transform",
              }
            );

            gsap.fromTo(
              ".footer-bottom",
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.6,
                delay: 0.9,
                ease: "power2.out",
              }
            );

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative bg-[#0B1B32] pt-16 pb-8 overflow-hidden"
    >
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Brand */}
          <div>
            <h3 className="footer-brand text-2xl lg:text-3xl font-serif text-white tracking-tight">
              Axonna Digital Advisory
            </h3>
            <p className="footer-tagline mt-3 text-white/50 text-base italic">
              Modern operations for an AI-powered future
            </p>
          </div>

          {/* Right Column - Contact Info */}
          <div className="md:text-right">
            <p className="footer-info text-white/60 text-sm">
              Based in the United States
            </p>
            <a
              href="mailto:steve.t.slaughter@gmail.com"
              className="footer-info mt-3 inline-block text-white/80 text-sm hover:text-[#38BDF8] transition-colors duration-300"
            >
              steve.t.slaughter@gmail.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 mb-8">
          <div className="footer-divider h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Bottom Row */}
        <div className="footer-bottom flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Axonna Digital Advisory. All rights
            reserved.
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>LinkedIn</span>
            </a>

            <span className="text-white/20">|</span>

            <a
              href="/privacy"
              className="text-white/50 text-sm hover:text-white transition-colors duration-300"
            >
              Privacy
            </a>
          </div>
        </div>

        {/* Decorative bottom element */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-[#38BDF8]/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1 h-1 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </footer>
  );
}
