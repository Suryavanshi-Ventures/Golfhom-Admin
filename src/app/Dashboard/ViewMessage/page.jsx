"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [token, setToken] = useState(null);
    const [messageList, setMessageList] = useState([]);
    const [expandedMessages, setExpandedMessages] = useState([]);

    const handleToggleReadMore = (messageId) => {
        setExpandedMessages((prev) => {
            if (prev.includes(messageId)) {
                return prev.filter((id) => id !== messageId);
            } else {
                return [...prev, messageId];
            }
        });
    };

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    useEffect(() => {
        const item = localStorage.getItem("access_token");
        setToken(item);
    }, [])

    useEffect(() => {
        if (token) {
            listMessage();
        }
    }, [token]);

    // LIST API
    const listMessage = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contactUs`,
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
            const messageData = await response.json();
            console.log("messageData", messageData)
            if (messageData.status === "success") {
                setMessageList(messageData.data);
            }

        } catch (error) {
            console.log("error message", error)
        }
    };

    // DELETE API
    const handleDeleteMessage = async (messageData) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contactUs/${messageData}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const responseData = await response.json();
            setViewMessage((prevMessageList) => prevMessageList.filter(message => message.id !== messageData));
            setViewListMessage(responseData);
            setDeleteOpen(false);
            setTimeout(() => { setDeleteOpen(false); }, 10000);
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {messageList?.map((data, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-xl">
                        <h4 className="border-b-2 px-5 py-4"><span className="font-medium mr-1">Message Sender Name:</span> {data.name}</h4>
                        <h4 className="border-b-2 px-5 py-4"><span className="font-medium mr-1">Subject:</span> {data.subject}</h4>
                        <div className="px-5 py-4">
                            <p className={expandedMessages.includes(data.id) ? '' : 'line-clamp-1'}>
                                <span className="font-medium mr-1">Message:</span> {data.message}
                            </p>
                            {data.message.length > 50 && (
                                <span className="text-[#FF6764] cursor-pointer" onClick={() => handleToggleReadMore(data.id)}>
                                    {expandedMessages.includes(data.id) ? ' Read less' : ' Read more'}
                                </span>
                            )}
                        </div>

                        <h4 className="border-y-2 px-5 py-4"><span className="font-medium mr-1">Email:</span> {data.email}</h4>
                        <div className="flex justify-between px-5 py-4">
                            <p className="text-[#FF6764]"><span className="font-medium mr-1">Received on:</span> {formatDate(data.updatedAt)}</p>
                            <Image src="/icons/Delete.svg" alt='Delete' width={20} height={20} onClick={() => handleDeleteMessage(data.id)} className="cursor-pointer" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Page;