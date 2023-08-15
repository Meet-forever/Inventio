import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

const LandingLayout = async ({children}: {children: React.ReactNode}) => {
  const session = await getServerSession();
  if(session) redirect("/dashboard")
  return (
    <main className='h-full bg-[#111827] overflow-auto'>
        <div className='mx-auto max-w-screen-xl h-full'>
            {children}
        </div>
    </main>
  )
}

export default LandingLayout