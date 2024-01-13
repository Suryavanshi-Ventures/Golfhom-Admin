"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [token, setToken] = useState(null);
    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        const item = localStorage.getItem("access_token");
        setToken(item);
    }, [])

    useEffect(() => {
        if (token) {
            listBlog();
        }
    }, [token]);

    // LIST API
    const listBlog = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`,
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
            const blogData = await response.json();
            console.log("blogData", blogData)
            if (blogData.status === "success") {
                setBlogList(blogData.data);
            }

        } catch (error) {
            console.log("error message", error)
        }
    };

    return (
        <>
            <div>
                {blogList?.map((data) => (
                    <div className="flex flex-col gap-3">
                        <Image src="/sort.png" alt='Sort' width={100} height={70} />
                        <h4>{data.title}</h4>
                        <h4>View location of the property</h4>
                        <p>{data.body}</p>
                        <h3>{data.slug}</h3>
                        <h3>Created at: {data.createdAt}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Page;