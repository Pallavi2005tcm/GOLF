// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "../axios"; // tumhari axios instance

// const Login = () => {
//     const [error, setError] = useState("");
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");
//   const [isSuccess, setIsSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // backend API call
//       const res = await axios.post("/api/auth/login", formData);

//       // token + user save
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.reply));
//       localStorage.setItem("loginTime", Date.now());

//       setMessage("Logged in successfully!");
//       setIsSuccess(true);

//       // navigate after 1 sec
//       setTimeout(() => {
//         navigate("/");
//       }, 1000);
//     } catch (err) {
//         setError("Invalid email or password");
//       }
//     };
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4 font-sans">
//       <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl max-w-lg w-full transition-all duration-500 hover:shadow-2xl border border-gray-200">
//         <div className="flex flex-col items-center">
//           <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
//            Welcome Back
//           </h1>
//           <p className="text-gray-500 text-center mb-8">
//             Log in to your account.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label
//               htmlFor="email"
//               className="text-sm font-medium text-gray-700 block mb-1"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="you@example.com"
//               required
//               className="w-full px-4 py-2 bg-gray-50 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out text-gray-900"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="text-sm font-medium text-gray-700 block mb-1"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               required
//               className="w-full px-4 py-2 bg-gray-50 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out text-gray-900"
//             />
//           </div>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           <button
//             type="submit"
//             className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-lg text-white font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-100"
//           >
//             Log In
//           </button>

//         </form>

      

//         <p className="mt-6 text-center text-gray-500 text-sm">
//           Don’t have an account?{" "}
//           <Link to="/auth" className="text-blue-500 hover:underline font-medium">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";

const Login = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.reply));
      localStorage.setItem("loginTime", Date.now());

      setMessage("Logged in successfully!");
      setIsSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let ripples = [];
    let mouseX = 0;
    let mouseY = 0;
    let mouseMoved = false;
    
    // Set canvas size to match container
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Rain particles for background drizzle
    const createRainParticles = () => {
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 3 + 3,
          color: `rgba(150, 200, 240, ${Math.random() * 0.4 + 0.2})`,
          type: 'rain'
        });
      }
    };
    
    // Initial rain particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 3 + 3,
        color: `rgba(150, 200, 240, ${Math.random() * 0.4 + 0.2})`,
        type: 'rain'
      });
    }
    
    // Handle mouse movement
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseMoved = true;
      
      // Create water particles at mouse position
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: mouseX,
          y: mouseY,
          size: Math.random() * 4 + 2,
          speedX: Math.random() * 4 - 2,
          speedY: Math.random() * 3 + 2,
          color: `rgba(130, 180, 240, ${Math.random() * 0.5 + 0.3})`,
          type: 'splash'
        });
      }
      
      // Create ripples occasionally
      if (Math.random() > 0.7) {
        ripples.push({
          x: mouseX,
          y: mouseY,
          radius: 5,
          maxRadius: Math.random() * 30 + 20,
          speed: Math.random() * 0.5 + 0.3,
          alpha: 0.7
        });
      }
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    // Create rain continuously
    const rainInterval = setInterval(createRainParticles, 300);
    
    // Draw water surface with waves
    const drawWaterSurface = (time) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.7);
      
      for (let x = 0; x < canvas.width; x += 10) {
        const y = canvas.height * 0.7 + Math.sin(x * 0.01 + time * 0.001) * 5;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, canvas.height * 0.7, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(120, 170, 230, 0.6)');
      gradient.addColorStop(1, 'rgba(90, 150, 220, 0.8)');
      ctx.fillStyle = gradient;
      ctx.fill();
    };
    
    // Draw underwater elements
    const drawUnderwater = () => {
      // Draw sand bottom
      ctx.fillStyle = 'rgba(240, 230, 180, 0.3)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.lineTo(x, canvas.height - Math.sin(x * 0.02) * 10 - 20);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();
      
      // Draw some underwater plants
      ctx.fillStyle = 'rgba(80, 140, 220, 0.4)';
      for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 6) * (i + 1);
        ctx.beginPath();
        ctx.moveTo(x, canvas.height);
        ctx.quadraticCurveTo(x + 20, canvas.height - 80, x, canvas.height - 100);
        ctx.quadraticCurveTo(x - 20, canvas.height - 80, x, canvas.height);
        ctx.fill();
      }
    };
    
    // Animation loop
    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradient (water depth effect)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#e0f0ff');
      gradient.addColorStop(0.5, '#c5e1ff');
      gradient.addColorStop(1, '#a0c8ff');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw underwater elements
      drawUnderwater();
      
      // Draw water surface with animation
      drawWaterSurface(time);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.type === 'splash') {
          p.size -= 0.07;
        }
        
        // Draw particle with different styles based on type
        ctx.beginPath();
        
        if (p.type === 'rain') {
          // Draw rain drops as lines
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.speedX * 0.5, p.y - p.speedY * 0.5);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size / 2;
          ctx.stroke();
        } else {
          // Draw splash particles as circles
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
        
        // Remove particles that are too small or off-screen
        if (p.size <= 0.2 || p.y > canvas.height || p.x < 0 || p.x > canvas.width) {
          // Create ripple when rain hits water surface
          if (p.type === 'rain' && p.y > canvas.height * 0.7) {
            ripples.push({
              x: p.x,
              y: canvas.height * 0.7,
              radius: 2,
              maxRadius: Math.random() * 10 + 5,
              speed: Math.random() * 0.3 + 0.2,
              alpha: 0.6
            });
          }
          
          particles.splice(i, 1);
          i--;
        }
      }
      
      // Update and draw ripples
      for (let i = 0; i < ripples.length; i++) {
        const r = ripples[i];
        
        r.radius += r.speed;
        r.alpha -= 0.02;
        
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(130, 180, 240, ${r.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Remove ripples that fade out
        if (r.alpha <= 0 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
          i--;
        }
      }
      
      // Add continuous rain particles
      if (particles.length < 300 && Math.random() > 0.7) {
        createRainParticles();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate(0);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      clearInterval(rainInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden bg-blue-50"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      
      <div className="relative z-10 bg-white/90 p-8 md:p-12 rounded-2xl shadow-2xl max-w-lg w-full transition-all duration-500 hover:shadow-2xl border border-blue-100 backdrop-blur-md">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-black-700">
            Welcome Back
          </h1>
          
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="email"
              className="text-sm font-medium text-black-800 block mb-1"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-400 focus:border-transparent transition duration-300 ease-in-out text-gray-900 pl-10"
              />
              <svg className="w-5 h-5 text-black-400 absolute left-3 top-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="text-sm font-medium text-black-800 block mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-400 focus:border-transparent transition duration-300 ease-in-out text-gray-900 pl-10"
              />
              <svg className="w-5 h-5 text-black-400 absolute left-3 top-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {error}
            </div>
          )}
          
          {isSuccess && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm flex items-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22,4 12,14.01 9,11.01"></polyline>
              </svg>
              {message}
            </div>
          )}

           <button
  type="submit"
  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-lg text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-100 flex items-center justify-center"
>
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a极 2 0 0 1-2 2h-4"></path>
    <polyline points="10,17 15,12 10,7"></polyline>
    <line x1="15" y1="12" x2="3" y2="12"></line>
  </svg>
  Log In
</button>
        </form>

        <p className="mt-6 text-center text-black-600 text-sm">
          Don't have an account?{" "}
          <Link to="/auth" className="text-blue-700 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
