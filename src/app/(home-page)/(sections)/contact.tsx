import { Facebook, Instagram, Linkedin, Mail, MapPin,Phone, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8" id="contact">
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl w-full">
        {/* Contact Form */}
        <div className="bg-zinc-950 p-6 md:p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="firstName" className="text-white mb-2">
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="Your first name"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-white mb-2">
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Your last name"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="email" className="text-white mb-2">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="subject" className="text-white mb-2">
              Subject
            </Label>
            <Select>
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="General Inquiry" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="support">Technical Support</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-6">
            <Label htmlFor="message" className="text-white mb-2">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Please describe how we can help you..."
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 min-h-[150px]"
            />
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <Checkbox id="privacy" />
            <Label htmlFor="privacy" className="text-white text-sm">
              I agree to the{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>{" "}
              and consent to being contacted.
            </Label>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Send Message</Button>
        </div>

        {/* Contact Information */}
        <div className="bg-zinc-800 p-6 md:p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-blue-600 p-3 rounded-lg mr-4">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Email Us</h3>
                <p className="text-zinc-400">support@theworkdays.com</p>
                <p className="text-zinc-400">info@theworkdays.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-600 p-3 rounded-lg mr-4">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Call Us</h3>
                <p className="text-zinc-400">+1 (800) 123-4567</p>
                <p className="text-zinc-400">Monday-Friday, 9AM-6PM EST</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-600 p-3 rounded-lg mr-4">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Location</h3>
                <p className="text-zinc-400">123 Tech Avenue</p>
                <p className="text-zinc-400">San Francisco, CA 94107</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-white font-medium mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}