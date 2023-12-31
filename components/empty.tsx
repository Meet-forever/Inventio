import Image from "next/image"

export const Empty = ({label}: {label: string}) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
        <div className="relative h-72 w-72">
            <Image fill alt="Empty" src="/empty.svg" />
        </div>
        <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  )
}
