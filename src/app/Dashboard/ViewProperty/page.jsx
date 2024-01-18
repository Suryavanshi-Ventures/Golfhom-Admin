"use client"
import ProtectedRoute from '@/component/Protected Route/page';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [propertyList, setPropertyList] = useState([]);
    const [token, setToken] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        const item = localStorage.getItem("access_token");
        setToken(item);
    }, [])

    useEffect(() => {
        if (token) {
            listProperty();
        }
    }, [token, currentPage]);

    // LIST API
    const listProperty = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property?limit=6&page=${currentPage}`,
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
            const viewPropertyData = await response.json();
            console.log("viewPropertyData", viewPropertyData)
            if (viewPropertyData.status === "success") {
                const sortedUsers = viewPropertyData.data
                setPropertyList(sortedUsers);
                setTotalPages(Math.ceil(viewPropertyData.total / 6));
            }

        } catch (error) {
            console.log("error message", error)
        }
    };

    return (
        <ProtectedRoute>
            <h2 className="font-medium text-2xl">Recent Property Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {propertyList?.map((data) => (
                    <div key={data.id} className="flex-shrink-0 flex-grow-0 w-full bg-white rounded-lg shadow-md">
                        <div className="w-full">
                            <Image src={data.imageUrl} alt='Sort' width={260} height={170} className="w-full mb-4 rounded-t-lg" />
                        </div>
                        <div className="flex flex-wrap justify-end mx-4 my-1">
                            <h4 className="font-semibold text-base">{data.name}</h4>
                            <button className="bg-[#4BAF4F] text-white rounded-lg px-3 py-1">${data.price}</button>
                        </div>
                        <div className="flex flex-col px-4">
                            <small className="font-normal">{data.bedrooms} Bedroom</small>
                            <small className="font-normal">{data.bathrooms} Bathroom</small>
                        </div>
                        <div className="flex justify-between p-4 gap-6">
                            <button className="bg-[#FF6764] text-white border border-[#FF6764] rounded-md py-1 w-24">Edit</button>
                            <button className="bg-black text-white border border-black rounded-md py-1 w-24">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-5">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-3 py-1 text-lg rounded-md text-white shadow-sm ${currentPage === index + 1
                            ? "bg-[#FFBD59] shadow-xl"
                            : "bg-gray-100 shadow-md"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </ProtectedRoute>
    )
}

export default Page
