'use client'
import Link from 'next/link'
import { Logo } from '../Logo/logo'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { motion, useScroll } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Academics', href: '/academics' },
  { name: 'Faculty', href: '/public-faculty' },
  { name: 'News & Updates', href: '/news&updates' },
  { name: 'Resources', href: '/resources' },
  { name: 'Contact Us', href: '/contact' },
]

export const SiteHeader = () => {
    const [scrolled, setScrolled] = React.useState(false)
    const [sheetOpen, setSheetOpen] = React.useState(false)
    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest : any) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav className="fixed z-20 w-full">
                <div 
                  className={cn(
                    'mx-auto w-full px-3 transition-all duration-100 lg:px-7',
                    'bg-transparent backdrop-blur-none',
                    scrolled && 'bg-background/70 backdrop-blur-xl shadow-sm'
                  )}
                >
                    <motion.div
                        key={1}
                        initial={{ paddingTop: 20, paddingBottom: 20 }}
                        animate={{ paddingTop: scrolled ? 12 : 20, paddingBottom: scrolled ? 12 : 20 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className={cn('relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-5', scrolled && 'lg:py-3')}
                    >
                        <div className="flex w-full flex-1 flex-row-reverse items-center justify-between gap-12 lg:w-auto lg:flex-row">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2"
                            >
                                <Logo scrolled={scrolled} />
                            </Link>

                            {/* MOBILE MENU TRIGGER */}
                            <div className="lg:hidden">
                                {/* modal={false} keeps the scrollbar visible */}
                                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                                    <SheetTrigger asChild>
                                        <button
                                            aria-label="Open Menu"
                                            className="relative z-20 -m-2.5 block cursor-pointer p-3"
                                        >
                                            <Menu className={cn("size-6 transition-colors", scrolled ? "text-foreground" : "text-white")} />
                                        </button>
                                    </SheetTrigger>
                                    
                                    <SheetContent 
                                        side="left" 
                                        className="w-[300px] sm:w-[400px] bg-[#24418f] text-white border-none [&>button]:hidden p-0 flex flex-col"
                                    >
                                        <div className="flex items-center justify-between p-6">
                                            <SheetTitle className="text-xl font-semibold text-white">Menu</SheetTitle>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setSheetOpen(false)}
                                                className="h-10 w-10 rounded-md text-white font-normal hover:bg-white/20 hover:text-white"
                                            >
                                                <X className="size-5" />
                                            </Button>
                                        </div>

                                        {/* NAVIGATION LINKS */}
                                        <div className="flex-1 px-4 mt-2">
                                            <ul className="flex flex-col gap-2">
                                                {menuItems.map((item, index) => (
                                                    <li key={index}>
                                                        <Link
                                                            href={item.href}
                                                            onClick={() => setSheetOpen(false)}
                                                            className="block w-full py-2 px-3 text-md font-normal text-white/90 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-white"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>

                        {/* Desktop nav links */}
                        <div className="hidden lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "font-semibold block duration-50 transition-colors relative after:absolute after:-bottom-6.5 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-200 hover:after:w-full",
                                                scrolled ? "text-foreground hover:text-[#24418f]" : "text-white text-shadow-lg shadow-blue-900"
                                            )}
                                        >
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </nav>
        </header>
    )
}