"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useProModal } from '@/hooks/use-pro-modal'
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ImageIcon, VideoIcon, Music4Icon, Code2Icon, Check, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const features = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
    },
    {
        label: "Music Generation",
        icon: Music4Icon,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
    },
    {
        label: "Code Generation",
        icon: Code2Icon,
        color: "text-green-700",
        bgColor: "bg-green-700/10",
    }
]

export const ProModal = () => {
    const [loading, setLoading] = useState(false);
    const proModal = useProModal();

    const onSubscribe = async () => {
        try {
            setLoading(true);
            const responese = await axios.get("/api/stripe");
            window.location.href = responese.data?.url;
        } catch (error) {
            toast.error("Something went wrong");
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
                        <div className='flex items-center gap-x-2 font-bold py-1'>
                            Upgrade to Pro
                            <Badge variant="premium" className='uppercase text-sm py-1'>
                                pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>
                        {features.map((feature) => (
                            <Card key={feature.label} className='p-3 border-black/5 flex items-center justify-between' >
                                <div className='flex items-center gap-x-4'>
                                    <div className={cn("p-2 w-fit rounded-md", feature.bgColor)}>
                                        <feature.icon className={cn("w-6 h-6", feature.color)} />
                                    </div>
                                    <div className='font-semibold text-sm'>
                                        {feature.label}
                                    </div>
                                </div>
                                <Check className='text-primary w-5 h-5' />
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={loading} onClick={onSubscribe} className='w-full' variant={'premium'} size={'lg'}>
                        Upgrade
                        <Zap className='w-4 h-4 ml-2 fill-white' />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
