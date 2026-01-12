import React from "react";

const Footer = () => {
  return (
    <footer className="mt-8 px-6 py-5 bg-blue-300 rounded-t-xl shadow-inner">
      <div className="text-center space-y-2">
        <p className="text-sm text-black">
          Data sourced from{" "}
          <span className="font-semibold text-black transition-colors duration-200 cursor-pointer">
            NASA satellite imagery
          </span>{" "}
          •{" "}
          <span className="font-semibold text-black transition-colors duration-200 cursor-pointer">
            MMMUT Gorakhpur Flood Monitoring System
          </span>
        </p>
        <p className="text-xs text-black">
          This is a <span className="italic text-black">demonstration interface</span>. In a real implementation, data would come from NASA APIs.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
