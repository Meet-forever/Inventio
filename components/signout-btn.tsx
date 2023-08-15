"use client";
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

export const SignoutBtn = () => {
    const handleSignOut = () => {
        signOut({ callbackUrl: "/"});
    }
    return (
        <Button onClick={handleSignOut}>Sign out</Button>
    )
}
