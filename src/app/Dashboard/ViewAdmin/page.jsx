"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ProtectedRoute from '@/component/Protected Route/page';

const Page = () => {
    const [viewListAdmin, setViewListAdmin] = useState([]);
    const [deleteViewListUsers, setDeleteViewListAdmin] = useState([]);
    const [token, setToken] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    // const [adminUpdate, setUserUpdate] = useState(null);
    const [newUserName, setNewUserName] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const handleCancelDelete = () => {
        setDeleteOpen(false);
    };

    // const handleCancelUpdate = () => {
    //     setUpdateOpen(false);
    // };

    const handleModalOpen = (data) => {
        setAdminToDelete(data);
        setDeleteOpen(true);
    }

    // const handleUpdateOpen = (data) => {
    //     setUserUpdate(data);
    //     setUpdateOpen(true);
    // }

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        const item = localStorage.getItem("access_token");
        setToken(item);
    }, [])

    useEffect(() => {
        if (token) {
            listUsers();
        }
    }, [token]);

    // LIST API
    const listUsers = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin`,
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
            const viewAdminData = await response.json();
            if (viewAdminData.status === "success") {
                const sortedAdmins = viewAdminData.data.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });

                setViewListAdmin(sortedAdmins);
            }
        } catch (error) {
            console.log("error message", error)
        }
    };

    // DELETE API
    const handleDelete = async (adminData) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/${adminData}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const responseData = await response.json();
            setViewListAdmin((prevAdminList) => prevAdminList.filter(admin => admin.id !== adminData));
            setDeleteViewListAdmin(responseData);
            setDeleteOpen(false);
            setTimeout(() => { setDeleteOpen(false); }, 10000);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // UPDATE SECTION ID
    // const handleUpdate = async (e, adminUpdate) => {
    //     setIsSubmitting(true);
    //     e.preventDefault();

    //     try {
    //         const formData = new FormData();
    //         formData.append('username', newUserName);
    //         formData.append('email', newEmail);

    //         const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/admin/${updateAdmin}`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });

    //         toast.success('Successfully Updated', {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         });

    //         setTimeout(() => { router.push('/Dashboard/ViewUsers') }, 1500);

    //     } catch (error) {
    //         setError(error.message || 'An error occurred during the update.');
    //         toast.error('Not Updated', {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         });
    //     }
    //     finally {
    //         setIsSubmitting(false);
    //     }
    // };

    return (
        <ProtectedRoute>
            <h5 className="text-2xl font-medium">All Admin</h5>
            {deleteOpen && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-5 flex flex-col items-center justify-center z-50">
                    <div className="flex flex-col bg-white rounded-lg p-5 gap-4 z-50">
                        <p>Admin Id : {adminToDelete}</p>
                        <p>You want to delete this Admin</p>
                        <div className="flex gap-4 justify-center">
                            <button onClick={() => handleDelete(adminToDelete)} className="bg-[#FF6764] rounded-[4px] px-4 py-1 text-white w-fit">Delete</button>
                            <button onClick={handleCancelDelete} className="bg-gray-400 rounded-[4px] px-4 py-1 text-white">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {updateOpen && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-5 flex flex-col items-center justify-center z-50">
                    <form className="flex flex-col bg-white rounded-lg p-5 gap-4 z-50">
                        {/* <p>Update the user</p>
                        <p className="text-[#C2C2C2]">You can create normal users</p>

                        <label>User Name</label>
                        <input type='text' placeholder='abc' value={newUserName || 'N/A'} onChange={(e) => setNewUserName(e.target.value)} />

                        <label>Email Address</label>
                        <input type='email' placeholder='abc@gmail.com' value={newEmail} onChange={(e) => setNewEmail(e.target.value)} /> */}
                        <p className="text-black bg-yellow-400 font-semibold">Update API in progress</p>

                        <div className="flex gap-4 justify-center">
                            {/* <button onClick={(e) => handleUpdate(e, adminUpdate)} className="bg-[#FF6764] rounded-[4px] px-4 py-1 text-white w-fit" disabled={isSubmitting}>{isSubmitting ? 'Updating...' : 'Update'}</button> */}
                            <button onClick={handleCancelUpdate} className="bg-gray-400 rounded-[4px] px-4 py-1 text-white">Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            <div className="overflow-y-auto max-h-screen shadow-lg">
                <table className="w-full table-auto">
                    <thead className="font-semibold text-sm">
                        <tr>
                            <th className="p-8 text-start bg-[#F7F7F7] rounded-ss-lg">Name</th>
                            <th className="py-8 text-start bg-[#F7F7F7]">Email</th>
                            <th className="py-8 px-3 text-start bg-[#F7F7F7]">Created</th>
                            <th className="py-8 px-5 text-start bg-[#F7F7F7]">Status</th>
                            <th className="py-8 text-start bg-[#F7F7F7] rounded-tr-lg">Delete</th>
                            {/* <th className="py-8 px-4 text-center bg-[#F7F7F7] rounded-tr-lg">Update</th> */}
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {viewListAdmin?.map((data) => (
                            <React.Fragment key={data.id}>
                                <tr>
                                    <td className="text-start px-8 pt-8 pb-6">{data.username}</td>
                                    <td className="text-start">{data.email}</td>
                                    <td className="text-start">{formatDate(data.createdAt)}</td>
                                    <td><button className="text-center text-white px-6 py-1.5 rounded-sm bg-[#4BAF4F]">Active</button></td>
                                    <td className="pl-3" onClick={() => handleModalOpen(data.id)}><Image src="/icons/trash.svg" alt="Trash" width={20} height={20} /></td>
                                    {/* <td className="pl-8 text-center"><Image src="/icons/edit.svg" alt="Edit" width={20} height={20} onClick={() => handleUpdateOpen(data)} /></td> */}
                                </tr>
                                <tr>
                                    <td colSpan="6" className="border-b-2 border-[#C2C2C2]"></td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </ProtectedRoute>
    );
};

export default Page;