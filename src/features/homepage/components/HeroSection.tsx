import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
      
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
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        
        {/* White Fade Bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-background to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-fade-in-up">
          
          {/* Tagline */}
          <span className="inline-block bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
            BS Development Communication
          </span>

          {/* Main Title */}
          <h1 className="font-nunito text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Communicate for Change. <br /> 
            <span className="text-yellow-400">Develop for Impact.</span>
          </h1>

          {/* Subtitle */}
          <p className="font-nunito-sans text-lg sm:text-xl text-gray-100 leading-relaxed max-w-2xl mb-8 font-medium">
            This is just a demo to use the login button. The content here is the 
            landing page or Home for the DevCom community.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-[#008ACF] hover:bg-[#0f73a5] text-white font-nunito-sans text-lg font-semibold px-10 py-6 rounded-xl transition-all shadow-lg"
            >
              <Link href="/login">Login to Portal</Link>
            </Button>
            
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10 px-10 py-6 rounded-xl text-lg"
            >
              Explore Curriculum
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}