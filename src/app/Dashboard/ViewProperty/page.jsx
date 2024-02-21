"use client";
import ProtectedRoute from "@/component/Protected Route/page";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Pagination } from "@nextui-org/react";
import Link from "next/link";

const Page = () => {
  const [propertyList, setPropertyList] = useState([]);
  const [token, setToken] = useState(null);
  const [totalPropertyCount, setTotalPropertyCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertyName, setPropertyName] = useState("");
  const [noPropertiesMessage, setNoPropertiesMessage] = useState("");
  // const [userToDelete, setUserToDelete] = useState(null);
  // const [deleteOpen, setDeleteOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState("All");
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalPropertyCount / itemsPerPage);
  const [totalDraftProperties, setTotalDraftProperties] = useState(0);
  const [totalActiveProperties, setTotalActiveProperties] = useState(0);
  const [totalInactiveProperties, setTotalInactiveProperties] = useState(0);
  const [searchCriteria, setSearchCriteria] = useState("propertyName");

  const handleStatusClick = (status) => {
    setActiveStatus(status);
    listProperty(status);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const CustomImage = ({ data, ind }) => {
    const [error, setError] = useState(false);

    return (
      <Image
        key={`${data.id}-${ind}`}
        blurDataURL={
          "data:image/png;base64,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"
        }
        placeholder="blur"
        src={error ? "/noImageFound.png" : data.imageUrl}
        quality={50}
        alt={`image ${data.id}-${ind}`}
        width={260}
        height={170}
        className="w-full h-52 object-cover mb-4 rounded-t-lg"
        priority={ind === 0 ? true : false}
        onError={() => {
          setError(true);
        }}
      ></Image>
    );
  };

  // const handleModalOpen = (data) => {
  //     setUserToDelete(data);
  //     setDeleteOpen(true);
  // }

  // const handleCancelDelete = () => {
  //     setDeleteOpen(false);
  // };

  useEffect(() => {
    const item = localStorage.getItem("access_token");
    setToken(item);
  }, []);

  useEffect(() => {
    if (token) {
      listProperty(activeStatus);
    }
  }, [token, currentPage, propertyName, activeStatus]);

  // LIST API
  const listProperty = async (status) => {
    const statusQueryParam = status !== "All" ? `&status=${status}` : "";

    const queryParams = {
      limit: itemsPerPage,
      page: currentPage,
      sort: "createdAt",
      sortBy: "DESC",
      ...(searchCriteria === "propertyName" &&
        propertyName.length && {
          searchQuery: propertyName,
        }),
      ...(searchCriteria === "ownerName" &&
        propertyName.length && { ownerName: propertyName }),
      ...(status !== "All" && { status: status }),
    };
    const urlSearchParams = new URLSearchParams(queryParams);
    const queryParamsString = urlSearchParams.toString();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/property?${queryParamsString}`,
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
      const viewPropertyData = await response.json();
      if (viewPropertyData.status === "success") {
        const sortedProperties = viewPropertyData.data;
        setPropertyList(sortedProperties);
        setTotalPropertyCount(viewPropertyData.count);
        // setTotalDraftProperties(viewPropertyData.totalDraftCount);
        // setTotalActiveProperties(viewPropertyData.totalActiveCount);
        // setTotalInactiveProperties(viewPropertyData.totalInactiveCount);

        if (sortedProperties.length === 0) {
          setNoPropertiesMessage("No properties found with the given name...");
        } else {
          setNoPropertiesMessage("");
        }
      } else {
        setNoPropertiesMessage("Error fetching properties.");
      }
    } catch (error) {}
  };

  // DELETE API
  // const handleDeleteProperty = async (propertyData) => {
  //     try {
  //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property/${propertyData}`,
  //             {
  //                 method: "DELETE",
  //                 headers: {
  //                     "Content-Type": "application/json",
  //                     Authorization: `Bearer ${token}`,
  //                 },
  //             }
  //         );
  //         const responseData = await response.json();
  //         setViewListUsers((prevPropertyList) => prevPropertyList.filter(property => property.id !== propertyData));
  //         setDeleteViewListProperty(responseData);
  //         setDeleteOpen(false);
  //         setTimeout(() => { setDeleteOpen(false); }, 10000);
  //     } catch (error) {
  //     }
  // };

  return (
    <ProtectedRoute>
      <div className="flex justify-between">
        <h2 className="font-medium text-2xl">Properties</h2>
      </div>
      <div className="flex xl:items-center flex-col xl:flex-row justify-start xl:justify-between xl:align-middle gap-3 xl-gap-0">
        <h5>
          {activeStatus === "All" ? "Total" : activeStatus} Properties:{" "}
          <span className="text-gray-500 font-medium">
            {totalPropertyCount}
          </span>
        </h5>
        <div className="flex justify-start xl:justify-end gap-3">
          <div>
            <label htmlFor="searchBy">Search by:</label>
            <select
              className="ml-2 w-50 h-12 border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#9c9c8a] focus:ring-[#9c9c8a] focus:border-[#9c9c8a] transition-all border-transparent outline-none"
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
            >
              <option value="ownerName">Owner Name</option>
              <option value="propertyName">Property Name</option>
            </select>
          </div>
          {/* Add search by option for owner name and property name */}
          <div className="flex md:flex-row gap-4 items-center">
            <div className=" flex  md:justify-start mr-5 items-center">
              <input
                className="w-80 h-12 border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                placeholder="Search for property by name"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 -ml-[45px] text-[#FF6764]"
                onClick={listProperty}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* {activeStatus === 'All' && ( */}

        {/* )} */}
        {/* {activeStatus === 'Draft' && (
                    <h5>Draft Properties: <span className="text-gray-500 font-medium">{totalPropertyCount}</span></h5>
                )}
                {activeStatus === 'Active' && (
                    <h5>Active Properties: <span className="text-gray-500 font-medium">{totalPropertyCount}</span></h5>
                )}
                {activeStatus === 'Inactive' && (
                    <h5>Inactive Properties: <span className="text-gray-500 font-medium">{totalPropertyCount}</span></h5>
                )} */}
      </div>
      <div className="bg-white py-3 px-4 flex gap-8 items-center rounded-md">
        <div>
          <h4
            onClick={() => handleStatusClick("All")}
            className={`${
              activeStatus === "All"
                ? "bg-[#FF6764] opacity-[0.8] border border-[#FF6764] text-white"
                : "bg-white text-black"
            } cursor-pointer px-3 py-1 w-24 text-center rounded-md font-normal`}
          >
            All
          </h4>
        </div>
        <div>
          <h4
            onClick={() => handleStatusClick("Draft")}
            className={`${
              activeStatus === "Draft"
                ? "bg-[#FF6764] opacity-[0.8] border border-[#FF6764] text-white"
                : "bg-white text-black"
            } cursor-pointer px-3 py-1 w-24 text-center rounded-md font-normal`}
          >
            Draft
          </h4>
        </div>
        <div>
          <h4
            onClick={() => handleStatusClick("Active")}
            className={`${
              activeStatus === "Active"
                ? "bg-[#FF6764] opacity-[0.8] border border-[#FF6764] text-white"
                : "bg-white text-black"
            } cursor-pointer px-3 py-1 w-24 text-center rounded-md font-normal`}
          >
            Active
          </h4>
        </div>
        <div>
          <h4
            onClick={() => handleStatusClick("Inactive")}
            className={`${
              activeStatus === "Inactive"
                ? "bg-[#FF6764] opacity-[0.8] border border-[#FF6764] text-white"
                : "bg-white text-black"
            } cursor-pointer px-3 py-1 w-24 text-center rounded-md font-normal`}
          >
            Inactive
          </h4>
        </div>
      </div>
      {noPropertiesMessage && (
        <div className="flex justify-center">
          <p className="text-[#FF6764] mt-5 bg-white rounded-lg py-5 px-10 w-fit">
            {noPropertiesMessage}
          </p>
        </div>
      )}
      {/* {deleteOpen && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-5 flex flex-col items-center justify-center z-50">
                    <div className="flex flex-col bg-white rounded-lg p-5 gap-4 z-50">
                        <p>Property Id : {userToDelete}</p>
                        <p>You want to delete this property</p>
                        <div className="flex gap-4 justify-center">
                            <button onClick={() => handleDeleteProperty(userToDelete)} className="bg-[#FF6764] opacity-[0.8] rounded-full px-4 py-1 text-white w-fit">Delete</button>
                            <button onClick={handleCancelDelete} className="bg-gray-400 rounded-full px-4 py-1 text-white">Cancel</button>
                        </div>
                    </div>
                </div>
            )} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {propertyList?.map((data, inx) => (
          <div
            key={data.id}
            className="flex flex-col justify-between flex-shrink-0 flex-grow-0 w-full bg-white rounded-lg shadow-md"
          >
            <div>
              <div className="w-full">
                <CustomImage data={data} inx={inx} />
              </div>
              <div className="flex flex-wrap justify-between mx-4 my-1">
                <h4 className="font-semibold text-base">{data.name}</h4>
              </div>
              {/* <div className="flex justify-end px-4">
                        </div> */}
              <div className="flex flex-col px-4">
                <small className="font-normal">{data.bedrooms} Bedroom</small>
                <small className="font-normal">{data.bathrooms} Bathroom</small>
              </div>
            </div>
            <div className="flex justify-between p-4 gap-6">
              <button className="bg-[#4BAF4F] text-white rounded-lg px-3 py-1">
                ${data.price}
              </button>
              <Link
                href={{
                  pathname: `${process.env.NEXT_PUBLIC_WEB_URL}/search/${data.slug}`,
                }}
                target="_blank"
                className="bg-[#FF6764] opacity-[0.8] text-white border border-[#FF6764] rounded-md py-1 w-24 text-center"
              >
                Preview
              </Link>
              <Link
                href={{
                  pathname: "/Dashboard/ViewProperty/UpdateProperty",
                  query: { id: data.id },
                }}
                className="bg-[#FF6764] opacity-[0.8] text-white border border-[#FF6764] rounded-md py-1 w-24 text-center"
              >
                Update
              </Link>
              {/* <button onClick={() => handleModalOpen(data.id)} className="bg-black text-white border border-black rounded-md py-1 w-24">Delete</button> */}
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
    </ProtectedRoute>
  );
};

export default Page;
