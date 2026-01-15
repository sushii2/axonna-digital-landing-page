"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      if (!heroSection) {
        setIsScrolled(window.scrollY > 100);
        return;
      }

      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const scrollPosition = window.scrollY + 80;
      setIsScrolled(scrollPosition >= heroBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-white shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a
              href="/"
              className={`text-xl sm:text-2xl font-semibold tracking-tight transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen ? "text-[#0B1B32]" : "text-white"
              }`}
            >
              Axonna
            </a>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#about"
                className={`text-sm font-medium transition-colors duration-300 hover:opacity-80 ${
                  isScrolled ? "text-[#0B1B32]" : "text-white/90"
                }`}
              >
                About
              </a>
              <a
                href="#framework"
                className={`text-sm font-medium transition-colors duration-300 hover:opacity-80 ${
                  isScrolled ? "text-[#0B1B32]" : "text-white/90"
                }`}
              >
                Framework
              </a>
              <a
                href="#contact"
                className={`text-sm font-medium transition-colors duration-300 hover:opacity-80 ${
                  isScrolled ? "text-[#0B1B32]" : "text-white/90"
                }`}
              >
                Contact
              </a>
            </div>

            {/* CTA Button - Desktop */}
            <Button
              data-cal-namespace="30min"
              data-cal-link="sakshamsaraswat/30min"
              data-cal-config='{"layout":"month_view"}'
              className={`hidden md:inline-flex rounded-full px-6 h-10 text-sm font-medium transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? "bg-[#0B1B32] text-white hover:bg-[#132744]"
                  : "bg-white text-[#0B1B32] hover:bg-white/90"
              }`}
            >
              Book a discovery call
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen ? "text-[#0B1B32]" : "text-white"
              }`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] bg-white transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "64px" }}
      >
        <div className="flex flex-col h-full px-6 pt-8 pb-6">
          {/* Navigation Links */}
          <div className="flex flex-col gap-2">
            <a
              href="#about"
              onClick={handleLinkClick}
              className="text-lg font-medium text-[#0B1B32] py-3 border-b border-gray-100 transition-colors hover:text-[#38BDF8]"
            >
              About
            </a>
            <a
              href="#framework"
              onClick={handleLinkClick}
              className="text-lg font-medium text-[#0B1B32] py-3 border-b border-gray-100 transition-colors hover:text-[#38BDF8]"
            >
              Framework
            </a>
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="text-lg font-medium text-[#0B1B32] py-3 border-b border-gray-100 transition-colors hover:text-[#38BDF8]"
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <Button
              onClick={handleLinkClick}
              data-cal-namespace="30min"
              data-cal-link="sakshamsaraswat/30min"
              data-cal-config='{"layout":"month_view"}'
              className="w-full rounded-full h-12 text-base font-medium bg-[#0B1B32] text-white hover:bg-[#132744] transition-all duration-300 cursor-pointer"
            >
              Book a discovery call
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-auto pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500">Get in touch</p>
            <a
              href="mailto:steve.t.slaughter@gmail.com"
              className="text-sm text-[#0B1B32] mt-1 block hover:text-[#38BDF8] transition-colors"
            >
              steve.t.slaughter@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
