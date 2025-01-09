"use client";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/component/Protected Route/page";
import { Pagination } from "@nextui-org/react";
import Loading from "@/component/loader/loading";
import Image from "next/image";
import { toast } from "react-toastify";

const Page = () => {
  const [token, setToken] = useState(null);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [allNewsletters, setAllNewsletters] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const totalPages = allNewsletters.length ? Math.ceil(allNewsletters.length / itemsPerPage) : 0;
  const [loading, setLoading] = useState(true);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const item = localStorage.getItem("access_token");
    setToken(item);
  }, []);

  const fetchNewsletters = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribe`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch list");
      }
      const data = await response.json();

      if (data.status === "success") {
        setAllNewsletters(data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    token && fetchNewsletters();
  }, [token]);

  useEffect(() => {
    const filtered_newsletters = [...allNewsletters].splice(currentPage - 1, itemsPerPage);
    setNewsletters(filtered_newsletters);
  }, [allNewsletters, currentPage]);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <ProtectedRoute>
      <h5 className="text-2xl font-medium">Newsletters</h5>
      <div className="overflow-y-auto max-h-screen shadow-lg">
        <table className="w-full table-auto">
          <thead className="font-semibold text-sm">
            <tr>
              <th className="p-8 text-start bg-[#F7F7F7] rounded-ss-lg">ID</th>
              <th className="py-8 text-start bg-[#F7F7F7]">Email</th>
              <th className="py-8 px-3 text-start bg-[#F7F7F7]">Date</th>
              <th className="py-8 px-5 text-start bg-[#F7F7F7] rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {(() => {
              if (loading) {
                return (
                  <tr>
                    <td colSpan="12" className="border-b-2 border-[#C2C2C2] text-center py-5">
                      <div className="p-4">
                        <Loading />
                      </div>
                    </td>
                  </tr>
                );
              } else if (newsletters.length === 0) {
                return (
                  <tr>
                    <td colSpan="12" className="border-b-2 border-[#C2C2C2] text-center py-5">
                      Records not found...
                    </td>
                  </tr>
                );
              }

              return newsletters.map((i) => (
                <React.Fragment key={i.id}>
                  <tr>
                    <td className="text-start px-8 py-6">{i.id}</td>
                    <td className="text-start">{i.subscribeBy}</td>
                    <td className="text-start">{formatDate(i.createdAt)}</td>
                    <td className="pl-3">
                      <DeleteRecord data={i} token={token} refreshAction={fetchNewsletters} />
                    </td>
                  </tr>
                </React.Fragment>
              ));
            })()}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-5">
        <Pagination showControls total={totalPages} initialPage={currentPage} onChange={handlePageChange} />
      </div>
    </ProtectedRoute>
  );
};

const DeleteRecord = ({ data, refreshAction, token }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleModalOpen = (data) => {
    setIsOpen(true);
  };
  // DELETE API
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribe/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      setIsOpen(false);
      refreshAction();
      toast.success("Successfully Deleted", {
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
      console.log("error", error);
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
    <>
      <div className="cursor-pointer">
        <Image src="/icons/trash.svg" alt="Trash" width={20} height={20} onClick={() => handleModalOpen(data.id)} />
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <div className="flex flex-col bg-white rounded-lg p-5 gap-4">
            <p>Id : {data.id}</p>
            <p>You want to delete this newsletter subscription</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => handleDelete(data.id)} className="bg-[#FF6764] opacity-[0.8] rounded-[4px] px-4 py-1 text-white w-fit">
                Delete
              </button>
              <button onClick={() => setIsOpen(false)} className="bg-gray-400 rounded-[4px] px-4 py-1 text-white">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Page;
