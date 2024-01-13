"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Page = () => {
    return (
        <div className="grid">
            <div className="col-12 lg:col-12 xl:col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Revenue</span>
                            <div className="text-900 font-medium text-xl">$4800</div>
                        </div>
                        <div className="flex gap-2">
                            <Image src="/calendar.svg" alt='calender' width={20} height={20} />
                            <p className="block text-500 font-medium mb-3">08-01-2023</p>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">$34 from last week</span>
                </div>
            </div>
            <div className="col-12 lg:col-12 xl:col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Booking</span>
                            <div className="text-900 font-medium text-xl">20k</div>
                        </div>
                        <div className="flex gap-2">
                            <Image src="/calendar.svg" alt='calender' width={20} height={20} />
                            <p className="block text-500 font-medium mb-3">08-01-2023</p>
                        </div>
                    </div>
                    <span className="text-red-500 font-medium">2.6% from last week</span>
                </div>
            </div>
            <div className="col-12 lg:col-12 xl:col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">User traffic</span>
                            <div className="text-900 font-medium text-xl">25k</div>
                        </div>
                        <div className="flex gap-2">
                            <Image src="/calendar.svg" alt='calender' width={20} height={20} />
                            <p className="block text-500 font-medium mb-3">08-01-2023</p>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">3.2% from last week</span>
                </div>
            </div>

            <div className="col-12 xl:col-4">
                <div className="card">
                    <div className="flex justify-content-between align-items-center mb-4">
                        <h5>Recent Users</h5>
                        <div>
                            <button type="button" className="bg-red-400 border border-red-400">More</button>
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

            <div className="col-12 xl:col-8">
                <div className="card">
                    <div className="flex justify-content-between align-items-center mb-4">
                        <h5>Customer Reviews</h5>
                        <div>
                            <button type="button" className="bg-red-400 border border-red-400">View More</button>
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
    );
};

export default Page;