"use client"
import Image from 'next/image'
import ProtectedRoute from '@/component/Protected Route/page';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

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
        <ProtectedRoute>
            <div className="flex justify-between">
                <h4 className="text-2xl font-medium">View Blog</h4>
                <Link href="/Dashboard/ViewBlog/CreateBlog" className="bg-[#FF6764] border border-[#FF6764] px-4 py-1.5 rounded-lg text-white font-normal">Create blog</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 shadow-md">
                {blogList?.map((data) => (
                    <div key={data.id} className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-[#C2C2C2]">
                        <div className="w-full">
                            <Image src="/sort.svg" alt='Sort' width={100} height={70} className="w-full" layout="responsive" />
                        </div>
                        <h4 className="text-lg font-medium">{data.title}</h4>
                        <p className="">{data.body}</p>
                        <h3 className="text-[#888]"><span className="font-medium">Created at:</span> {data.createdAt}</h3>
                    </div>
                ))}
            </div>
        </ProtectedRoute>
    )
}

export default Page;