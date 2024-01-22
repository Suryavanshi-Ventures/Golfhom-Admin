"use client"
import ProtectedRoute from '@/component/Protected Route/page';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { Pagination } from "@nextui-org/react";
import Link from 'next/link';

const Page = () => {
    const [propertyList, setPropertyList] = useState([]);
    const [token, setToken] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [propertyName, setPropertyName] = useState("");
    const [noPropertiesMessage, setNoPropertiesMessage] = useState("");
    // const [userToDelete, setUserToDelete] = useState(null);
    // const [deleteOpen, setDeleteOpen] = useState(false);

    const itemsPerPage = 10;

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // const handleModalOpen = (data) => {
    //     setUserToDelete(data);
    //     setDeleteOpen(true);
    // }

    // const handleCancelDelete = () => {
    //     setDeleteOpen(false);
    // };

    useEffect(() => {
        const item = localStorage.getItem("access_token");
        setToken(item);
    }, [])

    useEffect(() => {
        if (token) {
            listProperty();
        }
    }, [token, currentPage, propertyName]);

    // LIST API
    const listProperty = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property?limit=${itemsPerPage}&page=${currentPage}&searchQuery=${propertyName}`,
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
                const sortedProperties = viewPropertyData.data
                setPropertyList(sortedProperties);
                setTotalPages(viewPropertyData.count);

                if (sortedProperties.length === 0) {
                    setNoPropertiesMessage("No properties found with the given name...");
                } else {
                    setNoPropertiesMessage("");
                }
            } else {
                setNoPropertiesMessage("Error fetching properties.");
            }
        } catch (error) {
            console.log("error message", error)
        }
    };

    // DELETE API
    // const handleDeleteProperty = async (propertyData) => {
    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property/${propertyData}`,
    //             {
    //                 method: "DELETE",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         const responseData = await response.json();
    //         setViewListUsers((prevPropertyList) => prevPropertyList.filter(property => property.id !== propertyData));
    //         setDeleteViewListProperty(responseData);
    //         setDeleteOpen(false);
    //         setTimeout(() => { setDeleteOpen(false); }, 10000);
    //     } catch (error) {
    //         console.error("Error deleting property:", error);
    //     }
    // };

    return (
        <ProtectedRoute>
            <div className="flex justify-between">
                <h2 className="font-medium text-2xl">Recent Property Posts</h2>
                <div className=" flex  md:justify-start mr-5 items-center">
                    <input
                        className="bg-white w-96 rounded-full shadow-lg text-gray-600 px-4 outline-none h-12"
                        placeholder="Search for property by name" value={propertyName}
                        onChange={(e) => setPropertyName(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={2} stroke="currentColor" className="w-6 h-6 -ml-[45px] text-[#FF6764]" onClick={listProperty}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
            </div>
            {noPropertiesMessage && (
                <div className="flex justify-center">
                    <p className="text-[#FF6764] mt-5 bg-white rounded-lg py-5 px-10 w-fit">{noPropertiesMessage}</p>
                </div>
            )}
            {/* {deleteOpen && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-5 flex flex-col items-center justify-center z-50">
                    <div className="flex flex-col bg-white rounded-lg p-5 gap-4 z-50">
                        <p>Property Id : {userToDelete}</p>
                        <p>You want to delete this property</p>
                        <div className="flex gap-4 justify-center">
                            <button onClick={() => handleDeleteProperty(userToDelete)} className="bg-[#FF6764] rounded-full px-4 py-1 text-white w-fit">Delete</button>
                            <button onClick={handleCancelDelete} className="bg-gray-400 rounded-full px-4 py-1 text-white">Cancel</button>
                        </div>
                    </div>
                </div>
            )} */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {propertyList?.map((data) => (
                    <div key={data.id} className="flex-shrink-0 flex-grow-0 w-full bg-white rounded-lg shadow-md">
                        <div className="w-full">
                            <Image src={data.imageUrl} alt='Sort' width={260} height={170} className="w-full mb-4 rounded-t-lg" />
                        </div>
                        <div className="flex flex-wrap justify-between mx-4 my-1">
                            <h4 className="font-semibold text-base">{data.name}</h4>
                        </div>
                        {/* <div className="flex justify-end px-4">
                        </div> */}
                        <div className="flex flex-col px-4">
                            <small className="font-normal">{data.bedrooms} Bedroom</small>
                            <small className="font-normal">{data.bathrooms} Bathroom</small>
                        </div>
                        <div className="flex justify-between p-4 gap-6">
                            <button className="bg-[#4BAF4F] text-white rounded-lg px-3 py-1">${data.price}</button>
                            <Link href="/Dashboard/ViewProperty/UpdateProperty" className="bg-[#FF6764] text-white border border-[#FF6764] rounded-md py-1 w-24 text-center">Update</Link>
                            {/* <button onClick={() => handleModalOpen(data.id)} className="bg-black text-white border border-black rounded-md py-1 w-24">Delete</button> */}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-5">
                <Pagination
                    showControls
                    total={totalPages}
                    initialPage={currentPage}
                    onChange={handlePageChange}
                />
            </div>
        </ProtectedRoute>
    )
}

export default Page;