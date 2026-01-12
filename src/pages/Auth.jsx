// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "../axios";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     address: "",
//     phone: "",       // ✅ new field added
//     password: "",
//   });
    
//   const [message, setMessage] = useState("");
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const validatePassword = (pwd) => {
//     const upper = /[A-Z]/.test(pwd);
//     const special = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
//     const number = /[0-9]/.test(pwd);
//     const minLength = pwd.length >= 8;

//     if (!upper || !special || !number || !minLength) {
//       return "Your password must include at least one uppercase letter, one number, and one special character.";
//     }
//     return "";
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationError = validatePassword(formData.password);
//     if (validationError) {
//       setError(validationError);
//       return;
//     } else {
//       setError("");
//     }

//     try {
//       console.log("Backend Cllaed")
//       const res = await axios.post("/api/auth/register", formData);
// console.log(res.data);
// console.log(res.data.user);
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       localStorage.setItem("loginTime", Date.now());
//         console.log("Regisraion Done")
//         console.log(res.data.user.role);
//       setMessage("Account created successfully!");
//       setIsSuccess(true);

//       setTimeout(() => {
//         navigate("/");
//       }, 1000);
//     } catch (err) {
//       setMessage(err.response?.data?.msg || "Something went wrong");
//       setIsSuccess(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4 font-sans">
//       <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl max-w-lg w-full transition-all duration-500 hover:shadow-2xl border border-gray-200">
//         <div className="flex flex-col items-center">
//           <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
//             Register
//           </h1>
//           <p className="text-gray-500 text-center mb-8">
//             Fill in your details to register.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Full Name */}
//           <div>
//             <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-1">
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter Your Name"
//               required
//               className="w-full px-4 py-2 bg-gray-50 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out text-gray-900"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder=" Enter Email ex-you@example.com"
//               required
//               className="w-full px-4 py-2 bg-gray-50 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out text-gray-900"
//             />
//           </div>

//           {/* Address */}
//           <div>
//             <label htmlFor="address" className="text-sm font-medium text-gray-700 block mb-1">
//               Address
//             </label>
//             <input
//               type="text"
//               id="address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               placeholder="Enter Address ex-123,street,city"
//               required
//               className="w-full px-4 py-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out text-gray-900"
//             />
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label htmlFor="phone" className="text-sm font-medium text-gray-700 block mb-1">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="+91 9876543210"
//               pattern="[0-9]{10}"   // ✅ ensures 10 digits only
//               required
//               className="w-full px-4 py-2 bg-gray-50 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out text-gray-900"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="••••••••"
//               required
//               className="w-full px-4 py-2 bg-gray-50 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out text-gray-900"
//             />
//             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full text-lg py-3 px-4 bg-gradient-to-r from-blue-500  to-purple-500   text-white font-bold shadow-lg hover:from-blue-600 hover:to-pink-700 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-100"
//           >
//             Register
//           </button>
//         </form>

//         <p className="mt-6 text-center text-gray-500 text-sm">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-500 hover:underline font-medium">
//             Log in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;





import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });
    
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
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

  const validatePassword = (pwd) => {
    const upper = /[A-Z]/.test(pwd);
    const special = /[!@#$%^&*(),.?":{}|<>极]/.test(pwd);
    const number = /[0-9]/.test(pwd);
    const minLength = pwd.length >= 8;

    if (!upper || !special || !number || !minLength) {
      return "Your password must include at least one uppercase letter, one number, and one special character.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validatePassword(formData.password);
    if (validationError) {
      setError(validationError);
      return;
    } else {
      setError("");
    }

    try {
      console.log("Backend Called");
      const res = await axios.post("/api/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("loginTime", Date.now());
      
      setMessage("Account created successfully!");
      setIsSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Something went wrong");
      setIsSuccess(false);
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
          <h1 className="text-4xl font-bold text-center mb-2 text-black">
            Register
          </h1>
          <p className="text-black mt-2 text-lg">Fill in your details to register</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="relative">
            <label htmlFor="name" className="text-sm font-medium text-black block mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                required
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-400 focus:border-transparent transition duration-300 ease-in-out text-black pl-10"
              />
              <svg className="w-5 h-5 text-black-400 absolute left-3 top-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="text-sm font-medium text-black block mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" Enter Email ex-you@example.com"
                required
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out text-black pl-10"
              />
              <svg className="w-5 h-5 text-black-400 absolute left-3 top-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
          </div>

          {/* Address */}
          <div className="relative">
            <label htmlFor="address" className="text-sm font-medium text-black block mb-1">
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                id="address"
                name="address"
                value极={formData.address}
                onChange={handleChange}
                placeholder="Enter Address ex-123,street,city"
                required
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out text-black pl-10"
              />
              <svg className="w-5 h-5 text-black-400 absolute left-3 top-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </div>

          {/* Phone Number */}
          <div className="relative">
            <label htmlFor="phone" className="text-sm font-medium text-black block mb-1">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                pattern="[0-9]{10}"
                required
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out text-black pl-10"
              />
              {/* Fixed phone icon */}
              <svg className="w-5 h-5 text-black-400 absolute left-3 top-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="text-sm font-medium text-black block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out text-black pl-10"
              />
              {/* Fixed lock icon */}
              <svg className="w-5 h-5 text-black-400 absolute left-3 top-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          
          {message && (
            <div className={`p-3 ${isSuccess ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'} border rounded-lg text-sm flex items-center`}>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isSuccess ? (
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                ) : (
                  <circle cx="12" cy="12" r="10"></circle>
                )}
                {isSuccess ? (
                  <polyline points="22,4 12,14.01 9,11.01"></polyline>
                ) : (
                  <>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </>
                )}
              </svg>
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-lg text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-100 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-black text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

