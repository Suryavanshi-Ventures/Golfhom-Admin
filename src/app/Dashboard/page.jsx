"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

const Page = () => {
    const [token, setToken] = useState(null);
    const [viewListUsers, setViewListUsers] = useState([]);
    const [propertyList, setPropertyList] = useState([]);
    const [propertyListData, setPropertyListData] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        const item = localStorage.getItem("access_token");
        setToken(item);
    }, [])

    useEffect(() => {
        if (token) {
            listUsers();
            listProperty();
            listMessage();
        }
    }, [token]);

    useEffect(() => {
        if (token && messageList.length > 0) {
            setSelectedMessage(messageList[0]);
        }
    }, [token, messageList]);

    // LIST USERS API
    const listUsers = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`,
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
            const viewUsersDataDashboard = await response.json();
            console.log("viewUsersDataDashboard", viewUsersDataDashboard)
            if (viewUsersDataDashboard.status === "success") {
                const sortedUsers = viewUsersDataDashboard.data.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setViewListUsers(sortedUsers);
            }

        } catch (error) {
            console.log("error message", error)
        }
    };

    // LIST PROPERTY API
    const listProperty = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property`,
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
            console.log("viewPropertyData", viewPropertyData)
            if (viewPropertyData.status === "success") {
                setPropertyList(viewPropertyData.count);
                setPropertyListData(viewPropertyData.data);
            }

        } catch (error) {
            console.log("error message", error)
        }
    };

    // LIST MESSAGE API
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
                const sortedMessages = messageData.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                setMessageList(sortedMessages);
            }

        } catch (error) {
            console.log("error message", error)
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <h5 className="text-2xl font-medium">Dashboard</h5>
            {/* COUNT */}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Card 1 - Revenue */}
                <div className="col-span-1 lg:col-span-1 xl:col-span-1 bg-white shadow-md rounded-xl">
                    <div className="py-5 px-4 text-center">
                        {/* <div className="flex justify-between mb-2">
                            <div>
                                <span className="text-[#636363] font-medium">Revenue</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Image src="/icons/calendar.svg" alt='calendar' width={20} height={10} />
                                <p className="text-[#636363] font-medium">08-01-2023</p>
                            </div>
                        </div>
                        <div className="text-900 font-medium text-xl mb-2">$4800</div>
                        <span className="text-[#4BAF4F] font-medium">$34 from last week</span> */}
                        <div>
                            <small>Total number of users</small>
                            <div className="text-900 font-medium text-xl mb-2">{viewListUsers.length}</div>
                        </div>
                    </div>
                </div>

                {/* Card 2 - Booking */}
                <div className="col-span-1 lg:col-span-1 xl:col-span-1 bg-white shadow-md rounded-xl">
                    <div className="py-5 px-4 text-center">
                        {/* <div className="flex justify-between mb-2">
                            <div>
                                <span className="text-[#636363] font-medium">Booking</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Image src="/icons/calendar.svg" alt='calendar' width={20} height={10} />
                                <p className="text-[#636363] font-medium">08-01-2023</p>
                            </div>
                        </div>
                        <div className="text-900 font-medium text-xl mb-2">20k</div>
                        <span className="text-[#D12B27] font-medium">2.6% from last week</span> */}
                        <div>
                            <small>Total number of bookings</small>
                            <div className="text-900 font-medium text-xl mb-2">0</div>
                        </div>
                    </div>
                </div>

                {/* Card 3 - User Traffic */}
                <div className="col-span-1 lg:col-span-1 xl:col-span-1 bg-white shadow-md rounded-xl">
                    <div className="py-5 px-4 text-center">
                        {/* <div className="flex justify-between mb-2">
                            <div>
                                <span className="text-[#636363] font-medium">User traffic</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Image src="/icons/calendar.svg" alt='calendar' width={20} height={10} />
                                <p className="text-[#636363] font-medium">08-01-2023</p>
                            </div>
                        </div>
                        <div className="text-900 font-medium text-xl mb-2">25k</div>
                        <span className="text-[#4BAF4F] font-medium">3.2% from last week</span> */}
                        <div>
                            <small>Total number of properties</small>
                            <div className="text-900 font-medium text-xl mb-2">{propertyList}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RECENT PROPERTY POSTS */}
            <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <h4 className="font-medium text-lg">Recent Property Posts</h4>
                    <div>
                        <Link href="/Dashboard/ViewProperty" type="button" className="bg-[#FF6764] border border-[#FF6764] px-4 py-1.5 rounded-lg text-white font-normal">View More</Link>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    {propertyListData.slice(0, 5).map((data, index) => (
                        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" style={{ height: '300px' }}>
                            <div className="flex flex-col h-[270px] w-52 relative bg-cover bg-center rounded-lg justify-end"
                                style={{ backgroundImage: `url(${data.imageUrl})` }}
                            >
                                <div className="flex flex-col gap-1 text-white bg-gray bg-opacity-50 p-4 rounded-b-lg backdrop-blur-sm">
                                    <h4 className="font-semibold text-base">{data.name.substring(0, 16) + (data.name.length > 16 ? '...' : '')}</h4>
                                    <div className="flex flex-row justify-between items-center">
                                        <small className="font-semibold">{data.ownerName}</small>
                                        <small className="bg-[#4BAF4F] text-white rounded-lg px-2 py-1">${data.price}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RECENT MESSAGES USER */}
            <div className="grid grid-cols-12 gap-4">
                {/* First Card - Recent Users */}
                <div className="col-span-12 xl:col-span-4">
                    <div className="card bg-white px-4 py-5 rounded-xl">
                        <div className="flex justify-between align-items-center mb-4">
                            <h5 className="font-medium text-lg">Recent Users</h5>
                            <Link href="/Dashboard/ViewUsers">
                                <button type="button" className="bg-[#FF6764] border border-[#FF6764] px-4 py-1.5 rounded-lg text-white font-normal">More</button>
                            </Link>
                        </div>
                        <div>
                            {viewListUsers.slice(0, 5).map((data) => (
                                <div className="flex items-center">
                                    <Image src="/icons/avatar.svg" alt='Profile' width={60} height={60} className='rounded-full' />
                                    <div className="flex flex-col">
                                        <h4 className="font-medium">{data.firstName}{data.lastName}</h4>
                                        <small className="text-[#FF6764]">{data.email}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Second Card - Recent Messages */}
                <div className="col-span-12 xl:col-span-8">
                    <div className="card bg-white px-4 py-5 rounded-xl">
                        <div className="flex justify-between align-items-center mb-4">
                            <h5 className="font-medium text-lg">Recent Messages</h5>
                            <Link href="/Dashboard/ViewMessage">
                                <button type="button" className="bg-[#FF6764] border border-[#FF6764] px-4 py-1.5 rounded-lg text-white font-normal">View More</button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-6 gap-5">
                            <div className="col-span-6 xl:col-span-2">
                                {messageList?.slice(0, 5).map((data, index) => (
                                    <div
                                        key={index}
                                        className={`mb-4 cursor-pointer ${selectedMessage === data ? 'bg-[#FF6764] text-white rounded-lg py-2' : ''
                                            }`}
                                        onClick={() => setSelectedMessage(data)}
                                    >
                                        <div className="flex flex-col ml-3">
                                            <h4 className="font-medium">{data.name}</h4>
                                            <small className={`font-medium ${selectedMessage === data ? 'text-white' : 'text-[#FF6764]'
                                                }`}>{formatDistanceToNow(new Date(data.updatedAt), { addSuffix: true })}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="col-span-6 xl:col-span-4">
                                {selectedMessage && (
                                    <div className="mt-4">
                                        <h4 className="font-medium text-lg">{selectedMessage.subject}</h4>
                                        <p className="font-normal text-base">{selectedMessage.message}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;