"use client"
import Image from 'next/image'
import ProtectedRoute from '@/component/Protected Route/page';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [token, setToken] = useState(null);
    const [locationList, setLocationList] = useState([]);

    useEffect(() => {
        const item = localStorage.getItem("access_token");
        setToken(item);
    }, [])

    useEffect(() => {
        if (token) {
            listUsers();
        }
    }, [token]);

    // LIST API
    const listUsers = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/location`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch list");
            }
            const viewLocationData = await response.json();
            console.log("viewLocationData", viewLocationData)
            if (viewLocationData.status === "success") {
                setLocationList(viewLocationData.data);
            }

        } catch (error) {
            console.log("error message", error)
        }
    };

    return (
        <ProtectedRoute>
            <h2 className="font-medium text-2xl">Location</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {locationList?.map((data) => (
                    <div key={data.id} className="flex-shrink-0 flex-grow-0 w-full bg-white rounded-lg shadow-md">
                        <div className="w-full">
                            <Image src="/sort.svg" alt='Sort' width={100} height={70} className="w-full mb-4" />
                        </div>
                        <h4 className="font-semibold mx-4 my-1 text-base">Recent Location</h4>
                        <small className="text-[#C2C2C2] font-normal px-4">View location of the property</small>
                        <div className="flex flex-row flex-wrap p-4 gap-6">
                            <button className="bg-[#C7DEEB] text-black border border-[#C2C2C2] rounded-lg py-2 px-4 w-full sm:w-auto mb-2 sm:mb-0">{data.name}</button>
                            <button className="bg-[#C7DEEB] text-black border border-[#C2C2C2] rounded-lg py-2 px-4 w-full sm:w-auto mb-2 sm:mb-0">{data.country}</button>
                            <button className="bg-[#C7DEEB] text-black border border-[#C2C2C2] rounded-lg py-2 px-4 w-full sm:w-auto mb-2 sm:mb-0">{data.region}</button>
                        </div>
                    </div>
                ))}
            </div>
        </ProtectedRoute>
    )
}

export default Page;