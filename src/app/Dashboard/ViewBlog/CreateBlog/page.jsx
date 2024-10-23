"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/component/Protected Route/page";
import Link from "next/link";
import dynamic from "next/dynamic";
import EditorContainer from "@/component/Editor/EditorContainer";

const Editor = dynamic(() => import("../../../../component/Editor/page"), {
  ssr: false,
});

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
  const [editorContent, setEditorContent] = useState("");
  const [data, setData] = useState({});
  const [tags, setTags] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isEditorLoading, setIsEditorLoading] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleAddTag = () => {
    if (tag) {
      setTags((prevTags) => [...prevTags, tag]);
      setTag("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setSelectedImage(URL.createObjectURL(selectedFile));
    setImage(selectedFile);
  };

  const editorConfig = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "|",
      "bulletedList",
      "numberedList",
      "|",
      "undo",
      "redo",
    ],
    removeButtons:
      "Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe",
    removePlugins: "image,uploadimage,mediaembed",
  };

  useEffect(() => {
    const item = localStorage.getItem("access_token");
    setToken(item);
  }, []);

  // CREATE USER API
  async function handleCreateUser(e) {
    e.preventDefault();

    setTitleError(!titleName);
    setTagError(!tags.length);
    setImageError(!image);
    setEditorContentError(!data);

    if (!titleName || !tags.length || !image || !editorContent) {
      return;
    }

    const formData = new FormData();
    formData.append("title", titleName);
    formData.append("body", editorContent);
    formData.append("tag", JSON.stringify(tags));
    formData.append("image", image);

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/blog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Successfully Created", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push("/Dashboard/ViewBlog");
        // setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast.error("Blog Already Exists", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsLoading(false);
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
                <label className="text-[#404040] text-md font-medium">
                  Title
                </label>
                <input
                  type="text"
                  className="border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Enter Title"
                  onChange={(e) => setTitleName(e.target.value)}
                />
                {titleError && (
                  <div className="text-danger text-red-500 mt-1">
                    Title is mandatory
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Content
                </label>
                {/* <Editor
                  data={data.body}
                  onChangeEditor={setEditorContent}
                  config={editorConfig}
                /> */}
                <EditorContainer
                  value={editorContent}
                  onChange={(newValue) => {
                    setEditorContent(newValue);
                  }}
                  setIsEditorLoading={setIsEditorLoading}
                  // isEditorLoading={isEditorLoading}
                />
                {editorContentError && (
                  <div className="text-danger text-red-500 mt-1">
                    Content is mandatory
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#404040] text-md font-medium">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-200 rounded-full py-1 px-4"
                        title="Click to remove"
                      >
                        <span className="mr-2">{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(index)}
                          className="text-gray-600 font-semibold"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Tag"
                    className="border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                    title="Fill in a tag and press Enter to add"
                  />
                  <small className="text-gray-400 font-medium">
                    Fill in a tag and press Enter to add
                  </small>
                  {tagError && (
                    <div className="text-danger text-red-500">
                      Tags is mandatory
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-[#404040] text-md font-medium">
                  Blog Image
                </label>
                <div onClick={handleImageClick}>
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="selected"
                      width={120}
                      height={120}
                      className="border border-[#636363] rounded-lg my-3"
                    />
                  ) : (
                    <img
                      src="/background.svg"
                      alt="background"
                      width={120}
                      height={120}
                      className="border border-[#636363] px-5 py-2 rounded-lg my-3"
                    />
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  className="border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                />
                {imageError && (
                  <div className="text-danger text-red-500 mt-1">
                    Blog Image is mandatory
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-3">
            <button
              type="Submit"
              onClick={handleCreateUser}
              className="bg-[#FF6764] border border-red-400 px-4 py-1 text-white font-medium my-4 rounded-[4px] disabled:opacity-[0.8] disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <Link
              href="/Dashboard/ViewBlog"
              className="bg-gray-400 rounded-[4px] px-4 py-1 text-white"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
