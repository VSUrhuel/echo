"use client";

import { HeroSection } from "@/features/auth/components/homepage";
import NewsUpdates from "@/features/auth/components/homepage/NewsUpdates";
import AboutPrgoram from "@/features/auth/components/homepage/AboutProgram";
import AboutProgram from "@/features/auth/components/homepage/AboutProgram";
import CompanyLinkages from "@/features/auth/components/homepage/CompanyLinkages";
import NotableAlumni from "@/features/auth/components/homepage/NotableAlumni";
import RisingStars from "@/features/auth/components/homepage/RisingStart";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <HeroSection />
      <NewsUpdates />
      <AboutProgram />
      <CompanyLinkages />
      <NotableAlumni />
      <RisingStars />
    </div>
  );
}