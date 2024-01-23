"use client"
import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/component/Protected Route/page';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Page = () => {
    const router = useRouter();
    const fileInputRef = useRef(null);
    const [token, setToken] = useState(null);
    const [titleName, setTitleName] = useState("");
    const [tag, setTag] = useState([]);
    const [titleError, setTitleError] = useState(false);
    const [tagError, setTagError] = useState(false);
    const [editorContentError, setEditorContentError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState(null);
    const [editorContent, setEditorContent] = useState('');

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setSelectedImage(URL.createObjectURL(selectedFile));
        setImage(selectedFile);
    };

    useEffect(() => {
        const item = localStorage.getItem("access_token");
        setToken(item);
    }, [])

    // CREATE USER API
    async function handleCreateUser(e) {
        e.preventDefault();

        setTitleError(!titleName);
        setTagError(!tag);
        setImageError(!image);
        setEditorContentError(!editorContent);

        if (!titleName || !tag || !image || !editorContent) {
            return;
        }

        const formData = new FormData();
        formData.append("title", titleName);
        formData.append("body", editorContent);
        let newTags = typeof tag === "string" ? [tag] : tag;
        formData.append("tag", JSON.stringify(newTags));
        formData.append("image", image);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/blog`,
                formData,
                {
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
    }

    return (
        <ProtectedRoute>
            {/* Create Blog */}
            <div className="w-full bg-white rounded-xl p-7 shadow-md">
                <div className="mb-5">
                    <h5 className="mb-1 font-medium text-2xl">Create New Blog</h5>
                    <small className="text-[#C2C2C2]">Create Blog</small>
                </div>

                <form className="flex flex-col gap-5">
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Title</label>
                                <input type="text" className="border border-black rounded-[10px] px-4 py-2.5" placeholder="Enter Title" onChange={(e) => setTitleName(e.target.value)} />
                                {titleError && <div className="text-danger text-red-500 mt-1">Title is mandatory</div>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Body</label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={editorContent}
                                    onChange={(event, editor) => setEditorContent(editor.getData())}
                                    className="border border-black rounded-[10px] px-4 py-2.5"
                                />
                                {editorContentError && <div className="text-danger text-red-500 mt-1">Body is mandatory</div>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Tags</label>
                                <input type="text" className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Enter Tags' onChange={(e) => setTag(e.target.value)} />
                                {tagError && <div className="text-danger text-red-500 mt-1">Tags is mandatory</div>}
                            </div>
                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-[#404040] text-md font-medium">Blog Image</label>
                                <div onClick={handleImageClick}>
                                    {selectedImage ? (
                                        <img src={selectedImage} alt="selected" width={120} height={120} className="border border-[#636363] rounded-lg my-3" />
                                    ) : (
                                        <img src="/background.svg" alt="background" width={120} height={120} className="border border-[#636363] px-5 py-2 rounded-lg my-3" />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    className="border border-black rounded-[10px] px-4 py-2.5"
                                />
                                {imageError && <div className="text-danger text-red-500 mt-1">Blog Image is mandatory</div>}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start items-center">
                        <button type="Submit" onClick={handleCreateUser} className="bg-[#FF6764] border border-red-400 py-2.5 text-white font-medium my-4 rounded-[4px] w-1/5">Save</button>
                    </div>
                </form>
            </div>
        </ProtectedRoute>
    );
};

export default Page; 