"use client";
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { LayoutDashboard, MessageSquare, ImageIcon, VideoIcon, Music4Icon, Code2Icon, Settings2 } from 'lucide-react';
import  { usePathname } from "next/navigation"
import { cn } from '@/lib/utils';
import { FreeCounter } from '@/components/free-counter';
const montserrat = Montserrat({weight:  "700", subsets: ["latin"]})

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700",
    },
    {
        label: "Music Generation",
        icon: Music4Icon,
        href: "/music",
        color: "text-emerald-500",
    },
    {
        label: "Code Generation",
        icon: Code2Icon,
        href: "/code",
        color: "text-amber-500",
    },
    {
        label: "Settings",
        icon: Settings2,
        href: "/settings",
        color: "text-slate-100",
    }
]

interface SidebarProps{
    apiLimitCount: number;
    isPro: boolean;
};

const Sidebar = ({apiLimitCount = 0, isPro=false}:SidebarProps) => {
    const  pathname =  usePathname();
    return (
        <div className='space-y-4 py-4 flex flex-col justify-between h-full bg-[#111827] text-white'>
            <div className='px-3 py-2 flex-1'>
                <Link href='/dashboard' className='flex items-center pl-3 mb-14'>
                    <div className='relative w-10 h-10 mr-4'>
                        <Image fill alt="Logo"  src="/logo.svg" />
                    </div>
                    <h1 className={cn('text-2xl font-bold', montserrat.className)}>
                        Inventio
                    </h1>
                </Link>
                <div className='space-y-1'>
                    {routes.map((route) => 
                        <Link href={route.href} key={route.href} className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition', pathname === route.href? "text-white bg-white/10": "text-zinc-400" )}>
                            <div className='flex items-center flex-1'>
                                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    )}
                </div>
            </div>
            <FreeCounter 
                apiLimitCount={apiLimitCount}
                isPro={isPro}
            />
        </div>
    )
}

export default Sidebar