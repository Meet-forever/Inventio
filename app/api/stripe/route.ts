import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

import { absoluteUrl } from "@/lib/utils";
import { getServerSession } from "next-auth";

const settingUrl = absoluteUrl("/settings");


export async function GET() {
    try {
        const session = await getServerSession();
        const userId = session?.user?.email;

        if(!userId) return new NextResponse("Unauthorized", {status: 401})

        const usreSubscription = await prismadb.userSubscription.findUnique({
            where: {userId}
        })

        if(usreSubscription && usreSubscription.stripeCustomerId){
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: usreSubscription.stripeCustomerId,
                return_url: settingUrl
            });
            return new NextResponse(JSON.stringify({url: stripeSession.url}));
        }
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingUrl,
            cancel_url: settingUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: userId,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Inventio Pro",
                            description: "Unlimited AI generations"
                        },
                        unit_amount: 2000,
                        recurring:{
                            interval: "month"
                        }
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId,
            }
        })
        return new NextResponse(JSON.stringify({url: stripeSession.url}))
    
    } catch (error) {
        console.log("[STRIPE_ERROR]", error);
        return new NextResponse("Internal error", {status: 500})
    }
}