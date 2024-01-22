"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import ProtectedRoute from '@/component/Protected Route/page';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [createUsername, setCreateUsername] = useState("");
    const [createEmail, setCreateEmail] = useState("");
    const [token, setToken] = useState(null);
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [createUsernameError, setCreateUsernameError] = useState(false);
    const [createEmailError, setCreateEmailError] = useState(false);

    useEffect(() => {
        const item = localStorage.getItem("access_token");
        setToken(item);
    }, [])

    // CREATE USER API
    async function handleCreateUser(e) {
        e.preventDefault();

        setCreateUsernameError(!createUsername);
        setCreateEmailError(!createEmail);

        if (!createUsername || !createEmail) {
            return;
        }

        const data = { username: createUsername, email: createEmail, password: "123" }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/user`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Successfully Submitted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => { router.push('/Dashboard/CreateUsers') }, 1500);

        } catch (error) {
            toast.error('Data Already Exists', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log("error", error)
        }
    }

    // ADMIN CREATE API
    async function createAdmin(e) {
        e.preventDefault();

        setUsernameError(!username);
        setEmailError(!email);

        if (!username || !email) {
            return;
        }

        const data = { username, email, password: "123" }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Successfully Submitted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => { router.push('/Dashboard/CreateUsers') }, 1500);

        } catch (error) {
            toast.error('Data Already Exists', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <ProtectedRoute>
            <div className="flex flex-row gap-4 columns-2">
                {/* Create User */}
                <div className="w-full bg-white rounded-xl p-7 shadow-md">
                    <div className="mb-5">
                        <h5 className="mb-1 font-medium text-2xl">Create User</h5>
                        <small className="text-[#C2C2C2]">You can create normal users</small>
                    </div>

                    <form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#404040] text-md">Username</label>
                            <input type="text" className="border border-black rounded-[10px] px-4 py-2.5" placeholder="Enter Username" onChange={(e) => setCreateUsername(e.target.value)} />
                            {createUsernameError && <div className="text-danger text-red-500 mt-1">Username is mandatory</div>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#404040] text-md">Email</label>
                            <input className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Enter Your Email' onChange={(e) => setCreateEmail(e.target.value)} />
                            {createEmailError && <div className="text-danger text-red-500 mt-1">Email is mandatory</div>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#404040] text-md">Password</label>
                            <input type="password" className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Enter your password' />
                        </div>
                        <div className="flex justify-center items-center">
                            <button type="Submit" onClick={handleCreateUser} className="bg-[#FF6764] border border-red-400 py-2.5 text-white font-medium my-4 rounded-[4px] w-1/3">Submit</button>
                        </div>
                    </form>
                </div>

                {/* Create Admin */}
                <div className="w-full bg-white rounded-xl p-7 shadow-md">
                    <div className="mb-5">
                        <h5 className="mb-1 font-medium text-2xl">Admin Creation</h5>
                        <small className="text-[#C2C2C2]">You can create sub admins accounts</small>
                    </div>

                    <form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#404040] text-md">Username</label>
                            <input type="text" className="border border-black rounded-[10px] px-4 py-2.5" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                            {usernameError && <div className="text-danger text-red-500 mt-1">Username is mandatory</div>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#404040] text-md">Email</label>
                            <input className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />
                            {emailError && <div className="text-danger text-red-500 mt-1">Email is mandatory</div>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#404040] text-md">Password</label>
                            <input type="password" className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Enter your password' />
                        </div>
                        <div className="flex justify-center items-center">
                            <button type="Submit" onClick={createAdmin} className="bg-[#FF6764] border border-red-400 py-2.5 text-white font-medium my-4 rounded-[4px] w-1/3">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Page; 