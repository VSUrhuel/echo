import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/DevcomHeroSample2.png"
          alt="Students collaborating and studying together"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#207bbe]/40 dark:bg-black/60" />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white dark:from-background to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-fade-in-up mb-6 sm:mb-16">
          
          {/* Tagline */}
          <span className="inline-block bg-yellow-500/20 text-[#ffdc15] px-3 py-1 rounded-full rounded-bl-none text-sm font-bold mb-4 backdrop-blur-sm">
            BS Development Communication
          </span>

          {/* Main Title */}
          <h1 className="font-nunito text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
            Communicate for Change. <br /> 
            <span className="text-[#f5ef17]">Develop for Impact.</span>
          </h1>

          {/* Subtitle */}
          <p className="font-nunito-sans text-base sm:text-xl text-gray-100 leading-relaxed max-w-2xl mb-8 font-normal">
            The Development Communication program at VSU prepares students to 
            become strategic communicators who drive sustainable development 
            and social change in communities.
          </p>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:w-auto sm:gap-4">
            <Button
              asChild
              className="w-full sm:w-auto bg-[#207bbe] hover:bg-[#3088c6] text-white font-nunito-sans text-sm sm:text-lg font-normal px-4 py-3 sm:px-10 sm:py-6 rounded-lg transition-all shadow-lg"
            >
              <Link href="/login" className="flex items-center justify-center">
                 Explore Curriculum
              </Link>
            </Button>
            
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-transparent border-gray-300 text-white hover:bg-white/10 hover:text-white px-4 py-3 sm:px-10 sm:py-6 rounded-lg text-sm sm:text-lg font-normal cursor-pointer"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}