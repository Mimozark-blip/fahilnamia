import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaWifi,
  FaQuestionCircle,
} from "react-icons/fa";
import {
  SiMongodb,
  SiTailwindcss,
  SiJavascript,
  SiD3Dotjs,
  SiVite,
  SiSupabase,
} from "react-icons/si";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [particles, setParticles] = useState([]);

  /**
   * --------------------------------------------------
   *  PARTICLE BACKGROUND ANIMATION
   * --------------------------------------------------
   */
  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 100 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.5 + 0.1,
      }));
      setParticles(newParticles);
    };

    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x:
            p.x + p.speedX > window.innerWidth
              ? 0
              : p.x + p.speedX < 0
              ? window.innerWidth
              : p.x + p.speedX,
          y:
            p.y + p.speedY > window.innerHeight
              ? 0
              : p.y + p.speedY < 0
              ? window.innerHeight
              : p.y + p.speedY,
        }))
      );
    };

    createParticles();
    const interval = setInterval(animateParticles, 50);
    window.addEventListener("resize", createParticles);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", createParticles);
    };
  }, []);

  /**
   * --------------------------------------------------
   *  FRAMER‑MOTION VARIANTS
   * --------------------------------------------------
   */
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.5 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  /**
   * --------------------------------------------------
   *  PROJECT DATA
   * --------------------------------------------------
   */
  const projects = [
    {
      title: "DriveLuxe",
      description: "A simple landing page built with React and Tailwind CSS",
      tech: ["React", "Tailwind CSS", "Vite"],
      image: "/DriveLuxe.png",
      link: "https://drveluxe.netlify.app/",
      longDescription:
        "DriveLuxe is a sleek, modern car rental landing page with Apple-level aesthetics minimalist design, elegant typography, and a refined user experience that exudes luxury and sophistication.",
    },
    {
      title: "Blossom Boutique",
      description: "Modern UI/UX design implementation with React and Tailwind",
      tech: ["React", "Tailwind CSS", "Vite"],
      image: "/BlossomBoutique.png",
      link: "https://blossomboutique.netlify.app/",
      longDescription:
        "Blossom Boutique with a sophisticated UI and complete e-commerce functionality. The website features a clean, elegant design with soft floral colors and thoughtful animations that enhance the user experience without overwhelming it.",
    },
    {
      title: "Tripid",
      description: "Real-time data visualization dashboard",
      tech: ["React", "Tailwind CSS", "Supabase", "Vite"],
      image: "/Tripid.png",
      link: "https://tripid.netlify.app/",
      longDescription:
        "A budgeting and expense tracking app with a clean, professional dashboard featuring spending categories, interactive charts, and budget goal management!",
    },
    /**
     * --------------------------------------------------
     *  COMING SOON CARD
     * --------------------------------------------------
     */
    {
      title: "Coming Soon",
      description: "A new innovative project is on the way!",
      tech: ["Unknown"],
      image: "/coming-soon1.jpg", // Save the image from the Pexels URL and add it to your public folder
      link: "#",
      longDescription:
        "Stay tuned for our next exciting project. We're currently working on something new and can't wait to share it with you!",
    },
    {
      title: "Coming Soon",
      description: "A new innovative project is on the way!",
      tech: ["Unknown"],
      image: "/coming-soon1.jpg", // Ensure this image is in your public folder
      link: "#",
      longDescription:
        "Stay tuned for our next exciting project. We're currently working on something new and can't wait to share it with you!",
    },
    {
      title: "Coming Soon",
      description: "A new innovative project is on the way!",
      tech: ["Unknown"],
      image: "/coming-soon1.jpg", // Reuse or change this image for variety
      link: "#",
      longDescription:
        "Stay tuned for our next exciting project. We're currently working on something new and can't wait to share it with you!",
    },
  ];

  /**
   * --------------------------------------------------
   *  ICON MAP
   * --------------------------------------------------
   */
  const techIconMap = {
    React: FaReact,
    "Node.js": FaNodeJs,
    MongoDB: SiMongodb,
    "Tailwind CSS": SiTailwindcss,
    JavaScript: SiJavascript,
    "D3.js": SiD3Dotjs,
    WebSocket: FaWifi,
    Vite: SiVite,
    Supabase: SiSupabase,
    Unknown: FaQuestionCircle,
  };

  return (
    <div
      id="projects"
      className="relative py-10 pt-[7rem] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, idx) => (
          <motion.div
            key={idx}
            animate={{
              x: particle.x,
              y: particle.y,
              opacity: particle.opacity,
            }}
            transition={{ duration: 0.05, ease: "linear" }}
            className="absolute"
            style={{
              width: particle.size,
              height: particle.size,
              background: "linear-gradient(to right, #2dd4bf, #14b8a6)",
              borderRadius: "50%",
              filter: "blur(1px)",
              boxShadow: "0 0 8px rgba(45, 212, 191, 0.3)",
            }}
          />
        ))}
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-5xl pb-4 font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500  [text-shadow:0_0_20px_rgba(45,212,191,0.3)]"
        >
          Projects
        </motion.h2>

        {/* Project cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, idx) => {
            const isComingSoon = project.title === "Coming Soon";
            return (
              <motion.div
                key={idx}
                variants={item}
                className="group relative bg-gray-800/30 backdrop-blur-xl rounded-xl overflow-hidden shadow-xl transition-all duration-500
                  before:absolute before:inset-0 before:rounded-xl before:-z-10 
                  before:bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.1),transparent_60%)]
                  before:animate-[pulse_4s_ease-in-out_infinite]
                  after:absolute after:inset-[2px] after:bg-gray-900/90 after:rounded-[10px] after:-z-10
                  hover:shadow-[0_0_30px_5px_rgba(45,212,191,0.3)]
                  hover:before:bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.4),transparent_70%)]
                  hover:scale-[1.02]
                  hover:rotate-[1deg]
                  [&>*]:relative"
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                style={{ perspective: 1000 }}
                onClick={() => {
                  if (!isComingSoon) setSelectedProject(project);
                }}
              >
                {/* Border animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-100"
                      initial={{ pathOffset: i / 20, opacity: 0 }}
                      animate={{
                        pathOffset: [i / 20, (i + 1) / 20],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        offsetPath:
                          "path('M 0 0 L 100% 0 L 100% 100% L 0 100% Z')",
                        filter: "blur(1px)",
                        boxShadow: "0 0 8px rgba(45, 212, 191, 0.5)",
                      }}
                    />
                  ))}
                </div>
                {/* Gradient border */}
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-teal-500/30 to-teal-400/30 opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500 animate-[border-flow_3s_linear_infinite]"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-[shine_1s_ease-in-out_infinite]"></div>

                {/* Card image + overlay */}
                <div className="group relative overflow-hidden rounded-t-xl">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500 ${
                      isComingSoon ? "grayscale blur-sm" : ""
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  {/* Overlay description */}
                  {!isComingSoon && (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.15),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  )}
                  <div
                    className={`absolute inset-0 flex items-center justify-center ${
                      isComingSoon ? "bg-gray-900/60" : "bg-gray-900/40"
                    } backdrop-blur-[2px] p-4 overflow-y-auto opacity-0 group-hover:opacity-100 transition-all duration-300`}
                  >
                    <p className="text-gray-100 text-sm leading-relaxed drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-center">
                      {project.longDescription}
                    </p>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6 relative">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-200 to-teal-400 mb-3 group-hover:[text-shadow:_0_0_15px_rgba(45,212,191,0.5)] transition-all duration-300 text-center">
                    {project.title}
                  </h3>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2 mb-6 justify-center">
                    {project.tech.map((tech, techIdx) => {
                      const Icon = techIconMap[tech] || FaDatabase;
                      return (
                        <span
                          key={techIdx}
                          className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-700/30 backdrop-blur-md text-teal-300 rounded-full border border-teal-500/20 shadow-[0_0_15px_rgba(45,212,191,0.1)] hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:bg-gray-700/50 hover:border-teal-500/30 transform hover:scale-105 transition-all duration-300 ease-out"
                        >
                          <Icon className="w-4 h-4" />
                          {tech}
                        </span>
                      );
                    })}
                  </div>

                  {/* CTA button / placeholder label */}
                  {isComingSoon ? (
                    <span className="inline-block bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-2 rounded-lg shadow-lg cursor-not-allowed opacity-60 select-none">
                      Coming Soon
                    </span>
                  ) : (
                    <motion.a
                      href={project.link}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block bg-gradient-to-r from-teal-400 to-teal-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-teal-500/50 transition-all duration-300 font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(project.link, "_blank");
                      }}
                    >
                      View Project
                    </motion.a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
