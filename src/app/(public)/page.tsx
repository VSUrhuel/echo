"use client";

import { HeroSection } from "@/features/homepage/components";
import NewsUpdates from "@/features/homepage/components/NewsUpdates";
import AboutPrgoram from "@/features/homepage/components/AboutProgram";
import AboutProgram from "@/features/homepage/components/AboutProgram";
import CompanyLinkages from "@/features/homepage/components/CompanyLinkages";
import NotableAlumni from "@/features/homepage/components/NotableAlumni";
import RisingStars from "@/features/homepage/components/RisingStart";

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