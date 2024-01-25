"use client"
import React from 'react';
import ProtectedRoute from '@/component/Protected Route/page';

const Page = () => {
    return (
        <ProtectedRoute>
            <h5 className="text-2xl font-medium">All Bookings</h5>
            <div className="overflow-y-auto max-h-screen shadow-lg">
                <table className="w-full table-auto">
                    <thead className="font-semibold text-sm">
                        <tr>
                            <th className="p-8 text-start bg-[#F7F7F7] rounded-ss-lg">ID</th>
                            <th className="py-8 text-start bg-[#F7F7F7]">Status</th>
                            <th className="py-8 px-3 text-start bg-[#F7F7F7]">Date</th>
                            <th className="py-8 px-5 text-start bg-[#F7F7F7]">Address</th>
                            <th className="py-8 text-center bg-[#F7F7F7]">Check-in</th>
                            <th className="py-8 px-4 text-center bg-[#F7F7F7]">Check-out</th>
                            <th className="py-8 px-5 text-start bg-[#F7F7F7]">Guests</th>
                            <th className="py-8 px-5 text-start bg-[#F7F7F7]">Pets</th>
                            <th className="py-8 px-5 text-start bg-[#F7F7F7]">Subtotal</th>
                            <th className="py-8 px-5 text-start bg-[#F7F7F7] rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        <React.Fragment>
                            <tr>
                                <td colSpan="12" className="border-b-2 border-[#C2C2C2] text-center py-5">No Booking...</td>
                            </tr>
                        </React.Fragment>
                    </tbody>
                </table>
            </div>
        </ProtectedRoute>
    );
};

export default Page;