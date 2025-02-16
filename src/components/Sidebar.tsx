"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaList } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
    className={`h-screen sidebar-gradient from-[#2e1065] to-[#6a0572] text-white ${
      isOpen ? "w-64" : "w-20"
    } transition-all duration-300 fixed left-0 top-0 shadow-lg flex flex-col opacity-95`}
  >
  
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
  <img 
    src="/images/Yamm-Logo.png" 
    alt="Yamm Logo" 
    className={`h-12 w-auto transition-all duration-300 ${isOpen ? "block" : "hidden"}`} 
  />
  <button 
    onClick={() => setIsOpen(!isOpen)} 
    className="focus:outline-none p-2 rounded-md hover:bg-violet-900 transition-all"
  >
    {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
  </button>
</div>



      <nav className="mt-4 flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className="flex items-center p-4 hover:bg-violet-900 transition-all duration-200"
              data-tooltip-id="dashboard-tooltip"
              data-tooltip-content="Dashboard"
            >
              <FaHome size={20} />
              <span className={`ml-3 text-lg transition-all duration-200 ${isOpen ? "block" : "hidden"}`}>
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/orders"
              className="flex items-center p-4 hover:bg-violet-900 transition-all duration-200"
              data-tooltip-id="orders-tooltip"
              data-tooltip-content="Orders"
            >
              <FaList size={20} />
              <span className={`ml-3 text-lg transition-all duration-200 ${isOpen ? "block" : "hidden"}`}>
                Orders
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {!isOpen && (
        <>
          <Tooltip id="dashboard-tooltip" place="right"  />
          <Tooltip id="orders-tooltip" place="right" />
        </>
      )}
    </div>
  );
};

export default Sidebar;
