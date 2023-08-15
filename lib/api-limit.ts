import prismadb from "./prismadb";
import { MAX_FREE_COUNT } from "@/constants";
import { getServerSession } from "next-auth";


export const increaseApiLimit = async() => {
    // const {userId} = auth();
    const session =  await getServerSession();
    const user = session?.user;
    const userId = user?.email;

    if(!userId) return;

    const userApiLimit = await prisma?.userApiLimit.findUnique({ where: {
        userId
    }})

    if(userApiLimit){
        await prismadb.userApiLimit.update({
            where: {userId},
            data: {count: userApiLimit.count + 1}
        })
    }
    else{
        await prismadb.userApiLimit.create({
            data: {userId: userId, count: 1}
        })   
    }   
};

export const checkApiLimit = async() => {
    const session =  await getServerSession();
    const user = session?.user;
    const userId = user?.email;
    
    if(!userId) return;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    if(!userApiLimit || userApiLimit.count < MAX_FREE_COUNT) return true;
    return false;
}

export const getApiLimitCount = async() => {
    const session =  await getServerSession();
    const user = session?.user;
    const userId = user?.email;
    
    if(!userId) return 0;
    
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {userId}
    });

    if(!userApiLimit) return 0;

    return userApiLimit.count;
}