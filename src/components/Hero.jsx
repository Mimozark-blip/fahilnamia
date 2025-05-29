import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaJs,
} from "react-icons/fa";
import { SiMongodb, SiFirebase, SiMysql, SiPostgresql } from "react-icons/si";

const TypewriterEffect = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    "Computer Engineer",
    "Gamer",
    "Cat Lover",
    "UI/UX Enthusiast",
    "Tech Innovator",
  ];

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 150;
    const currentText = texts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentCharIndex < currentText.length) {
          setCurrentCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (currentCharIndex > 0) {
          setCurrentCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentTextIndex, isDeleting]);

  return (
    <motion.span
      className="whitespace-nowrap overflow-hidden border-r-2 border-teal-400 pr-1 animate-blink"
      style={{ borderRightColor: "#4fd1c5" }}
    >
      {texts[currentTextIndex].substring(0, currentCharIndex)}
    </motion.span>
  );
};

const Hero = () => {
  useEffect(() => {
    // Particles.js setup
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#4fd1c5" },
          opacity: { value: 0.5 },
          size: { value: 3 },
          line_linked: { enable: true, color: "#4fd1c5", opacity: 0.5 },
        },
      });
    };

    script.onerror = () => {
      console.error("Failed to load particles.js");
    };

    // Add Intersection Observer for scroll spy
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.body.setAttribute("data-current-section", "home");
        }
      },
      {
        threshold: 0.5,
      }
    );

    const heroSection = document.getElementById("home");
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      // Cleanup particles.js
      document.body.removeChild(script);

      // Cleanup observer
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const getRandomPosition = () => ({
    x: Math.random() * (window.innerWidth - 100),
    y: Math.random() * (window.innerHeight - 100),
  });

  const FloatingIcon = ({ Icon, size, color }) => {
    const randomDuration = Math.random() * 5 + 15; // 15-20 seconds
    const randomDelay = Math.random() * 2;

    return (
      <motion.div
        initial={getRandomPosition()}
        animate={{
          x: [
            null,
            getRandomPosition().x,
            getRandomPosition().x,
            getRandomPosition().x,
          ],
          y: [
            null,
            getRandomPosition().y,
            getRandomPosition().y,
            getRandomPosition().y,
          ],
          rotate: [0, 360],
        }}
        transition={{
          duration: randomDuration,
          repeat: Infinity,
          ease: "linear",
          delay: randomDelay,
          times: [0, 0.3, 0.6, 1],
        }}
        className={`absolute ${color} transform hover:scale-110 transition-transform`}
      >
        <Icon className={size} />
      </motion.div>
    );
  };

  const icons = [
    { Icon: FaReact, size: "w-40 h-40", color: "text-teal-400/30" },
    { Icon: FaJs, size: "w-24 h-24", color: "text-yellow-400/20" },
    { Icon: FaPython, size: "w-28 h-28", color: "text-blue-400/25" },
    { Icon: FaNodeJs, size: "w-20 h-20", color: "text-green-400/25" },
    { Icon: FaJava, size: "w-24 h-24", color: "text-red-400/25" },
    { Icon: FaHtml5, size: "w-26 h-26", color: "text-orange-500/25" },
    { Icon: FaCss3Alt, size: "w-24 h-24", color: "text-blue-400/25" },
    { Icon: SiMongodb, size: "w-28 h-28", color: "text-green-500/25" },
    { Icon: SiFirebase, size: "w-24 h-24", color: "text-yellow-500/25" },
    { Icon: SiMysql, size: "w-26 h-26", color: "text-blue-600/25" },
    { Icon: SiPostgresql, size: "w-22 h-22", color: "text-blue-400/25" },
  ];

  return (
    <div
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      <div id="particles-js" className="absolute inset-0" />

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {icons.map((icon, index) => (
          <FloatingIcon
            key={index}
            Icon={icon.Icon}
            size={icon.size}
            color={icon.color}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative group"
        >
          {/* Main image container */}
          <div className="w-48 h-48 rounded-full overflow-hidden relative z-10 bg-gray-800 before:content-[''] before:absolute before:inset-0 before:bg-teal-400/30 before:scale-0 before:rounded-full before:transition-transform before:duration-500 group-hover:before:scale-[2.5] before:origin-center before:ease-in-out before:animate-ripple">
            <img
              src="/Profile.png"
              alt="Fahil"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 relative z-10"
            />
          </div>

          {/* Animated border and glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 via-teal-200 to-teal-400 rounded-full opacity-75 blur-sm group-hover:opacity-100 group-hover:blur transition duration-300 animate-tilt" />

          {/* Inner glow */}
          <div className="absolute -inset-1 rounded-full bg-teal-400/20 blur-md group-hover:bg-teal-400/30 transition-colors duration-300" />

          {/* Outer glow */}
          <div className="absolute -inset-2 rounded-full bg-teal-400/10 blur-xl group-hover:bg-teal-400/20 transition-colors duration-300" />
        </motion.div>

        <div>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl lg:text-7xl font-bold text-white mb-6 bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200 tracking-wide [text-rendering:geometricPrecision]"
          >
            Hi, I'm{" "}
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              className="text-teal-400 inline-block"
            >
              Fahil
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl text-gray-300 mb-10 tracking-wide [text-rendering:geometricPrecision] flex items-center justify-center h-8"
          >
            <TypewriterEffect />
          </motion.p>
          <motion.button
            onClick={scrollToProjects}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(45, 212, 191, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-teal-500/50 transition duration-300"
          >
            View My Work
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
