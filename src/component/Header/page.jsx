import Image from 'next/image';
import React from 'react'

const Page = () => {

    return (
        <>
            <div className='flex justify-between px-5 py-3'>
                <Image src="/GOLFHOM-Logo.png" alt='Golfhom' width={160} height={160} />
                <h2 className='font-bold text-xl'>Welcome to Golfhom Dashboard</h2>
                <div className='flex gap-3'>
                    <Image src="/Notification.png" alt='Notification' width={20} height={4} />
                    <h2 className='font-semibold'>January 03, 2024</h2>
                </div>
            </div>
        </>
    )
}

export default Page;