import React, { useState } from "react";
import search_icon_one from "../../assets/search_one.svg";
import bell_icon from "../../assets/bell_icon.svg";
import like_icon from "../../assets/love.svg";
import command_icon from "../../assets/command.svg";
import down_arrow from "../../assets/angle-small-down.svg";


const Navbar = ({ isOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div
      className={`font-aptos px-6 sm:px-8 shadow-none w-full max-w-screen-xl h-[92px] flex items-center justify-between py-3 sm:py-5 transition-all duration-300`}
    >
      {/* Left Section */}
      <div className="flex items-center">
        <h1 className="font-semibold text-xl sm:text-base text-gray-800">
          AI/ML Model Builder
        </h1>
      </div>

      {/* Center Section */}
      <div className="hidden sm:flex items-center bg-custom_white px-4 py-2 h-[40px] rounded-lg w-1/4 min-w-[150px]">
        <img src={search_icon_one} alt="search_icon_one" className="text-gray-600 pr-2 text-xl sm:text-2xl" />
        <input
          type="text"
          placeholder="Search"
          className="bg-custom_white text-custom_slate text-sm placeholder:custom_violet text-gray-600 w-full border-none outline-none focus:outline-none"
        />
        <img src={command_icon} alt="command_icon" className="text-xl sm:text-2xl" />
        <span className="text-xs sm:text-sm text-gray-500 px-2 py-1">K</span>
      </div>

      {/* Right Section */}
      <div className={`flex items-center gap-x-3 ${isOpen ? "lg:mr-12" : "lg:mr-0"}`}>
        {/* Notifications */}
        <div className="relative sm:hidden lg:flex md:flex">
          <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-200">
            <img src={bell_icon} alt="bell_icon" className="text-gray-700 text-lg sm:text-xl" />
          </button>
          <span className="absolute top-0 right-0 flex items-center justify-center text-[8px] sm:text-[10px] h-3 w-3 bg-yellow-500 rounded-full text-gray-800">
            2
          </span>
        </div>

        {/* Favorites */}
        <button className="p-2 sm:hidden lg:flex md:flex border border-gray-200 rounded-full hover:bg-gray-200">
          <img src={like_icon} alt="like_icon" className="text-gray-700 text-lg sm:text-xl" />
        </button>

        {/* Profile */}
        <div className="relative border-l sm:mr-16 pl-2 flex items-center space-x-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full"></div>
          <div className="hidden sm:block">
            <p className="text-xs sm:text-sm font-medium text-gray-800">
              Neurotic Spy
            </p>
            <p className="text-xs text-gray-500">neurotic@taildo.com</p>
          </div>
          <button onClick={toggleProfileMenu} className="text-gray-500 hover:text-gray-700">
            <img src={down_arrow} alt="down_arrow" className="text-lg sm:text-xl" />
          </button>
        </div>
      </div>
    </div>

  );
};

export default Navbar;