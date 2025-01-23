'use client'
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

const UserAvatar = () => {
  const { data: session } = useSession();

  return (
    <div className='p-[2px] bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full'>
      <Avatar>
        <AvatarImage src={session?.user.image || '/'} />
        <AvatarFallback>{session?.user.user.firstName[0]}</AvatarFallback>
      </Avatar>
    </div>
  )
}

export default UserAvatar
