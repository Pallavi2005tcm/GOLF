import { useTheme } from "../utils/ThemeProvider";
import { FiSun, FiMoon } from "react-icons/fi";
import instance from "../axios"; 
// src/utils/auth.j

// Logout function
export const logout = async () => {
  try {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
    
    // Redirect to login page
    window.location.href = "/login";
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
<nav className={`p-4 flex justify-between items-center transition-colors duration-300
  ${theme === "light" ? "bg-blue-600 text-white" : "bg-gray-900 text-white"}`}>
      <h1 className="text-xl font-bold">🌊 GLOF Dashboard</h1>
      
      <ul className="flex gap-6 items-center">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>

        {/* Theme toggle button */}
        <li>
          
        </li>

     

      </ul>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
