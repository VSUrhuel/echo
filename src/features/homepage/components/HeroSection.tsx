"use client";

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Fade from "embla-carousel-fade"

const heroImages = [
  "/images/hero-slider/hero-image-1.webp", 
  "/images/hero-slider/hero-image-2.webp",
  "/images/hero-slider/hero-image-3.webp",
  "/images/hero-slider/hero-image-4.webp",
  "/images/hero-slider/hero-image-5.webp",
]

export function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  const fadePlugin = React.useRef(
    Fade()
  )

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      
      {/* Background Carousel Layer */}
      <div className="absolute inset-0 z-0">
        <Carousel
          plugins={[plugin.current, fadePlugin.current]}
          opts={{
            loop: true,
          }}
          className="w-full h-full"
        >
          <CarouselContent className="h-full ml-0">
            {heroImages.map((src, index) => (
              <CarouselItem key={index} className="pl-0 h-full w-full relative">
                <Image
                  src={src}
                  alt={`VSU DevCom Highlight ${index + 1}`}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Overlay Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-[#16517a]/100 via-[#16517a]/70 via-50% to-[#29658f]/30"
      />

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-fade-in-up mb-6 sm:mb-16">
          
          <span className="inline-block bg-yellow-500/20 text-[#ffdc15] px-3 py-1 rounded-full rounded-bl-none text-sm font-bold mb-4 backdrop-blur-sm">
            Development Communication
          </span>

          <h1 className="font-nunito text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
            Communicate for Change. <br /> 
            <span className="text-[#f5ef17]">Develop for Impact.</span>
          </h1>

          <p className="font-nunito-sans text-base sm:text-xl text-gray-100 leading-relaxed max-w-2xl mb-8 font-normal">
            The Development Communication program at VSU prepares students to 
            become strategic communicators who drive sustainable development 
            and social change in communities.
          </p>

          <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:w-auto sm:gap-4">
            <Button
              asChild
              className="w-full sm:w-auto bg-[#207bbe] hover:bg-[#3088c6] text-white font-nunito-sans text-sm sm:text-lg font-normal px-4 py-3 sm:px-10 sm:py-6 rounded-lg transition-all shadow-lg"
            >
              <Link href="/academics" className="flex items-center justify-center">
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