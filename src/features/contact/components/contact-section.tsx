"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Facebook, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    content: [
      "Department of Development Communication",
      "College of Arts and Sciences",
      "Visayas State University",
      "Baybay City, Leyte 6521, Philippines",
    ],
  },
  {
    icon: Phone,
    title: "Phone",
    content: ["(053) 565-0600 local 1234"],
  },
  {
    icon: Mail,
    title: "Email",
    content: ["devcom@vsu.edu.ph"],
    isLink: true,
  },
  {
    icon: Clock,
    title: "Office Hours",
    content: ["Monday - Friday: 8:00 AM - 5:00 PM", "Saturday - Sunday: Closed"],
  },
]

const subjects = [
  "General Inquiry",
  "Admission Information",
  "Program Details",
  "Thesis Consultation",
  "Partnership Opportunities",
  "Other",
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#004494] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium">
              <Mail className="h-4 w-4" />
              Get in Touch
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">
            Have questions about our program? Want to learn more about DevCom? We would love to hear from you. Reach out
            to us through any of the channels below.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left Column - Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="rounded-lg border border-gray-200 bg-white p-5 border-l-4 border-l-[#F4B400]"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                        <info.icon className="h-5 w-5 text-[#004494]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{info.title}</h3>
                        <div className="mt-1 space-y-0.5">
                          {info.content.map((line, index) => (
                            <p
                              key={index}
                              className={`text-sm ${
                                info.isLink ? "text-[#004494] hover:underline cursor-pointer" : "text-gray-600"
                              }`}
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Follow Us */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Follow Us</h3>
                <Button className="bg-[#004494] hover:bg-[#003670] text-white" asChild>
                  <a href="https://facebook.com/vsudevcom" target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4 mr-2" />
                    VSU DevCom on Facebook
                  </a>
                </Button>
              </div>

              {/* Location Map */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
                <div className="rounded-lg border border-gray-200 bg-gray-100 h-64 flex flex-col items-center justify-center">
                  <MapPin className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Google Maps Embed</p>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">First Name</label>
                      <Input
                        placeholder="Juan"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="border-gray-300 focus:border-[#004494] focus:ring-[#004494]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">Last Name</label>
                      <Input
                        placeholder="Dela Cruz"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="border-gray-300 focus:border-[#004494] focus:ring-[#004494]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Email Address</label>
                    <Input
                      type="email"
                      placeholder="juan.delacruz@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border-gray-300 focus:border-[#004494] focus:ring-[#004494]"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Subject</label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-[#004494] focus:ring-[#004494]">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Message</label>
                    <Textarea
                      placeholder="Write your message here..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="border-gray-300 focus:border-[#004494] focus:ring-[#004494] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full bg-[#004494] hover:bg-[#003670] text-white">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
