"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Page = () => {
    const router = useRouter()
    const handleLogout = () => {
        localStorage.removeItem('access_token')
        router.push('/')
    }

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('access_token') || false;
        if (!isAuthenticated) {
            router.push('/');
        }
    }, [])

    return (
        <>
            <div className='p-5'>
                <div className='flex flex-col gap-2'>
                    <Image src="/google.png" alt='Profile' width={30} height={20} className='rounded-full invert' />
                    <h3>Username</h3>
                    <h4 className='text-[#C2C2C2]'>email@gamil.com</h4>
                </div>

                <div className='flex gap-2 mt-8'>
                    <Image src="/dashboard.png" alt='Dashboard' width={20} height={20} className='' />
                    <h4 className='text-[#FF6764]'>Dashboard</h4>
                </div>
            </div>
            <hr />

            <div className='p-5 flex flex-col gap-1'>
                <h3 className='text-[#C2C2C2] font-medium'>User</h3>
                <Link href="/Dashboard/CreateUsers" className="my-2"><h3>Create users</h3></Link>
                <Link href="/Dashboard/ViewUsers" className="my-2"><h3>View all users</h3></Link>
                <Link href="/Dashboard/ViewAdmin" className="my-2"><h3>View all admin</h3></Link>
                <Link href="/Dashboard/ViewBooking" className="my-2"> <h3>View Booking</h3></Link>
            </div>
            <hr />

            <div className='p-5 flex flex-col gap-1'>
                <h3 className='text-[#C2C2C2] font-medium'>Property</h3>
                <Link href="/Dashboard/ListProperty" className="my-2"><h3>List property</h3></Link>
                <Link href="/Dashboard/ViewProperty" className="my-2"><h3>View all property</h3></Link>
                <Link href="/Dashboard/Location" className="my-2"> <h3>Location</h3></Link>
                <Link href="/Dashboard/ViewBlog" className="my-2"><h3>View Blog</h3></Link>
                <Link href="/Dashboard/ViewMessage" className="my-2"><h3>View all message</h3></Link>
            </div>
            <hr />

            <div className='p-5 flex flex-col gap-1'>
                <h3 className='text-[#C2C2C2] font-medium'>Chart</h3>
                <h3>Graph</h3>
            </div>
            <hr />

            <button className='flex gap-2 p-5 bg-red-300' onClick={handleLogout}>
                <h3>Log out</h3>
                <Image src="/exit.png" alt='Exit' width={20} height={20} />
            </button>
        </>
    )
}

export default Page;