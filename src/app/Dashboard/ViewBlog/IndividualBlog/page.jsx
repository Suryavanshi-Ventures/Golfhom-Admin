"use client"
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/component/Protected Route/page";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Page = () => {
    const [token, setToken] = useState(null);
    const SearchParams = useSearchParams();
    const BlogId = SearchParams.get("id");
    const [blogList, setBlogList] = useState([]);
    const [blogData, setBlogData] = useState(null);

    // const [data, setData] = useState({
    //     blocks: [],
    // });

    useEffect(() => {
        const item = localStorage.getItem("access_token");
        setToken(item);
    }, []);

    useEffect(() => {
        if (BlogId) {
            listBlog();
        }
    }, [BlogId, token]);

    useEffect(() => {
        if (blogList && blogList?.data) {
            setNewPropertyName(blogList?.data?.name);
            setAmenities(blogList?.data?.amenities);
            setCheckIn(blogList?.data?.checkIn);
            setAddress(blogList?.data?.address);
            setBedroom(blogList?.data?.bedrooms);
            setDescription(blogList?.data?.description);
            setOwnerName(blogList?.data?.ownerName);
            // setNewContent(propertyList?.data?.content);
            // let content = JSON.parse(propertyList.data.content);
            // setData({ blocks: content.blocks });
        }
        console.log("blogs blogList Data", blogList)
    }, [blogList]);

    // GET PREVIOUS DATA ID
    const listBlog = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${BlogId}`,
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
                setBlogList(blogData);
            }
        } catch (error) {
            console.log("error message", error)
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

export default Page;