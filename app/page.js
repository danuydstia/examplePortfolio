// Portfolio Component
'use client';
import { useEffect, useState } from 'react';

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen font-sans">
      
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF9F0] to-[#FFF5E8]">
        
        {/* Circle Orange - Top Left with parallax */}
        <div 
          className="w-[600px] h-[600px] -left-32 -top-40 absolute rounded-full border-[70px] border-amber-500 opacity-90 blur-[0.5px]"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        
        {/* Circle Blue - Bottom Right with parallax */}
        <div 
          className="w-[550px] h-[550px] -right-40 -bottom-40 absolute rounded-full border-[85px] border-teal-300 opacity-90 blur-[0.5px]"
          style={{ transform: `translateY(${scrollY * -0.2}px)` }}
        />
        
        {/* Subtle accent shapes with parallax */}
        <div 
          className="w-96 h-96 -right-20 top-20 absolute rounded-full bg-amber-400/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div 
          className="w-80 h-80 left-40 bottom-40 absolute rounded-full bg-teal-300/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.25}px)` }}
        />
        
        {/* Navigation Bar with glassmorphism effect */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-amber-500/95 backdrop-blur-sm rounded-full px-14 py-5 shadow-2xl border border-amber-600/20">
            <nav className="flex items-center gap-14">
              <a href="#home" className="relative text-black text-xl font-semibold hover:text-white transition-all duration-300 group">
                Home
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-black rounded-full group-hover:bg-white transition-all" />
              </a>
              <a href="#skill" className="text-black text-xl font-semibold hover:text-white transition-all duration-300">
                Skill
              </a>
              <a href="#experience" className="text-black text-xl font-semibold hover:text-white transition-all duration-300">
                Experience
              </a>
              <a href="#contact" className="text-black text-xl font-semibold hover:text-white transition-all duration-300">
                Contact
              </a>
            </nav>
          </div>
        </div>
        
        {/* Content Container with parallax */}
        <div className="relative z-10 flex items-center min-h-screen px-8 md:px-16 lg:px-24">
          
          {/* Hero Content */}
          <div 
            className="max-w-3xl"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div 
              className="mb-4 inline-block px-4 py-2 bg-amber-500/20 rounded-full"
              style={{ transform: `translateX(${scrollY * -0.05}px)` }}
            >
              <span className="text-sm font-semibold text-amber-900">Software Engineer</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-extrabold text-black leading-[0.9] mb-8 tracking-tight">
              I'm Danu
            </h1>
            
            <p 
              className="text-xl md:text-3xl text-black/80 font-medium leading-relaxed mb-10 max-w-2xl"
              style={{ transform: `translateX(${scrollY * 0.05}px)` }}
            >
              A passionate software engineer focused on building scalable applications and exploring the latest technologies.
            </p>

            {/* Social Icons with enhanced styling */}
            <div 
              className="flex items-center gap-5"
              style={{ transform: `translateY(${scrollY * 0.08}px)` }}
            >
              {/* GitHub */}
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border-2 border-black/80 rounded-lg hover:bg-black hover:scale-110 hover:shadow-xl transition-all duration-300 group"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6 fill-black group-hover:fill-white transition-all" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border-2 border-black/80 rounded-lg hover:bg-black hover:scale-110 hover:shadow-xl transition-all duration-300 group"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6 fill-black group-hover:fill-white transition-all" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-black rounded-lg hover:bg-gray-900 hover:scale-110 hover:shadow-xl transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
          
        </div>

        {/* Scroll indicator - animated */}
        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10"
          style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-black/60 font-medium">Scroll</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 4L12 20M12 20L6 14M12 20L18 14" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div id="skill" className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20 overflow-hidden">
        {/* Decorative circles with parallax */}
        <div 
          className="w-80 h-80 -left-32 -top-32 absolute rounded-full border-[50px] border-blue-400/30 blur-sm"
          style={{ transform: `translateY(${(scrollY - 800) * 0.15}px)` }}
        />
        <div 
          className="w-64 h-64 -right-20 -bottom-20 absolute rounded-full bg-blue-400/20 blur-2xl"
          style={{ transform: `translateY(${(scrollY - 800) * -0.1}px)` }}
        />
        <div 
          className="w-96 h-96 left-1/2 top-1/2 absolute rounded-full bg-blue-500/10 blur-3xl"
          style={{ transform: `translate(-50%, -50%) scale(${1 + (scrollY - 800) * 0.0003})` }}
        />
        
        <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <div 
            className="text-center mb-16"
            style={{ 
              transform: `translateY(${Math.max(0, (1000 - scrollY) * 0.3)}px)`,
              opacity: Math.min(1, (scrollY - 400) / 300)
            }}
          >
            <div className="inline-block mb-4">
              <span className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-semibold border border-white/20">
                Technical Arsenal
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              Background Skill &<br />Accomplishment
            </h2>
            <p className="text-white text-xl mb-3 font-medium">
              Continuously learning and improving in front-end development.
            </p>
            <p className="text-white/90 text-lg max-w-4xl mx-auto">
              I use HTML5, CSS3, React.js, and Tailwind CSS to build modern, interactive, and efficient web applications.
            </p>
          </div>

          {/* Skills Grid with Navigation */}
          <div 
            className="relative flex items-center justify-center gap-8"
            style={{ 
              transform: `translateY(${Math.max(0, (1100 - scrollY) * 0.2)}px)`,
              opacity: Math.min(1, (scrollY - 500) / 300)
            }}
          >
            {/* Left Arrow */}
            <button 
              className="w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 border border-white/20 group"
              aria-label="Previous skills"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="white" className="group-hover:stroke-blue-600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Skills Cards */}
            <div className="flex gap-8">
              {/* HTML5 */}
              <div 
                className="w-40 h-40 bg-white rounded-3xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
                style={{ transform: `translateY(${Math.sin((scrollY - 600) * 0.01) * 10}px)` }}
              >
                <svg className="w-24 h-24" viewBox="0 0 452 520" fill="none">
                  <path d="M41 460L0 0h451l-41 460-185 52" fill="#E34F26"/>
                  <path d="M226 472l149-41 35-394H226" fill="#EF652A"/>
                  <path d="M226 208h-75l-5-58h80V94H70l15 171h141zm0 147l-64-17-4-45h-56l7 89 117 32z" fill="#EBEBEB"/>
                  <path d="M226 265h69l-7 73-62 17v59l115-32 16-174H226zm0-171v56h136l5-56z" fill="#FFF"/>
                </svg>
              </div>

              {/* CSS3 */}
              <div 
                className="w-40 h-40 bg-white rounded-3xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
                style={{ transform: `translateY(${Math.sin((scrollY - 550) * 0.01) * 10}px)` }}
              >
                <svg className="w-24 h-24" viewBox="0 0 452 520" fill="none">
                  <path d="M41 460L0 0h451l-41 460-185 52" fill="#264DE4"/>
                  <path d="M226 472l149-41 35-394H226" fill="#2965F1"/>
                  <path d="M226 208H94l5 57h127zm0 147l-64-17-4-45h-56l7 89 117 32z" fill="#EBEBEB"/>
                  <path d="M226 265h69l-7 73-62 17v59l115-32 16-174H226zm0-171v56h136l5-56z" fill="#FFF"/>
                </svg>
              </div>

              {/* React */}
              <div 
                className="w-40 h-40 bg-white rounded-3xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
                style={{ transform: `translateY(${Math.sin((scrollY - 500) * 0.01) * 10}px)` }}
              >
                <svg className="w-24 h-24" viewBox="0 0 256 228" fill="none">
                  <path d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488 29.348-9.723 48.443-25.443 48.443-41.52 0-15.417-17.868-30.326-45.517-39.844zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345-3.24-10.257-7.612-21.163-12.963-32.432 5.106-11 9.31-21.767 12.459-31.957 2.619.758 5.16 1.557 7.61 2.4 23.69 8.156 38.14 20.213 38.14 29.504 0 9.896-15.606 22.743-40.946 31.14zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787-1.524 8.219-4.59 13.698-8.382 15.893-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246 12.376-1.098 24.068-2.894 34.671-5.345.522 2.107.986 4.173 1.386 6.193zM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994 7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94zM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863-6.35-5.437-9.555-10.836-9.555-15.216 0-9.322 13.897-21.212 37.076-29.293 2.813-.98 5.757-1.905 8.812-2.773 3.204 10.42 7.406 21.315 12.477 32.332-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789 8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18zM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152 7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793 2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433 4.902.192 9.899.29 14.978.29 5.218 0 10.376-.117 15.453-.343-4.985 6.774-10.018 12.97-15.028 18.486zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026 347.403 347.403 0 0 0 7.425-13.565zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815 329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627 310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695 358.489 358.489 0 0 1 11.036 20.54 329.472 329.472 0 0 1-11 20.722zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026-.344 1.668-.73 3.367-1.15 5.09-10.622-2.452-22.155-4.275-34.23-5.408-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3zM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86-22.86-10.235-22.86-22.86 10.235-22.86 22.86-22.86z" fill="#00D8FF"/>
                </svg>
              </div>

              {/* Tailwind */}
              <div 
                className="w-40 h-40 bg-white rounded-3xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
                style={{ transform: `translateY(${Math.sin((scrollY - 450) * 0.01) * 10}px)` }}
              >
                <svg className="w-24 h-24" viewBox="0 0 256 154" fill="none">
                  <path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z" fill="#06B6D4"/>
                </svg>
              </div>
            </div>

            {/* Right Arrow */}
            <button 
              className="w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 border border-white/20 group"
              aria-label="Next skills"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="white" className="group-hover:stroke-blue-600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Additional Skills Info */}
          <div 
            className="mt-16 text-center"
            style={{ 
              transform: `translateY(${Math.max(0, (1200 - scrollY) * 0.15)}px)`,
              opacity: Math.min(1, (scrollY - 700) / 300)
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-extrabold text-white mb-2">4+</div>
                <div className="text-white/80 text-sm">Technologies</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-extrabold text-white mb-2">10+</div>
                <div className="text-white/80 text-sm">Projects</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-extrabold text-white mb-2">2+</div>
                <div className="text-white/80 text-sm">Years Learning</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-extrabold text-white mb-2">100%</div>
                <div className="text-white/80 text-sm">Passion</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div id="experience" className="relative bg-gradient-to-br from-[#FFF9F0] to-[#FFF5E8] py-20 overflow-hidden">
        {/* Decorative elements */}
        <div 
          className="w-96 h-96 -right-32 top-20 absolute rounded-full border-[60px] border-teal-400/30 blur-sm"
          style={{ transform: `translateY(${(scrollY - 1600) * 0.12}px)` }}
        />
        <div 
          className="w-80 h-80 -left-20 bottom-20 absolute rounded-full bg-amber-400/20 blur-3xl"
          style={{ transform: `translateY(${(scrollY - 1600) * -0.08}px)` }}
        />

        <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <div 
            className="text-center mb-16"
            style={{ 
              transform: `translateY(${Math.max(0, (1800 - scrollY) * 0.2)}px)`,
              opacity: Math.min(1, (scrollY - 1200) / 300)
            }}
          >
            <div className="inline-block mb-4">
              <span className="px-6 py-2 bg-teal-500/20 rounded-full text-teal-900 text-sm font-semibold border border-teal-500/30">
                My Journey
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold text-black mb-6 tracking-tight">
              Experience &<br />Projects
            </h2>
            <p className="text-black/70 text-xl max-w-3xl mx-auto">
              Building real-world applications and continuously expanding my skillset through hands-on projects.
            </p>
          </div>

          {/* Timeline */}
          <div 
            className="max-w-5xl mx-auto"
            style={{ 
              transform: `translateY(${Math.max(0, (1900 - scrollY) * 0.15)}px)`,
              opacity: Math.min(1, (scrollY - 1400) / 300)
            }}
          >
            {/* Experience Card 1 */}
            <div className="relative pl-8 pb-12 border-l-4 border-amber-500">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-amber-500 rounded-full border-4 border-[#FFF9F0]" />
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-2">Aplikasi Lowongan Kerja</h3>
                    <p className="text-amber-600 font-semibold">Web Application</p>
                  </div>
                  <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    On Progress
                  </span>
                </div>
                <p className="text-black/70 mb-4 leading-relaxed">
                  Sedang mengembangkan platform lowongan kerja yang memudahkan perusahaan memposting pekerjaan dan pencari kerja melamar posisi. Fitur meliputi filter pencarian, aplikasi online, dan dashboard manajemen untuk HR.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">Next.js</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-lg text-sm font-medium">React</span>
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium">Tailwind CSS</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">Database</span>
                </div>
              </div>
            </div>

            {/* Experience Card 2 */}
            <div className="relative pl-8 pb-12 border-l-4 border-amber-500">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-amber-500 rounded-full border-4 border-[#FFF9F0]" />
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-2">Web Aplikasi HR Management</h3>
                    <p className="text-amber-600 font-semibold">Company Project</p>
                  </div>
                  <span className="px-4 py-2 bg-amber-100 text-amber-900 rounded-full text-sm font-semibold">
                    2025
                  </span>
                </div>
                <p className="text-black/70 mb-4 leading-relaxed">
                  Mengembangkan sistem manajemen HR yang komprehensif untuk mengelola karyawan, absensi, cuti, dan penggajian. Aplikasi ini membantu perusahaan mengotomatisasi proses HR dan meningkatkan efisiensi operasional.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">React</span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium">TypeScript</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">RESTful API</span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-lg text-sm font-medium">Dashboard</span>
                </div>
              </div>
            </div>

            {/* Experience Card 3 */}
            <div className="relative pl-8 border-l-4 border-amber-500">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-amber-500 rounded-full border-4 border-[#FFF9F0]" />
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-2">Web Pengajuan Izin</h3>
                    <p className="text-amber-600 font-semibold">School Project</p>
                  </div>
                  <span className="px-4 py-2 bg-amber-100 text-amber-900 rounded-full text-sm font-semibold">
                    2024
                  </span>
                </div>
                <p className="text-black/70 mb-4 leading-relaxed">
                  Membangun sistem pengajuan izin digital untuk institusi pendidikan. Sistem ini memungkinkan siswa mengajukan izin secara online, guru dapat menyetujui atau menolak, dan orang tua menerima notifikasi real-time.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">HTML5</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">CSS3</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">JavaScript</span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium">PHP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 overflow-hidden">
        {/* Decorative elements */}
        <div 
          className="w-96 h-96 -left-48 top-0 absolute rounded-full bg-amber-500/10 blur-3xl"
          style={{ transform: `translateY(${(scrollY - 2400) * 0.1}px)` }}
        />
        <div 
          className="w-80 h-80 -right-40 bottom-0 absolute rounded-full bg-teal-500/10 blur-3xl"
          style={{ transform: `translateY(${(scrollY - 2400) * -0.12}px)` }}
        />

        <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <div 
            className="text-center mb-16"
            style={{ 
              transform: `translateY(${Math.max(0, (2600 - scrollY) * 0.2)}px)`,
              opacity: Math.min(1, (scrollY - 2000) / 300)
            }}
          >
            <div className="inline-block mb-4">
              <span className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-semibold border border-white/20">
                Get In Touch
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              Let's Work<br />Together
            </h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Have a project in mind or just want to chat? Feel free to reach out!
            </p>
          </div>

          <div 
            className="max-w-4xl mx-auto"
            style={{ 
              transform: `translateY(${Math.max(0, (2700 - scrollY) * 0.15)}px)`,
              opacity: Math.min(1, (scrollY - 2200) / 300)
            }}
          >
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Email Card */}
              <a 
                href="mailto:danu.ydstia@gmail.com"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email Me</h3>
                <p className="text-white/60">danu.ydstia@gmail.com</p>
              </a>

              {/* Location Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="w-14 h-14 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                <p className="text-white/60">Indonesia</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Connect With Me</h3>
              <div className="flex justify-center items-center gap-6">
                <a 
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-xl hover:bg-white hover:scale-110 transition-all duration-300 group"
                  aria-label="GitHub"
                >
                  <svg className="w-8 h-8 fill-white group-hover:fill-black transition-all" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </a>

                <a 
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-xl hover:bg-white hover:scale-110 transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <svg className="w-8 h-8 fill-white group-hover:fill-black transition-all" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                <a 
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-xl hover:bg-white hover:scale-110 transition-all duration-300 group"
                  aria-label="LinkedIn"
                >
                  <svg className="w-8 h-8 fill-white group-hover:fill-black transition-all" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div 
            className="text-center mt-16 pt-8 border-t border-white/10"
            style={{ 
              opacity: Math.min(1, (scrollY - 2400) / 300)
            }}
          >
            <p className="text-white/50 text-sm">
              © 2024 Danu. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  )
}