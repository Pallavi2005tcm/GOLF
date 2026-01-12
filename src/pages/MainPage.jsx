import Sidebar from "./Sidebar";
import Home from "./Home";
import Header from "../components/Header";

export default function MainPage() {
  return (
    <div className="h-screen flex flex-col">
      {/* Header at the top */}
      <Header />

      {/* Below Header: Sidebar + Home */}
      <div className="flex flex-1 mt-0">
        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Right Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Home />
        </div>
      </div>
    </div>
  );
}
