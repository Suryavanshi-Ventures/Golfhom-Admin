"use client";
import Image from "next/image";
import ProtectedRoute from "@/component/Protected Route/page";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import { Pagination } from "@nextui-org/react";
import Loading from "@/component/loader/loading";
import ButtonWithLoader from "@/component/Buttons/ButtonWithLoader";

const Page = () => {
  const [token, setToken] = useState(null);
  const [blogList, setBlogList] = useState({
    data: [],
    loading: true,
    error: false,
  });
  const [totalBlogCount, setTotalBlogCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalBlogCount / itemsPerPage);

  const [deleteLoader, setDeleteLoader] = useState(false);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const handleModalOpen = (data) => {
    setBlogToDelete(data);
    setDeleteOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteOpen(false);
  };

  useEffect(() => {
    const item = localStorage.getItem("access_token");
    setToken(item);
  }, []);

  useEffect(() => {
    if (token) {
      listBlog();
    }
  }, [currentPage, token]);

  // LIST API
  const listBlog = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog-and-podcast/find?limit=${itemsPerPage}&page=${currentPage}`,
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
        setBlogList({
          ...blogList,
          data: blogData.data,
          loading: false,
          error: false,
        });
        setTotalBlogCount(blogData.count);
      }
    } catch (error) {}
  };

  // DELETE API
  const handleDeleteBlog = async (blogId) => {
    setDeleteLoader(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog-and-podcast/delete/${blogId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      const res_data = await response.json();

      listBlog();
      setDeleteOpen(false);
      setDeleteLoader(false);
      toast.success(res_data.message || "Successfully Deleted", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Not Deleted", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex justify-between">
        <h4 className="text-2xl font-medium">Blog & Podcasts</h4>
        <Link
          href="/Dashboard/Podcasts/Create"
          className="bg-[#FF6764] opacity-[0.8] border border-[#FF6764] px-4 py-1.5 rounded-lg text-white font-normal"
        >
          Create Blogs & Podcast
        </Link>
      </div>
      {deleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
          <div className="flex flex-col bg-white rounded-lg p-5 gap-4 z-50">
            {/* <p>Blog Id : {blogToDelete}</p> */}
            <div className="text-center">
              <div className="text-lg font-bold">Are you sure ?</div>
              <div>You want to delete this podcast ?</div>
            </div>
            <div className="flex gap-4 justify-center">
              <ButtonWithLoader
                loader={deleteLoader}
                onClick={() => handleDeleteBlog(blogToDelete)}
              >
                Delete
              </ButtonWithLoader>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-400 rounded-[4px] px-4 py-1 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {blogList.loading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {blogList.data?.map((data) => (
              <div
                key={data.id}
                className="flex flex-col gap-3 justify-between p-4 bg-white rounded-lg border border-[#C2C2C2] shadow-md"
              >
                <Link
                  href={{
                    pathname: `/Dashboard/Podcasts/edit`,
                    query: { id: data.id },
                  }}
                  className="w-full"
                >
                  <Image
                    src={data.image_url ?? "/noImageFound.png"}
                    alt="Sort"
                    width={100}
                    height={70}
                    className="w-full h-40 object-cover"
                    layout="responsive"
                  />
                </Link>
                <div className="flex flex-col gap-1">
                  <h4 className="text-lg font-medium">{data.title}</h4>
                  <div className="flex flex-col">
                    <Link
                      href={data.url}
                      target="_blank"
                      className="text-[#FF6764] font-medium"
                    >
                      Read More
                    </Link>
                  </div>
                  <div className="flex justify-between pt-2">
                    <h3>
                      <span className="font-medium">Created at:</span>{" "}
                      {formatDate(data.createdAt)}
                    </h3>
                    <div className="flex gap-2">
                      <Image
                        src="/icons/Delete.svg"
                        alt="Delete"
                        width={20}
                        height={20}
                        onClick={() => handleModalOpen(data.id)}
                        className="cursor-pointer"
                      />

                      {/* <Image
                        src="/icons/edit.svg"
                        alt="Delete"
                        width={16}
                        height={16}
                        onClick={() => handleModalOpen(data.id)}
                        className="cursor-pointer"
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <Pagination
              showControls
              total={totalPages}
              initialPage={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </ProtectedRoute>
  );
};

export default Page;
