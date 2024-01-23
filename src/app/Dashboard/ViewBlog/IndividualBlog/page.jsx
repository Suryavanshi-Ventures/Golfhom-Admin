"use client"
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/component/Protected Route/page";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
// import DOMPurify from "dompurify";

const Page = () => {
    const [token, setToken] = useState(null);
    const SearchParams = useSearchParams();
    const BlogId = SearchParams.get("id");
    const [blogList, setBlogList] = useState([]);
    const [blogData, setBlogData] = useState(null);
    const [title, setTitle] = useState(null);
    const [body, setBody] = useState(null);
    const [tag, setTag] = useState(null);
    const [blogImage, setBlogImage] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);


    // const [data, setData] = useState({
    //     blocks: [],
    // });
    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    };

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
            setTitle(blogList?.data?.title);
            setBody(blogList?.data?.body);
            setTag(blogList?.data?.tag);
            setBlogImage(blogList?.data?.image);
            setCreatedAt(blogList?.data?.createdAt);

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

    return false; (
        <ProtectedRoute>
            <div className="w-full bg-white rounded-xl p-7 shadow-md">
                <div className="mb-5">
                    <input type="text" value={title} placeholder="Enter Tag"></input>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 shadow-md">
                    <div>
                        <div>
                            <Image src={blogImage} alt='Sort' width={100} height={70} className="w-full" layout="responsive" />
                        </div>
                        <input type="text" value={tag} placeholder="Enter Tag"></input>
                        <input type="text" value={body} placeholder="Enter Tag"></input>
                        <input type="text" value={createdAt} placeholder="Enter Tag"></input>

                        {/* <p dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(body),
                        }}>
                        </p> */}
                    </div>
                </div>

                <div className="flex gap-4 justify-end">
                    <Link href="/Dashboard/ViewBlog" className="bg-gray-400 rounded-[4px] px-4 py-1 text-white">Back</Link>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Page;