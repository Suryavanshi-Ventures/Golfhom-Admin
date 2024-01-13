"use client"
import Image from 'next/image'
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
        <>
            <div>
                {locationList?.map((data) => (
                    <div className="flex flex-col gap-3">
                        <Image src="/sort.png" alt='Sort' width={100} height={70} />
                        <h4>Recent Location</h4>
                        <h4>View location of the property</h4>
                        <h3>{data.name}</h3>
                        <h3>{data.country}</h3>
                        <h3>{data.region}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Page;