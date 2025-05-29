import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = ["Home", "About", "Projects", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navItems.map((item) => ({
        id: item.toLowerCase(),
        element: document.getElementById(item.toLowerCase()),
      }));

      const currentSection = sections.find((section) => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <nav
      className={`fixed w-full transition-all duration-300 z-50 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-lg shadow-lg shadow-teal-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 relative group">
            <span className="text-teal-400 text-2xl font-bold relative">
              <img src="/letter-f.png" alt="Logo" className="w-8 h-8" />
              <span className="absolute -inset-1 bg-teal-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative group px-4 py-2 ${
                    activeSection === item.toLowerCase()
                      ? "text-teal-400"
                      : "text-gray-300"
                  }`}
                >
                  <span
                    className={`relative z-10 text-sm font-medium transition duration-300 group-hover:text-teal-400 ${
                      activeSection === item.toLowerCase()
                        ? "text-teal-400"
                        : ""
                    }`}
                  >
                    {item}
                  </span>
                  <span
                    className={`absolute inset-x-0 h-0.5 bottom-0 bg-gradient-to-r from-teal-400 to-teal-500 transform origin-left transition-transform duration-300 ${
                      activeSection === item.toLowerCase()
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                  <span
                    className={`absolute inset-0 rounded-lg bg-teal-400/10 opacity-0 transform scale-95 transition-all duration-300 ${
                      activeSection === item.toLowerCase()
                        ? "opacity-100 scale-100"
                        : "group-hover:opacity-100 group-hover:scale-100"
                    }`}
                  ></span>
                </a>
              ))}
            </div>
            <a
              href="/Resume.pdf"
              download
              className="ml-4 px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition duration-300"
            >
              Download CV
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative group inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-teal-400 focus:outline-none transition duration-300"
            >
              <span className="absolute inset-0 rounded-lg bg-teal-400/10 opacity-0 group-hover:opacity-100 transition duration-300"></span>
              <svg
                className="h-6 w-6 transition-transform duration-300"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                style={{
                  transform: isOpen ? "rotate(180deg)" : "none",
                }}
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu with enhanced animation */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out transform ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          } ${
            isOpen ? "max-h-64" : "max-h-0"
          } overflow-hidden backdrop-blur-lg bg-gray-900/95`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`relative group block px-3 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.toLowerCase() ? "bg-teal-400/10" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="absolute inset-0 bg-teal-400/10 rounded-lg opacity-0 transform scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"></span>
                <span
                  className={`relative z-10 text-base font-medium transition duration-300 ${
                    activeSection === item.toLowerCase()
                      ? "text-teal-400"
                      : "text-gray-300 group-hover:text-teal-400"
                  }`}
                >
                  {item}
                </span>
                {activeSection === item.toLowerCase() && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-teal-400 rounded-r-full transform scale-y-100"></span>
                )}
              </a>
            ))}
            <a
              href="/Resume.pdf"
              download
              className="block text-center px-3 py-2 mt-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition duration-300"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
