"use client"
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/component/Protected Route/page";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ViewBlog = ({ blogId }) => {
    const router = useRouter();
    const [blogData, setBlogData] = useState(null);
    const [token, setToken] = useState(null);

    const [data, setData] = useState({
        blocks: [],
    });

    useEffect(() => {
        const item = localStorage.getItem("access_token");
        setToken(item);
    }, []);

    useEffect(() => {
        if (blogId) {
            fetchBlogData();
        }
    }, [blogId, token]);

    // GET PREVIOUS DATA ID
    const fetchBlogData = async (blogId) => {
        console.log("blogId")

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/blog/${blogId}`,
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
            const blogListData = await response.json();
            console.log("blogListData", blogListData)
            if (blogListData.status === "success") {
                setBlogData(blogListData.result);
            } else {
                throw new Error("Failed to fetch blog data");
            }
        } catch (error) {
            toast.error('No previous data', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    useEffect(() => {
        if (blogData && blogData.data) {
            let content = JSON.parse(blogData.data.content);
            setData({ blocks: content.blocks });
        }
    }, [blogData]);

    return (
        <ProtectedRoute>
            <div className="w-full bg-white rounded-xl p-7 shadow-md">
                <div className="mb-5">
                    <h5 className="mb-1 font-medium text-2xl">Create New Blog</h5>
                    <small className="text-[#C2C2C2]">Create Blog</small>
                </div>

                <div className="flex gap-4 justify-end">
                    <Link href="/Dashboard/ViewBlog" className="bg-gray-400 rounded-[4px] px-4 py-1 text-white">Back</Link>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default ViewBlog;