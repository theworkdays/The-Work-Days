"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ active, onClick, children, className }: NavLinkProps) => {
  return (
    <button
      className={cn(
        "text-gray-300 hover:text-gray-100 transition-colors duration-200",
        active ? "text-blue-500 font-medium" : "",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { id: "home", label: "Home", link: "#home" },
    { id: "services", label: "Services", link: "#services" },
    { id: "how", label: "How It Works", link: "#how" },
    { id: "testimonials", label: "Testimonials", link: "#testimonials" },
    { id: "about", label: "About Us", link: "#about" },
    { id: "contact", label: "Contact", link: "#contact" },
    { id: "faq", label: "FAQ", link: "#faq" },
    { id: "affiliate", label: "Affiliate Program", link: "#affiliate" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-zinc-950/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        {/* Logo (Left Aligned) */}
        <Link href="/" className="text-2xl font-bold">
          <span className="text-blue-500">The</span>
          <span className="text-orange-500">Workdays</span>
        </Link>

        {/* Nav Items & Buttons (Right Aligned) */}
        <div className="ml-auto flex items-center gap-8">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                active={activeTab === item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  router.push(item.link);
                }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Get Started Button */}
          <Link href={"/auth"}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200">
              Get Started
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-300 hover:text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 py-4 border-t border-gray-800 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                active={activeTab === item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  router.push(item.link);
                  setIsMenuOpen(false);
                }}
                className="text-lg py-2"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
