import Image from "next/image"
import { cn } from "@/lib/utils" 

export const Logo = ({ className, scrolled }: { className?: string; scrolled?: boolean }) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src="/images/devcom-logo.png"
        alt="DevCom Logo"
        width={50}
        height={50}
        className="h-12 w-auto object-contain"
        priority
      />
      <div className="hidden lg:flex flex-col justify-center leading-none">
        <span className={cn(
          "font-bold text-md tracking-tight transition-colors duration-150",
          scrolled ? "text-[#24418f]" : "text-white"
        )}>
          Development Communication
        </span>
        <span className={cn(
          "font-normal text-xs sm:text-2xs mt-0 transition-colors duration-150",
          scrolled ? "text-muted-foreground" : "text-white"
        )}>
          Visayas State University
        </span>
      </div>
    </div>
  );
};

export const LogoIcon = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/images/devcom-logo.png"
      alt="DevCom Logo"
      width={40}
      height={40}
      className={cn("h-10 w-auto object-contain", className)}
    />
  );
};