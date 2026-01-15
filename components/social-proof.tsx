"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export function SocialProof() {
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
              ".proof-heading",
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );

            gsap.fromTo(
              ".proof-text",
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
            );

            gsap.fromTo(
              ".logo-item",
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                delay: 0.4,
                ease: "power2.out",
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
    <section ref={sectionRef} id="about" className="bg-white py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content */}
        <div className="max-w-3xl">
          <h2 className="proof-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#0B1B32] leading-[1.15] tracking-tight">
            Built by operators,{" "}
            <span className="italic text-[#2563EB]">trusted</span> by
            executives
          </h2>

          <p className="proof-text mt-6 sm:mt-8 text-base sm:text-lg text-[#0B1B32]/70 leading-relaxed">
            Axonna brings experience across software, manufacturing, operations,
            and scale-up environments, with leadership backgrounds at Northrop
            Grumman, Deloitte, Datadog and Harvard Business School.
          </p>

          <p className="proof-text mt-4 text-base sm:text-lg text-[#0B1B32]/70 leading-relaxed">
            We work with founder-led and private-equity-backed middle market
            companies that want practical results.
          </p>
        </div>

        {/* Company Logos */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Northrop Grumman */}
            <div className="logo-item flex items-center justify-center h-10 sm:h-12 lg:h-16 opacity-60 hover:opacity-100 transition-opacity duration-300">
              <Image
                src="/NOC_BIG.svg"
                alt="Northrop Grumman"
                width={180}
                height={40}
                className="w-auto h-6 sm:h-8 lg:h-10 object-contain"
              />
            </div>

            {/* Deloitte */}
            <div className="logo-item flex items-center justify-center h-10 sm:h-12 lg:h-16 opacity-60 hover:opacity-100 transition-opacity duration-300">
              <Image
                src="/Logo_of_Deloitte.svg"
                alt="Deloitte"
                width={140}
                height={40}
                className="w-auto h-5 sm:h-7 lg:h-8 object-contain"
              />
            </div>

            {/* Datadog */}
            <div className="logo-item flex items-center justify-center h-10 sm:h-12 lg:h-16 opacity-60 hover:opacity-100 transition-opacity duration-300">
              <Image
                src="/dd_icon_rgb.svg"
                alt="Datadog"
                width={140}
                height={40}
                className="w-auto h-8 sm:h-10 lg:h-12 object-contain"
              />
            </div>

            {/* Harvard Business School */}
            <div className="logo-item flex items-center justify-center h-10 sm:h-12 lg:h-16 opacity-60 hover:opacity-100 transition-opacity duration-300">
              <Image
                src="/Harvard_Business_School.svg"
                alt="Harvard Business School"
                width={160}
                height={40}
                className="w-auto h-8 sm:h-10 lg:h-12 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
