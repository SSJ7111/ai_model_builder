import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import DataGridComponent from "./components/datagrid/DataGridComponent";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex bg-custom_white_light min-h-screen relative">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0`}
      >
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10 transition-all duration-300">
        {/* Navbar */}
        <div
          className={`fixed top-0 left-0 w-full z-40 bg-white shadow-md transition-all duration-300 ${
            isOpen ? "sm:ml-64" : "sm:ml-20"
          }`}
        >
          <Navbar isOpen={isOpen} />
        </div>

        {/* Page Content */}
        <div
          className={`pt-16 mt-12 transition-all duration-300 p-6 ${
            isOpen ? "sm:ml-64" : "sm:ml-24"
          }`}
        >
          <DataGridComponent />
        </div>
      </div>
    </div>
  );
};

export default App;
