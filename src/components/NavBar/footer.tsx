import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Facebook } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-white border-t pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* 1. Branding Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/devcom-logo.png"
              alt="DevCom Logo"
              width={50}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
            <div>
              <h3 className="font-bold text-[#002B5B] leading-none">VSU DevCom</h3>
              <p className="text-xs text-gray-500">Department of Development Communication</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Empowering communicators for sustainable development through quality education and research.
          </p>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><Link href="/curriculum" className="hover:text-[#008ACF] transition-colors">Curriculum</Link></li>
            <li><Link href="/faculty" className="hover:text-[#008ACF] transition-colors">Faculty Directory</Link></li>
            <li><Link href="/resources" className="hover:text-[#008ACF] transition-colors">Resources & Forms</Link></li>
            <li><Link href="/news" className="hover:text-[#008ACF] transition-colors">News & Updates</Link></li>
          </ul>
        </div>

        {/* 3. Contact Us */}
        <div>
          <h4 className="font-bold text-lg mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm text-gray-600">
            <li className="flex gap-3">
              <MapPin className="w-5 h-5 text-[#008ACF] shrink-0" />
              <span>Visayas State University<br />Baybay City, Leyte 6521 Philippines</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#008ACF] shrink-0" />
              <span>(053) 565-0600</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#008ACF] shrink-0" />
              <span>devcom@vsu.edu.ph</span>
            </li>
          </ul>
        </div>

        {/* 4. Find Us (Map & Socials) */}
        <div>
          <h4 className="font-bold text-lg mb-6">Find Us</h4>
          <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-gray-400" />
            {/* Replace with an <iframe> if you have the Google Maps embed code */}
          </div>
          <div className="flex gap-3">
            <Link href="#" className="p-2 bg-[#002B5B] text-white rounded-full hover:opacity-90 transition-opacity">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2025 VSU Department of Development Communication. All rights reserved.</p>
        <Link href="/login" className="hover:underline">Faculty Login</Link>
      </div>
    </footer>
  );
}