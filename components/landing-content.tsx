"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [{
    name: "Luffy",
    avatar: "A",
    title: "Software Engineer",
    description: "Best AI application!"
},
{
    name: "Zoro",
    avatar: "Z",
    title: "Software Engineer",
    description: "Best AI application!"
},{
    name: "Sanji",
    avatar: "S",
    title: "Software Engineer",
    description: "Best AI application!"
},{
    name: "Usopp",
    avatar: "U",
    title: "Software Engineer",
    description: "Best AI application!"
}
]

export const LandingContent = () => {
  return (
    <div className='px-10 pb-20'>
        <h2 className='text-center text-4xl text-white font-extrabold mb-10'>
            Testimonials
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {testimonials.map((testimonial) => <Card key={testimonial.description} className="bg-[#192339] border-none text-white">
                <CardHeader>
                    <CardTitle className="flex items-center gap-x-2">
                        <div>
                            <p className="text-lg">{testimonial.name}</p>
                            <p className="text-zinc-400 text-sm">{testimonial.title}</p>
                        </div>
                    </CardTitle>
                    <CardContent className="pt-4 px-0">
                        {testimonial.description}
                    </CardContent>
                </CardHeader>
            </Card>)}
        </div>
    </div>
  )
}
