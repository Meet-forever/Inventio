"use client";

import { z } from "zod";
import Heading from "@/components/heading"
import { MessageSquare } from "lucide-react"
import { formScheme } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";
import { useProModal } from "@/hooks/use-pro-modal";

type ChatUI = {prompt: string, res: string}[] 



const Conversation = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [messages, setMessages] = useState<ChatUI>([]);

    const form = useForm<z.infer<typeof formScheme>>({
        resolver: zodResolver(formScheme),
        defaultValues:  {
            prompt: ""
        }
    });
    
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async(values: z.infer<typeof formScheme>) => {
        try {
            const res = await axios.post("/api/conversation",{
                messages: values.prompt
            })
            setMessages(i => [...i, {prompt: values.prompt, res: res.data}])
            form.reset()
        } catch (error: any) {
            if(error?.response?.status === 403){
                proModal.onOpen();
            }
        }
        finally{
            router.refresh();
        }
    }

    return (
        <div>
            <Heading title="Conversation" description="Chat with a modern conversation model" icon={MessageSquare} iconColor="text-violet-500" bgColor="bg-violet-500/10" />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField control={form.control} name="prompt" render={({field}) =>
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl  className="m-0 p-0">
                                        <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="Ask me anything!" {...field} />
                                    </FormControl>
                                </FormItem>
                            } />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                    <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                        <Loader />
                    </div>)}
                    {messages.length === 0 && !isLoading && (<Empty label="No conversations uwu" />)}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((msg) => (
                            <div key={msg.prompt}>
                                <div className="p-8 w-full flex items-start gap-x-8 rounded-lg bg-muted">
                                    <BotAvatar />
                                    {msg.res}
                                </div>
                                <div className="p-8 w-full flex items-start gap-x-8 rounded-lg bg-white border border-black/10">
                                    <UserAvatar />
                                    <p className="text-sm">{msg.prompt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Conversation