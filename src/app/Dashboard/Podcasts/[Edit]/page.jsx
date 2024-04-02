"use client";
import React, { useEffect, useRef, useState } from "react";
import ProtectedRoute from "@/component/Protected Route/page";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { toast } from "react-toastify";
import axios from "axios";
import Loading from "@/component/loader/loading";
const EditPodcast = ({ props }) => {
  const router = useRouter();

  const [token, setToken] = useState(null);
  const SearchParams = useSearchParams();
  const PodcastId = SearchParams.get("id");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [formError, setFormError] = useState(null);
  const fileInputRef = useRef(null);
  const [podcastData, setPodcastData] = useState({
    data: null,
    loading: true,
    error: false,
    message: null,
  });

  const [formData, setFormData] = useState(null);
  // console.log("formData", formData);
  // console.log("formError", formError);
  useEffect(() => {
    const item = localStorage.getItem("access_token");
    setToken(item);
  }, []);

  useEffect(() => {
    if (PodcastId && token) {
      getPodcast();
    }
  }, [PodcastId, token]);

  // GET PREVIOUS BLOG DATA
  const getPodcast = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog-and-podcast/findById/${PodcastId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setPodcastData({
          data: null,
          loading: false,
          error: true,
          message: "Failed to fetch data",
        });
      }
      const blogData = await response.json();

      if (blogData.status === "success") {
        setFormData({
          ...formData,
          title: blogData.data.title,
          url: blogData.data.url,
          image_url: blogData.data.image_url,
          raw: null,
        });

        setPodcastData({
          data: blogData,
          loading: false,
          error: false,
          message: null,
        });
      }
    } catch (error) {
      setPodcastData({
        // data: blogData,
        loading: false,
        error: true,
        message: error?.message || "Something went wrong",
      });
    }
  };

  function isValidUrl(str) {
    const pattern = new RegExp(
      "^([a-zA-Z]+:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    );
    return pattern.test(str);
  }

  // UPDATE BLOG API
  async function handleUpdateBlog(e) {
    let titleError = null;
    let urlError = null;
    if (!formData?.title.length) {
      titleError = "Please enter title";
    }
    if (!formData?.url.length) {
      urlError = "Please enter url";
    } else if (!isValidUrl(formData.url)) {
      urlError = "Please enter valid url";
    }

    if (titleError || urlError) {
      setFormError({
        title: titleError,
        url: urlError,
      });
      return;
    }
    setFormError(null);

    setIsSubmitting(true);
    e.preventDefault();

    const formBody = new FormData();
    formBody.append("title", formData.title);
    formBody.append("url", formData.url);
    if (formData.raw) {
      formBody.append("image", formData.raw);
    }

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog-and-podcast/update/${PodcastId}`,
        formBody,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response?.data?.message || "Successfully Updated", {
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
        router.push("/Dashboard/Podcasts");
      }, 1500);
      setIsEditable(false);
    } catch (error) {
      // console.log("error", error);
      toast.error("Not Updated", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setFormData({
      ...formData,
      image_url: URL.createObjectURL(selectedFile),
      raw: selectedFile,
    });
  };

  return (
    <ProtectedRoute>
      <div className="w-full bg-white rounded-xl p-7 shadow-md">
        <div className="mb-5">
          <h5 className="mb-1 font-medium text-2xl">Blog & Podcasts</h5>
          <small className="text-[#C2C2C2]">Edit Podcast</small>
        </div>

        {podcastData.error ? (
          <div className="w-full font-bold">{podcastData.message}</div>
        ) : podcastData.loading ? (
          <div className="w-full">
            <Loading />
          </div>
        ) : (
          <form className="w-full bg-white rounded-xl p-7 shadow-md flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-xl px-2">Title</label>
              <input
                type="text"
                value={formData?.title}
                placeholder="Enter Title"
                className={`border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none ${
                  isEditable ? "" : "cursor-not-allowed"
                }`}
                disabled={!isEditable}
                onChange={(e) =>
                  isEditable &&
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              {formError?.title && (
                <div className="text-danger mt-1">{formError?.title}</div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-xl px-2">
                Blog / Podcast Url
              </label>
              <input
                type="text"
                value={formData?.url}
                placeholder="Enter Blog / Podcast Url"
                className={`border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none ${
                  isEditable ? "" : "cursor-not-allowed"
                }`}
                disabled={!isEditable}
                onChange={(e) =>
                  isEditable &&
                  setFormData({ ...formData, url: e.target.value })
                }
              />
              {formError?.url && (
                <div className="text-danger mt-1">{formError?.url}</div>
              )}
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label className="font-bold text-xl px-2">Logo</label>
              <div onClick={handleImageClick} className="cursor-pointer">
                {formData?.image_url ? (
                  <img
                    src={formData?.image_url}
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
            </div>

            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setIsEditable(true)}
                className="bg-[#FF6764] opacity-[0.8] rounded-[4px] px-4 py-1 text-white w-fit"
                disabled={isEditable}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleUpdateBlog}
                className="bg-[#FF6764] opacity-[0.8] rounded-[4px] px-4 py-1 text-white w-fit"
                disabled={isSubmitting || !isEditable}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
              <Link
                href="/Dashboard/Podcasts"
                className="bg-gray-400 rounded-[4px] px-4 py-1 text-white"
              >
                Back
              </Link>
            </div>
          </form>
        )}
      </div>
    </ProtectedRoute>
  );
};
export default EditPodcast;
