import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const About = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();

    // Matrix rain configuration
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(0);
    const matrixChars =
      "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Draw matrix rain
    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(45, 212, 191, 0.8)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text =
          matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Add glow effect
        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgba(45, 212, 191, 0.5)";

        // Vary the opacity for depth effect
        ctx.fillStyle = `rgba(45, 212, 191, ${Math.random() * 0.5 + 0.5})`;
        ctx.fillText(text, x, y);

        // Reset shadow
        ctx.shadowBlur = 0;

        // Reset drop to top of screen when it reaches bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i]++;
        }
      }
    };

    // Animation loop
    const animate = () => {
      drawMatrix();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    window.addEventListener("resize", () => {
      resizeCanvas();
      drops.length = Math.floor(canvas.width / fontSize);
      drops.fill(0);
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const skills = [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "MongoDB",
    "Python",
    "Git",
    "Firebase",
  ];

  return (
    <div
      id="about"
      className="min-h-screen py-30 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 relative overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Simple background effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(45,212,191,0.15),transparent)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(45,212,191,0.1),transparent)] animate-pulse [animation-delay:1s]" />
      </div>

      {/* Enhanced background effect with circuit patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(45,212,191,0.15),transparent)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(45,212,191,0.1),transparent)] animate-pulse [animation-delay:1s]" />
        {/* Circuit board pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/4 top-1/4 w-px h-32 bg-teal-300/30 before:content-[''] before:absolute before:w-2 before:h-2 before:rounded-full before:bg-teal-400/50 before:-left-1 before:top-0 after:content-[''] after:absolute after:w-32 after:h-px after:bg-teal-500/30 after:top-32 after:left-0" />
          <div className="absolute right-1/4 bottom-1/4 w-px h-32 bg-teal-500/30 before:content-[''] before:absolute before:w-2 before:h-2 before:rounded-full before:bg-teal-400/50 before:-left-1 before:bottom-0 after:content-[''] after:absolute after:w-32 after:h-px after:bg-teal-500/30 after:bottom-0 after:right-0" />
          <div className="absolute left-1/3 bottom-1/3 w-48 h-px bg-teal-300/30 before:content-[''] before:absolute before:w-2 before:h-2 before:rounded-full before:bg-teal-400/50 before:left-0 before:-top-1" />
          <div className="absolute right-1/3 top-1/3 w-48 h-px bg-teal-500/30 before:content-[''] before:absolute before:w-2 before:h-2 before:rounded-full before:bg-teal-400/50 before:right-0 before:-top-1" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.h2
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500 mb-12 [text-shadow:0_0_20px_rgba(45,212,191,0.3)]"
        >
          About Me
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="group relative space-y-6 p-8 rounded-xl overflow-hidden before:content-[''] before:absolute before:top-0 before:left-[50px] before:w-[50%] before:h-full before:bg-gradient-to-r before:from-teal-500 before:to-teal-300 before:rounded-lg before:transform before:skew-x-[15deg] before:transition-all before:duration-500 before:[box-shadow:0_0_25px_rgba(45,212,191,0.3)] after:content-[''] after:absolute after:top-0 after:left-[50px] after:w-[50%] after:h-full after:bg-gradient-to-r after:from-teal-500 after:to-teal-300 after:rounded-lg after:transform after:skew-x-[15deg] after:transition-all after:duration-500 after:filter after:blur-[30px] hover:before:skew-x-0 hover:before:left-[20px] hover:before:w-[calc(100%-90px)] hover:after:skew-x-0 hover:after:left-[20px] hover:after:w-[calc(100%-90px)]"
          >
            {/* Circuit pattern for card */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-teal-400/50" />
              <div className="absolute top-4 left-6 w-16 h-px bg-teal-500/30" />
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-teal-400/50" />
              <div className="absolute bottom-4 right-6 w-16 h-px bg-teal-500/30" />
            </div>
            <div className="relative z-10 bg-gray-800/50 backdrop-blur-xl p-6 rounded-lg transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2">
              <h3 className="text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500 [text-shadow:0_0_15px_rgba(45,212,191,0.3)]">
                Who I Am
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg mt-4 group-hover:text-teal-50 transition-colors duration-300">
                I'm a Computer Engineering eager to learn and grow as a full
                stack developer. I’m especially interested in IoT, AI, and web
                development.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg mt-4 group-hover:text-teal-50 transition-colors duration-300">
                I’ve started exploring projects combining hardware and software,
                and I’m excited to take on new challenges and build real-world
                experience.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="group relative p-8 rounded-xl overflow-hidden before:content-[''] before:absolute before:top-0 before:left-[50px] before:w-[50%] before:h-full before:bg-gradient-to-r before:from-teal-300 before:to-teal-500 before:rounded-lg before:transform before:skew-x-[15deg] before:transition-all before:duration-500 before:[box-shadow:0_0_25px_rgba(45,212,191,0.3)] after:content-[''] after:absolute after:top-0 after:left-[50px] after:w-[50%] after:h-full after:bg-gradient-to-r after:from-teal-300 after:to-teal-500 after:rounded-lg after:transform after:skew-x-[15deg] after:transition-all after:duration-500 after:filter after:blur-[30px] hover:before:skew-x-0 hover:before:left-[20px] hover:before:w-[calc(100%-90px)] hover:after:skew-x-0 hover:after:left-[20px] hover:after:w-[calc(100%-90px)]"
          >
            {/* Circuit pattern for card */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-teal-400/50" />
              <div className="absolute top-4 right-6 w-16 h-px bg-teal-500/30" />
              <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-teal-400/50" />
              <div className="absolute bottom-4 left-6 w-16 h-px bg-teal-500/30" />
            </div>
            <div className="relative z-10 bg-gray-800/50 backdrop-blur-xl p-6 rounded-lg transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2">
              <h3 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500 mb-8 [text-shadow:0_0_15px_rgba(45,212,191,0.3)]">
                Skills
              </h3>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              >
                {skills.map((skill) => (
                  <motion.div
                    key={skill}
                    variants={item}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                    }}
                    className="group/skill relative rounded-xl p-4 text-center overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-teal-500/20 before:to-teal-300/20 before:rounded-lg before:transition-all before:duration-300 before:[box-shadow:0_0_15px_rgba(45,212,191,0.1)] after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-br after:from-teal-500/20 after:to-teal-300/20 after:rounded-lg after:transition-all after:duration-300 after:filter after:blur-[10px] hover:before:bg-gradient-to-br hover:before:from-teal-500/40 hover:before:to-teal-300/40 hover:after:bg-gradient-to-br hover:after:from-teal-500/40 hover:after:to-teal-300/40 group-hover/skill:shadow-[0_0_20px_rgba(45,212,191,0.3)]"
                  >
                    <div className="relative z-10 text-teal-200 font-medium transition-colors duration-300 group-hover/skill:text-teal-100">
                      {skill}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
