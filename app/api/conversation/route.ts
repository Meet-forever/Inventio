import { NextResponse } from "next/server"
import { HuggingFaceInference } from "langchain/llms/hf";
import { auth } from "@clerk/nextjs";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";


const model = new HuggingFaceInference({
  model: "gpt2",
  apiKey: process.env.HUGGINGFACEHUB_API_KEY as string, // In Node.js defaults to process.env.HUGGINGFACEHUB_API_KEY
  temperature: 0.7
});


export async function POST(req:Request) {
    try {
        const {userId} = auth();
        const body = await req.json();
        const { messages } = body;
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if(!messages){
            return new NextResponse("Messages are required", { status: 400 })
        }
        const freeTrial = await checkApiLimit();
        if(!freeTrial) {
            return new NextResponse("Free Trial has expired.", { status: 403 });
        }
        const res = await model.call(messages);
        await increaseApiLimit();
        return NextResponse.json(res)
    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}