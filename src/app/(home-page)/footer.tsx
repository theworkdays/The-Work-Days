import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import Link from "next/link"
import type React from "react"

export default function Footer() {
  return (
    <footer className="bg-[#171717] border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold">
                <span className="text-blue-500">The</span>
                <span className="text-orange-500">Workdays</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-4">
              Professional assistance for students with technical assignments and projects.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook className="h-5 w-5" />} />
              <SocialIcon icon={<Twitter className="h-5 w-5" />} />
              <SocialIcon icon={<Instagram className="h-5 w-5" />} />
              <SocialIcon icon={<Linkedin className="h-5 w-5" />} />
              <SocialIcon icon={<Github className="h-5 w-5" />} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="#services">Services</FooterLink>
              <FooterLink href="#how">How It Works</FooterLink>
              <FooterLink href="#testimonials">Testimonials</FooterLink>
              <FooterLink href="#faq">FAQ</FooterLink>
              <FooterLink href="#about">About Us</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <FooterLink href="#programming">Programming Assignments</FooterLink>
              <FooterLink href="#web">Web Development</FooterLink>
              <FooterLink href="#data">Data Analysis</FooterLink>
              <FooterLink href="#mobile">Mobile App Development</FooterLink>
              <FooterLink href="#database">Database Management</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                <span>123 Tech Street, Silicon Valley, CA 94043</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="h-5 w-5 text-blue-500" />
                <span>+1 (555) 123-4567</span>
              </li>
                <li className=" gap-3 text-gray-400" >
                  <Link href={"mailto:support@theworkdays.com"} className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                <span className="break-words text-wrap">Mail Us</span></Link>
                
                </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TheWorkdays. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

interface FooterLinkProps {
  href: string
  children: React.ReactNode
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
        {children}
      </Link>
    </li>
  )
}

interface SocialIconProps {
  icon: React.ReactNode
}

function SocialIcon({ icon }: SocialIconProps) {
  return (
    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
      {icon}
    </a>
  )
}

