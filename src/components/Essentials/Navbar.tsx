"use client";
import { NotificationBell } from "@/components/Essentials/NotificationBell";
import { NotificationDropdown } from "@/components/Essentials/NotificationDropdown";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (pathname == "/login" || pathname == "/signup") {
    return null;
  }

  return (
    <div className="bg-[#362e7b] text-white py-1.5 flex items-center justify-between border-b border-gray-800 w-full h-16 flex-shrink-0 fixed top-0 right-0 z-50">
      <h1 className="text-xl font-semibold ml-6">LeetTrack</h1>
      <div className="flex items-center gap-4 mr-6">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Notifications"
          >
            <NotificationBell />
          </button>
          {dropdownOpen && (
            <NotificationDropdown
              open={dropdownOpen}
              onClose={() => setDropdownOpen(false)}
            />
          )}
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
