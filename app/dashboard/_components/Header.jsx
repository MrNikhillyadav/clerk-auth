// _components krne se is folder ko as a routes consider nahi krega Nextjs

"use client"
import React, { useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'


function Header() {
// copy code from nextjs pathname doc

    const pathname = usePathname() //usePathname hook tell the active bath.
    useEffect(() => {
    console.log(pathname)
  }, [])

  return (
    <div className='flex  text-xl justify-between p-3 md:px-8 items-center bg-slate-100'>
        <Image className='  p-4 md:p-0' src={'/logo.svg'} width={90} height={90} />
        <ul className='hidden md:flex  justify-between items-cent p-2 gap-10'>
            {/* conditional rendering use hogi to find active path */}
            <li className={`cursor-pointer hover:text-primary transition-all hover:font-bold
                ${pathname =='/dashboard' && 'font-bold text-primary '}`}>Dashboard</li>
            <li className={`cursor-pointer hover:text-primary transition-all hover:font-bold
                ${pathname =='/dashboard/questions' && 'font-bold text-primary '}`}>Questions</li>
            <li className={`cursor-pointer hover:text-primary transition-all hover:font-bold
                ${pathname =='/dashboard/upgrade' && 'font-bold text-primary '}`}>Upgrade</li>
            <li className={`cursor-pointer hover:text-primary transition-all hover:font-bold
                ${pathname =='/dashboard/how-it-works' && 'font-bold text-primary '}`}>How it works?</li>

        </ul>
        <UserButton/>
        
    </div>
  )
}

export default Header