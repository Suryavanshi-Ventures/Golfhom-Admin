"use client"
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/component/Protected Route/page";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import axios from "axios";

const Editor = dynamic(() => import("../../../../component/Editor/page"), {
    ssr: false,
});

const Page = () => {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const SearchParams = useSearchParams();
    const BlogId = SearchParams.get("id");
    const [blogList, setBlogList] = useState([]);
    const [title, setTitle] = useState(null);
    const [body, setBody] = useState(null);
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState(null);
    const [blogImage, setBlogImage] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [editorContent, setEditorContent] = useState('');
    const [data, setData] = useState({});

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    const handleTagChange = (e) => {
        const tagValue = e.target.value;
        setTag(tagValue);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleAddTag = () => {
        if (tag) {
            setTags((prevTags) => [...prevTags, tag]);
            setTag('');
        }
    };

    const handleRemoveTag = (index) => {
        setTags((prevTags) => prevTags.filter((_, i) => i !== index));
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
        setEditorContent(JSON.stringify(data));
    }, [data]);

    useEffect(() => {
        if (blogList && blogList?.data) {
            setTitle(blogList?.data?.title);
            setBody(blogList?.data?.body);
            setTags(blogList?.data?.tag);
            setBlogImage(blogList?.data?.image);
            setCreatedAt(blogList?.data?.createdAt);
        }
    }, [blogList]);

    // GET PREVIOUS BLOG DATA
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
            if (blogData.status === "success") {
                setBlogList(blogData);
            }
        } catch (error) {
            console.log("error message", error)
        }
    };

    // UPDATE BLOG API
    async function handleUpdateBlog(e) {
        setIsSubmitting(true);
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", editorContent);
        formData.append("tag", JSON.stringify(tags));
        formData.append("image", blogImage);
        formData.append("createdAt", createdAt);
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/blog/${blogList.data.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Successfully Submitted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => { router.push('/Dashboard/ViewBlog') }, 1500);
            setIsEditable(false);
        } catch (error) {
            toast.error('Data Already Exists', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log("error", error)
        }
        finally {
            setIsSubmitting(false);
        }
    }

    return (
        <ProtectedRoute>
            <form className="w-full bg-white rounded-xl p-7 shadow-md flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="font-bold text-xl px-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        placeholder="Enter Title"
                        className={`border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none ${isEditable ? '' : 'cursor-not-allowed'}`}
                        disabled={!isEditable}
                        onChange={(e) => isEditable && setTitle(e.target.value)}
                    />
                </div>

                <div>
                    {blogImage && <Image src={blogImage} alt='Sort' width={100} height={70} className="w-full text-md font-medium p-2 rounded-[4px]" layout="responsive" />}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-bold text-xl px-2">Tag Name</label>
                    <div className="flex gap-2 mt-2">
                        {tags.map((tagItem, index) => (
                            <div key={index} className="flex items-center bg-gray-200 rounded-full py-1 px-4">
                                <span className="mr-2">{tagItem}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(index)}
                                    className="text-gray-600 font-semibold text-sm"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 items-center">
                        <input
                            type="text"
                            value={tag}
                            placeholder="Enter Tag"
                            className={`w-full border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none ${isEditable ? '' : 'cursor-not-allowed'}`}
                            disabled={!isEditable}
                            onChange={handleTagChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-bold text-xl px-2">Blog Content</label>
                    <Editor data={body} onChangeEditor={setEditorContent} disabled={!isEditable} />
                </div>

                <div className="flex gap-2">
                    <h5 className="font-medium">Created at:</h5>
                    {/* <input
                        type="text"
                        value={formatDate(createdAt)}
                        placeholder="Enter Created At"
                        className={`text-[#FF6764] ${isEditable ? '' : 'cursor-not-allowed'}`}
                        disabled={!isEditable}
                    /> */}
                    <p className="text-[#FF6764]">{formatDate(createdAt)}</p>
                </div>

                <div className="flex gap-4 justify-end">
                    <button
                        onClick={() => setIsEditable(true)}
                        className="bg-[#FF6764] rounded-[4px] px-4 py-1 text-white w-fit"
                        disabled={isEditable}
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleUpdateBlog}
                        className="bg-[#FF6764] rounded-[4px] px-4 py-1 text-white w-fit"
                        disabled={isSubmitting || !isEditable}
                    >
                        {isSubmitting ? "Updating..." : "Update"}
                    </button>
                    <Link
                        href="/Dashboard/ViewBlog"
                        className="bg-gray-400 rounded-[4px] px-4 py-1 text-white"
                    >
                        Back
                    </Link>
                </div>
            </form>
        </ProtectedRoute>
    );
};

export default Page;