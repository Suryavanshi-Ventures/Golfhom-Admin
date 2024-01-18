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

    const isLinkActive = (href) => {
        return router.pathname === href;
    };

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('access_token') || false;
        if (!isAuthenticated) {
            router.push('/');
        }
    }, [])

    return (
        <>
            <div className='sidebar-container bg-white rounded-xl hidden lg:block'>
                <div className='py-5 px-3 overflow-y-auto h-screen shadow-lg'>
                    <div className='px-5 pb-5'>
                        <div className='flex flex-col'>
                            <Image src="/icons/avatar.svg" alt='Profile' width={70} height={70} className='rounded-full' />
                            <h3>Username</h3>
                            <h4 className='text-[#C2C2C2]'>email@gamil.com</h4>
                        </div>

                        <Link href="/Dashboard" className='cursor-pointer'>
                            <div className={`${isLinkActive('/Dashboard') ? 'bg-[#CBAF69]' : 'bg-red'} flex gap-2 my-3 rounded-lg inline-block`}>
                                <Image src="/icons/Dashboard.svg" alt='Dashboard' width={20} height={10} className={`${isLinkActive('/Dashboard') ? 'invert' : 'text-black'}`} />
                                <h4 className={`${isLinkActive('/Dashboard') ? 'text-[' : 'text-'}`}>Dashboard</h4>
                            </div>
                        </Link>
                    </div>
                    <hr />

                    <div className='p-5 flex flex-col gap-1'>
                        <h3 className='text-[#C2C2C2] font-medium'>User</h3>
                        <Link href="/Dashboard/CreateUsers" className="my-1 flex gap-2 cursor-pointer">
                            <Image src="/icons/user.svg" alt='Dashboard' width={20} height={10} className={`${isLinkActive('/Dashboard') ? 'invert' : 'text-black'}`} />
                            <h3>Create users</h3>
                        </Link>
                        <Link href="/Dashboard/ViewUsers" className="my-1 flex gap-2 cursor-pointer">
                            <Image src="/icons/viewAllUser.svg" alt='Dashboard' width={20} height={20} className={`${isLinkActive('/Dashboard') ? 'invert' : 'text-black'}`} />
                            <h3>View all users</h3>
                        </Link>
                        <Link href="/Dashboard/ViewAdmin" className="my-1 flex gap-2 cursor-pointer">
                            <Image src="/icons/Admin.svg" alt='Dashboard' width={20} height={10} className={`${isLinkActive('/Dashboard') ? 'invert' : 'text-black'}`} />
                            <h3>View all admin</h3>
                        </Link>
                        <Link href="/Dashboard/ViewBooking" className="my-1 flex gap-2 cursor-pointer">
                            <Image src="/icons/booking.svg" alt='Dashboard' width={20} height={10} className={`${isLinkActive('/Dashboard') ? 'invert' : 'text-black'}`} />
                            <h3>View Booking</h3>
                        </Link>
                    </div>
                    <hr />

                    <div className='p-5 flex flex-col gap-1'>
                        <h3 className='text-[#C2C2C2] font-medium'>Property</h3>
                        <Link href="/Dashboard/CreateProperty" className="my-1 flex gap-2 cursor-pointer">
                            <Image src="/icons/listProperty.svg" alt='Dashboard' width={20} height={10} className={`${isLinkActive('/Dashboard') ? 'invert' : 'text-black'}`} />
                            <h3>Create property</h3>
                        </Link>
                        <Link href="/Dashboard/ViewProperty" className="my-1 flex gap-2 cursor-pointer">
                            <Image src="/icons/rental.svg" alt='Dashboard' width={20} height={10} className={`${isLinkActive('/Dashboard') ? 'invert' : 'text-black'}`} />
                            <h3>View all property</h3>
                        </Link>
                        {/* <Link href="/Dashboard/Location" className="my-1 flex gap-2 cursor-pointer">
                            <Image src="/icons/Message.svg" alt='Dashboard' width={20} height={10} className={`${isLinkActive('/Dashboard') ? 'invert' : 'text-black'}`} />
                            <h3>Location</h3>
                        </Link> */}
                        <Link href="/Dashboard/ViewBlog" className="my-1 flex gap-2 cursor-pointer">
                            <Image src="/icons/blog.svg" alt='Dashboard' width={20} height={10} className={`${isLinkActive('/Dashboard') ? 'invert' : 'text-black'}`} />
                            <h3>View Blog</h3>
                        </Link>
                        <Link href="/Dashboard/ViewMessage" className="my-1 flex gap-2 cursor-pointer">
                            <Image src="/icons/Message.svg" alt='Dashboard' width={20} height={10} className={`${isLinkActive('/Dashboard') ? 'invert' : 'text-black'}`} />
                            <h3>View all message</h3>
                        </Link>
                    </div>
                    <hr />

                    {/* <div className='p-5 flex flex-col gap-1'>
                        <h3 className='text-[#C2C2C2] font-medium'>Chart</h3>
                        <h3>Graph</h3>
                    </div>
                    <hr /> */}

                    <button className='flex items-center gap-2 p-5 cursor-pointer' onClick={handleLogout}>
                        <Image src="/icons/logout.svg" alt='Exit' width={20} height={20} className={`${isLinkActive('/Dashboard') ? 'invert' : 'text-black'}`} />
                        <h3>Log out</h3>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Page;