"use client"
import React from 'react';
import Image from 'next/image';

const Page = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Card 1 - Revenue */}
                <div className="col-span-1 lg:col-span-1 xl:col-span-1 bg-white rounded-xl">
                    <div className="card shadow-lg border border-gray-300 py-5 px-4">
                        <div className="flex justify-between mb-2">
                            <div>
                                <span className="text-[#636363] font-medium">Revenue</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Image src="/icons/calendar.svg" alt='calendar' width={20} height={10} />
                                <p className="text-[#636363] font-medium">08-01-2023</p>
                            </div>
                        </div>
                        <div className="text-900 font-medium text-xl mb-2">$4800</div>
                        <span className="text-[#4BAF4F] font-medium">$34 from last week</span>
                    </div>
                </div>

                {/* Card 2 - Booking */}
                <div className="col-span-1 lg:col-span-1 xl:col-span-1 bg-white rounded-xl">
                    <div className="card shadow-lg border border-gray-300 py-5 px-4">
                        <div className="flex justify-between mb-2">
                            <div>
                                <span className="text-[#636363] font-medium">Booking</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Image src="/icons/calendar.svg" alt='calendar' width={20} height={10} />
                                <p className="text-[#636363] font-medium">08-01-2023</p>
                            </div>
                        </div>
                        <div className="text-900 font-medium text-xl mb-2">20k</div>
                        <span className="text-[#D12B27] font-medium">2.6% from last week</span>
                    </div>
                </div>

                {/* Card 3 - User Traffic */}
                <div className="col-span-1 lg:col-span-1 xl:col-span-1 bg-white rounded-xl">
                    <div className="card shadow-lg border border-gray-300 py-5 px-4">
                        <div className="flex justify-between mb-2">
                            <div>
                                <span className="text-[#636363] font-medium">User traffic</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Image src="/icons/calendar.svg" alt='calendar' width={20} height={10} />
                                <p className="text-[#636363] font-medium">08-01-2023</p>
                            </div>
                        </div>
                        <div className="text-900 font-medium text-xl mb-2">25k</div>
                        <span className="text-[#4BAF4F] font-medium">3.2% from last week</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
                {/* First Card - Recent Users */}
                <div className="col-span-12 xl:col-span-4">
                    <div className="card bg-white px-4 py-5 rounded-xl">
                        <div className="flex justify-between align-items-center mb-4">
                            <h5 className="font-medium text-lg">Recent Users</h5>
                            <div>
                                <button type="button" className="bg-[#FF6764] border border-[#FF6764] px-4 py-1.5 rounded-lg text-white font-normal">More</button>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Name</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Second Card - Customer Reviews */}
                <div className="col-span-12 xl:col-span-8">
                    <div className="card bg-white px-4 py-5 rounded-xl">
                        <div className="flex justify-between align-items-center mb-4">
                            <h5 className="font-medium text-lg">Customer Reviews</h5>
                            <div>
                                <button type="button" className="bg-[#FF6764] border border-[#FF6764] px-4 py-1.5 rounded-lg text-white font-normal">View More</button>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Name</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;