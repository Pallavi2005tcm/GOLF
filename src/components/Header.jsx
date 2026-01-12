import { Link } from "react-router-dom";
import { RiHome6Line, RiLogoutBoxRLine, RiTeamLine } from "react-icons/ri";

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

export default function Header() {
  return (<header className="w-full bg-[#30465c]  py-4 flex justify-between items-center shadow-lg border-b border-blue-300">
  {/* Left - Logo/Title */}
  <div className="ml-8 flex flex-col">
    <div className="text-4xl font-bold text-white tracking-wide">
      JeevanSetu
    </div>
    <div className="text-m text-blue-100  mt-1">
      Your Bridge to Safety
    </div>
  </div>
    

  {/* Right - Navigation buttons */}
  <div className="flex items-center gap-4 mr-8">
    <Link
      to="/"
      className="px-4 py-2.5 text-white font-medium rounded-md transition-all duration-200 hover:bg-blue-500/30 hover:shadow-md flex items-center"
    >
      <RiHome6Line className="h-5 w-5 mr-2" />
      Home
    </Link>
    
    <Link
      to="/Us"
      className="px-4 py-2.5 text-white font-medium rounded-md transition-all duration-200 hover:bg-blue-500/30 hover:shadow-md flex items-center"
    >
      <RiTeamLine className="h-5 w-5 mr-2" />
      About Us
    </Link>
    
    <button 
      onClick={logout}
      className="px-4 py-2.5 bg-gradient-to-r from-[#ea4335] to-[#d93025] text-white font-medium rounded-md hover:from-[#f04438] hover:to-[#e03b2f] transition-all duration-200 shadow-sm hover:shadow-md flex items-center"
    >
      <RiLogoutBoxRLine className="h-5 w-5 mr-2" />
      Logout
    </button>
  </div>
</header>
  );
}