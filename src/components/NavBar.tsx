"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
const NavBar = () => {
     const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Insurance", path: "/insurance" }, 
    { name: "Contact", path: "/contact" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false); 
  };
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="
        relative flex items-center justify-between 
        w-full md:w-[90%] 
        bg-[#0B1221]/95 backdrop-blur-md 
        border-[2px] border-[#22BBF9] 
        rounded-full 
        px-6 py-3 md:px-8 md:py-3
        shadow-lg shadow-cyan-900/20
      ">
        
        {/* Logo Section */}
        <div 
          className="cursor-pointer text-xl md:text-[20px] font-bold tracking-wide"
          onClick={() => router.push('/')}
        >
          <span className="text-white">Stellar</span>
          <span className="text-[#22BBF9]">Insured</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`
                  text-[16px] font-medium transition-colors duration-300 cursor-pointer hover:text-[#00B4D8]
                  ${isActive ? "text-[#22BBF9]" : "text-white"}
                `}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Right Side: Sign In + Mobile Toggle */}
        <div className="flex items-center gap-4">
          
          {/* Sign In Button */}
          <button
            onClick={() => router.push('/signin')}
            className="
              hidden md:block bg-[#22BBF9] text-[#080D24] px-4 py-1 cursor-pointer rounded-full text-sm font-bold hover:bg-[#0090ad] hover:scale-105 transition-all duration-300
            "
          >
            Sign In
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white hover:text-[#00B4D8]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 px-4 md:hidden">
            <div className="bg-[#0B1221] border border-[#00B4D8]/50 rounded-2xl p-6 shadow-xl flex flex-col gap-4 items-center">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full text-center py-2 text-lg font-medium
                    ${pathname === item.path ? "text-[#00B4D8]" : "text-gray-300"}
                  `}
                >
                  {item.name}
                </button>
              ))}
              <hr className="w-full border-gray-700 my-2" />
              <button
                onClick={() => handleNavigation('/signin')}
                className="w-full bg-[#00B4D8] text-[#0B1221] py-3 rounded-xl font-bold"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>

  )
}

export default NavBar
