import useUserStore from "@/stores/UserStore"
import { FC } from "react"
import {useRouter} from "next/navigation";

interface CardHistoryProps {
    name?: string,
    chatId: string
}
const CardHistory:FC<CardHistoryProps> = ({name="Cat is so cute",chatId}) => {
    const router = useRouter();
  return (
    <div onClick={
        () => router.push(`/chat?chatId=${chatId}`)
    } className="cursor-pointer  rounded-2xl border-neutral-300 border p-4 shadow-[0_4px_4px_0px_rgba(0,0,0,0.05)] text-neutral-500">{name}</div>
  )
}

export default CardHistory