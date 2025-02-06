import React from "react";
import logo from "../../assets/Aventisia V1.png";
import side_arrow from "../../assets/Side Arrow.svg";
import grid_two from "../../assets/grid 02.svg";
import grid_one from "../../assets/grid 01.svg";
import model_icon from "../../assets/layers-round.svg";
import test_icon from "../../assets/task.svg";
import setting_icon from "../../assets/setting.svg";
import support_icon from "../../assets/teacher 01.svg";


const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 bg-white text-gray-900 ${
        isOpen ? "w-64" : "w-24"
      } border-r shadow-lg transform transition-all duration-300 ease-in-out`}
    >
      {/* Logo Section */}
      <div className="flex h-[92px] bg-custom_white_light items-center justify-between px-4 py-5 border-b">
        {isOpen && (
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10" />
          </div>
        )}
        <button
          className="right-0"
          onClick={toggleSidebar}
          aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          <img src={side_arrow} alt="left_arrow"
            className={`right-0 transform ${!isOpen ? "rotate-180 ml-6" : ""}`}
          />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-6">
        {/* Section 1 */}
        <div className="px-4 font-inter py-2 text-xs font-semibold text-gray-700">
          Model Library
        </div>
        <ul className="space-y-2 font-aptos">
          <li
            className={`flex items-center px-4 mx-3 py-3 rounded-lg bg-custom_secondary text-white hover:bg-secondary-dark cursor-pointer ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <img src={grid_two} alt="grid_two" className="text-xl" />
            {isOpen && <span className="ml-3 text-base sm:text-sm">Model Library</span>}
          </li>
        </ul>

        {/* Section 2 */}
        <div className="px-4 font-inter py-2 mt-6 text-sm sm:text-xs font-semibold text-gray-700">
          Extraction Builder
        </div>
        <ul className="space-y-2 font-aptos">
          <li
            className={`flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <img src={grid_one} alt="grid_one" className="text-xl" />
            {isOpen && <span className="ml-3 text-base sm:text-sm">Label Data</span>}
          </li>
          <li
            className={`flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <img src={model_icon} alt="model_icon" className="text-xl" />
            {isOpen && <span className="ml-3 text-base sm:text-sm">Model</span>}
          </li>
          <li
            className={`flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <img src={test_icon} alt="test_icon" className="text-xl" />
            {isOpen && <span className="ml-3 text-base sm:text-sm">Test</span>}
          </li>
        </ul>

        {/* Section 3 */}
        <div className="px-4 font-inter py-2 mt-6 text-sm sm:text-xs font-semibold text-gray-700">
          Help
        </div>
        <ul className="space-y-2 font-aptos">
          <li
            className={`flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <img src={setting_icon} alt="setting_icon" className="text-xl" />
            {isOpen && <span className="ml-3 text-base sm:text-sm">Settings</span>}
          </li>
          <li
            className={`flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <img src={support_icon} alt="support_icon" className="text-xl" />
            {isOpen && <span className="ml-3 text-base sm:text-sm">Support</span>}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
