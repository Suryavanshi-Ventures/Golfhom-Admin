"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/page';

const Page = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000 * 60);

        return () => clearInterval(intervalId);
    }, []);

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
        if (isLargeScreen) {
            setIsSidebarVisible(false);
        }
    }, [isLargeScreen]);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <div className='flex justify-between px-5 py-3'>
                <Image src="/GOLFHOM-Logo.png" alt='Golfhom' width={160} height={160} />
                <button className="toggle-sidebar bg-[#C2C2C2] p-4 rounded-full text-white lg:hidden" onClick={toggleSidebar}>
                    <Image src="/icons/hamburger.svg" alt='Menu' width={20} height={20} />
                </button>
                <h2 className='font-bold text-xl'>Welcome to Golfhom Dashboard</h2>
                <div className='flex gap-3'>
                    <h2 className='font-semibold'>{formattedDate}</h2>
                </div>
                {isSidebarVisible && <Sidebar />}
            </div>
        </>
    )
}

export default Page;