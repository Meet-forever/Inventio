"use client";
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MessageSquare, ImageIcon, VideoIcon, Music4Icon, Code2Icon, ArrowRight} from 'lucide-react';
import { useRouter } from "next/navigation"

const features = [
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
    },
    {
        label: "Music Generation",
        icon: Music4Icon,
        href: "/music",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
    },
    {
        label: "Code Generation",
        icon: Code2Icon,
        href: "/code",
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
    }
]
export default function DashboardPage() {
    const router = useRouter()
    return (
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Check out the potential of AI
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    Meet the next generation AI - Explore the power of AI
                </p>
            </div>
            <div className="px-4 md:px-20 lg:px-32 space-y-4">
                {features.map((feature) => 
                    <Card onClick={()=>router.push(feature.href)} key={feature.href} className='p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer'>
                        <div className='flex items-center gap-x-4'>
                            <div className={cn('p-2 w-fit rounded-md', feature.bgColor)}>
                                <feature.icon className={cn('w-7 h-7 bg-transparent', feature.color)} />
                            </div>
                            <div className='font-semibold'>
                                {feature.label}
                            </div>
                        </div>
                        <ArrowRight className='w-5 h-5' />
                    </Card>
                )}
            </div>
        </div>
    )
}
