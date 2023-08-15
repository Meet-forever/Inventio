import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';

export const UserAvatar = () => {
    const {data} = useSession();
    if (!data || !data.user) return null;
    return (
        <Avatar className='h-8 w-8'>
            <AvatarImage src={data.user.image ?? undefined} />
            <AvatarFallback>
                {data.user.name?.charAt(0) ?? "#"}
            </AvatarFallback>
        </Avatar>
    )
}
