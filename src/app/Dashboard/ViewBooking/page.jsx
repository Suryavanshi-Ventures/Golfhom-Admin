"use client"
import React from 'react';
import ProtectedRoute from '@/component/Protected Route/page';

const Page = () => {
    return (
        <ProtectedRoute>
            <h5>No Bookings...</h5>
        </ProtectedRoute>
    );
};

export default Page;