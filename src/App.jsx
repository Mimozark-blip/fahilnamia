import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [text, setText] = useState("");
  const codeSnippet =
    "const Portfolio = () => {\n  return (\n    <div>\n      Loading...\n    </div>\n  );\n};";

  useEffect(() => {
    let currentChar = 0;
    const typingInterval = setInterval(() => {
      if (currentChar < codeSnippet.length) {
        setText((prev) => prev + codeSnippet[currentChar]);
        currentChar++;
        setLoadingProgress(
          Math.floor((currentChar / codeSnippet.length) * 100)
        );
      } else {
        clearInterval(typingInterval);
        // Increased timeout for smoother transition
        setTimeout(() => setIsLoading(false), 1000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50"
          >
            <div className="flex flex-col justify-center align-middle items-center gap-10">
              <motion.div
                className="w-96 h-48 bg-gray-800 rounded-lg p-4 font-mono text-teal-400 whitespace-pre"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {text}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="inline-block w-2 h-5 bg-teal-400 ml-1"
                />
              </motion.div>

              <div className="relative w-64">
                <motion.div
                  className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-400 to-emerald-400"
                    initial={{ width: "0%" }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-teal-400 font-semibold tracking-wider"
                >
                  {loadingProgress}%
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900"
          >
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
