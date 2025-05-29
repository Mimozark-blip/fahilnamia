import { MdLocationPin } from "react-icons/md";
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/Mimozark-blip", icon: "github" },
    // { name: "Google", url: "#", icon: "google" },
    {
      name: "Facebook",
      url: "https://www.facebook.com/fahil.namia.1",
      icon: "facebook",
    },
  ];

  // Update coordinates to your desired location
  const position = [14.552201, 121.188372];
  // Custom marker icon configuration
  const customIcon = new L.Icon({
    iconUrl: "./location.png", // Replace with your image path
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [35, 35], // Adjust size based on your image
    iconAnchor: [20, 40], // Adjust anchor point (bottom center of the icon)
    popupAnchor: [0, -40], // Adjust popup position
    shadowSize: [35, 35],
  });

  // Fix for default marker icon using import statements instead of require
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (
          this.x < 0 ||
          this.x > canvas.width ||
          this.y < 0 ||
          this.y > canvas.height
        ) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${this.opacity + 0.3})`; // Increased base opacity
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = "rgba(45, 212, 191, 0.5)";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for other drawings
      }
    }

    // Create particles
    const createParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor(
        (canvas.width * canvas.height) / 8000 // Increased number of particles
      );
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };
    createParticles();

    // Draw circuit lines
    const drawCircuitLines = () => {
      // Add gradient overlay effect
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3,
        canvas.height * 0.3,
        0,
        canvas.width * 0.3,
        canvas.height * 0.3,
        canvas.width * 0.5
      );
      gradient1.addColorStop(0, "rgba(45, 212, 191, 0.15)");
      gradient1.addColorStop(1, "transparent");

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7,
        canvas.height * 0.7,
        0,
        canvas.width * 0.7,
        canvas.height * 0.7,
        canvas.width * 0.5
      );
      gradient2.addColorStop(0, "rgba(45, 212, 191, 0.1)");
      gradient2.addColorStop(1, "transparent");

      // Draw gradients
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw circuit lines with enhanced styling
      ctx.strokeStyle = "rgba(45, 212, 191, 0.1)";
      ctx.lineWidth = 1;

      // Create a grid of points
      const gridSize = 50;
      const points = [];
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          if (Math.random() > 0.5) {
            points.push({ x, y });
          }
        }
      }

      // Draw circuit nodes (dots)
      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(45, 212, 191, 0.3)";
        ctx.fill();
      });

      // Connect random points with enhanced styling
      points.forEach((point) => {
        const nearbyPoints = points.filter((p) => {
          const distance = Math.sqrt(
            Math.pow(p.x - point.x, 2) + Math.pow(p.y - point.y, 2)
          );
          return distance < gridSize * 2 && distance > 0;
        });

        if (nearbyPoints.length > 0) {
          const target =
            nearbyPoints[Math.floor(Math.random() * nearbyPoints.length)];
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = "rgba(45, 212, 191, 0.1)";
          ctx.stroke();
        }
      });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawCircuitLines();

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      id="contact"
      className="min-h-screen py-20 md:p-20 md:pt-30 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <ToastContainer position="bottom-right" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.5 }} // Increased canvas opacity from 0.3 to 0.5
      />

      {/* Background gradient effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,209,197,0.15),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(45,212,191,0.1),transparent)] animate-pulse [animation-delay:1s]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.h2
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500 mb-12 [text-shadow:0_0_20px_rgba(45,212,191,0.3)]"
        >
          Get in Touch
        </motion.h2>

        <div className="flex flex-wrap gap-8">
          {/* Contact Info */}
          <div className="flex-1 min-w-[300px] justify-center items-center align-middle bg-gray-800/50 backdrop-blur-xl p-8 rounded-xl border-2 border-gray-700/50 hover:border-teal-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-500 mb-4">
              Contact Me
            </h3>
            <p className="text-gray-300 leading-relaxed">
              I'm always open to new opportunities and collaborations. Feel free
              to reach out!
            </p>

            {/* Location info */}
            <div className="mt-28 flex items-center p-0 text-gray-300">
              <MdLocationPin className="w-16 h-10 m-2 ml-0" />
              {/* <svg
                className="w-5 h-5 text-teal-400 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg> */}
              <span>
                Blk 6 Lot 21 Mt.Samat St. Grandvalley Phase 1 Subd. Mahabang
                Parang Angono, Rizal
              </span>
            </div>

            {/* Social links */}
            <div className="flex space-x-6 mt-8">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="group relative"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-teal-300 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500" />
                  <div className="relative p-2 bg-gray-800 rounded-lg ring-1 ring-gray-700 transform transition duration-300 group-hover:scale-110 group-hover:ring-teal-400">
                    <span className="sr-only">{link.name}</span>
                    <svg
                      className="h-6 w-6 text-gray-300 group-hover:text-teal-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {link.icon === "github" && (
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      )}
                      {/* {link.icon === "google" && (
                        <path d="M21.35 11.1H12v2.8h5.35c-.2 1.12-.83 2.06-1.77 2.68v2.2h2.87c1.67-1.55 2.63-3.85 2.63-6.48 0-.55-.05-1.1-.13-1.6zM12 22c2.4 0 4.4-.8 5.87-2.16l-2.87-2.2c-.8.54-1.8.86-3 .86-2.3 0-4.24-1.55-4.93-3.63H4.07v2.28A10 10 0 0 0 12 22zM7.07 13.87a6.05 6.05 0 0 1 0-3.74v-2.3H4.07a10 10 0 0 0 0 8.35l3-2.3zM12 6.1c1.3 0 2.48.45 3.4 1.34l2.55-2.55A9.9 9.9 0 0 0 12 2a10 10 0 0 0-7.93 3.84l3 2.3C7.76 6.89 9.7 6.1 12 6.1z" />
                      )} */}
                      {link.icon === "facebook" && (
                        <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.337v21.326C0 23.4.6 24 1.325 24H12.82v-9.294H9.692V11.01h3.128V8.41c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.4 24 24 23.4 24 22.663V1.337C24 .6 23.4 0 22.675 0z" />
                      )}
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Map container */}
          <div className="flex-1 min-w-[300px] h-[406px] rounded-xl overflow-hidden border-2 border-gray-700/50 hover:border-teal-500/50 transition-all duration-300">
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              className="z-10"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position} icon={customIcon}>
                <Popup>
                  <div className="text-gray-800">
                    <h3 className="font-semibold">My Location</h3>
                    <p className="text-justify">
                      Blk 6 Lot 21 Mt.Samat St. Grandvalley Phase 1 Subd.
                      Mahabang Parang Angono, Rizal
                    </p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Form section */}
          <div className="flex-1 min-w-[300px]">
            <form
              className="space-y-6 relative"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = {
                  name: formData.get("name"),
                  email: formData.get("email"),
                  message: formData.get("message"),
                };

                emailjs
                  .send(
                    "service_xzhyotl",
                    "template_b2f6x9h",
                    {
                      from_name: data.name,
                      from_email: data.email,
                      message: data.message,
                    },
                    "HA5ZKukGsaNR9o8Js"
                  )
                  .then(
                    (response) => {
                      toast.success("Message sent successfully!");
                      console.log("Message sent successfully:", response);
                      e.target.reset(); // Clear the form fields
                    },
                    (error) => {
                      toast.error("Error sending message.");
                      console.error("Error sending message:", error);
                    }
                  );
              }}
            >
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="peer w-full rounded-xl bg-gray-800/50 border-2 border-gray-700/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 text-gray-300 transition-all duration-300 backdrop-blur-xl pt-6 pb-2 px-4 hover:border-teal-500/50"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-teal-400"
                >
                  Name
                </label>
              </div>

              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="peer w-full rounded-xl bg-gray-800/50 border-2 border-gray-700/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 text-gray-300 transition-all duration-300 backdrop-blur-xl pt-6 pb-2 px-4 hover:border-teal-500/50"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-teal-400"
                >
                  Email
                </label>
              </div>

              <div className="relative group">
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="peer w-full rounded-xl bg-gray-800/50 border-2 border-gray-700/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 text-gray-300 transition-all duration-300 backdrop-blur-xl pt-6 pb-2 px-4 hover:border-teal-500/50 resize-none"
                  placeholder=" "
                  required
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-teal-400"
                >
                  Message
                </label>
              </div>

              <button
                type="submit"
                className="w-full relative group overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-300 transition-all duration-300 group-hover:scale-110" />
                <div className="relative bg-gradient-to-r from-teal-400 to-teal-500 text-gray-900 px-6 py-3 rounded-xl font-medium transform transition-all duration-300 group-hover:scale-[0.99] group-hover:shadow-xl group-hover:shadow-teal-500/25">
                  Send Message
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
