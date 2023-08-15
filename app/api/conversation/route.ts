import { NextResponse } from "next/server"
import { HuggingFaceInference } from "langchain/llms/hf";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { getServerSession } from "next-auth";

const model = new HuggingFaceInference({
  model: "gpt2",
  apiKey: process.env.HUGGINGFACEHUB_API_KEY as string, // In Node.js defaults to process.env.HUGGINGFACEHUB_API_KEY
  temperature: 0.7
});


export async function POST(req:Request) {
    try {
        const session = await getServerSession();
        const userId = session?.user?.email
        const body = await req.json();
        const { messages } = body;
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if(!messages){
            return new NextResponse("Messages are required", { status: 400 })
        }
        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if(!freeTrial && !isPro) {
            return new NextResponse("Free Trial has expired.", { status: 403 });
        }
        const res = await model.call(messages);
        if(!isPro) await increaseApiLimit();
        return NextResponse.json(res)
    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}