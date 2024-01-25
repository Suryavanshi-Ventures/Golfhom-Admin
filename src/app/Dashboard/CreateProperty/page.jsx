"use client"
import React, { useEffect, useState, useRef } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import ProtectedRoute from '@/component/Protected Route/page';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [amenities, setAmenities] = useState([]);
    const [checkIn, setCheckIn] = useState("");
    const [address, setAddress] = useState("");
    const [bedroom, setBedroom] = useState("");
    const [description, setDescription] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [prices, setPrices] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [accommodation, setAccommodation] = useState("");
    const [bathroom, setBathroom] = useState("");
    const [image, setImage] = useState("");
    const [token, setToken] = useState(null);
    const [usernameError, setUsernameError] = useState(false);
    const [amenitiesError, setAmenitiesError] = useState(false);
    const [checkInError, setCheckInError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [bedroomError, setBedroomError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [ownerNameError, setOwnerNameError] = useState(false);
    const [pricesError, setPricesError] = useState(false);
    const [checkOutError, setCheckOutError] = useState(false);
    const [accommodationError, setAccommodationError] = useState(false);
    const [bathroomError, setBathroomError] = useState(false);
    const [imageError, setImageError] = useState(false);

    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setSelectedImage(URL.createObjectURL(selectedFile));
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        const item = localStorage.getItem("access_token");
        setToken(item);
    }, [])

    // CREATE PROPERTY API
    async function handleCreateProperty(e) {
        e.preventDefault();

        setUsernameError(!username);
        setAmenitiesError(!amenities);
        setCheckInError(!checkIn);
        setAddressError(!address);
        setBedroomError(!bedroom);
        setDescriptionError(!description);
        setOwnerNameError(!ownerName);
        setPricesError(!prices);
        setCheckOutError(!checkOut);
        setAccommodationError(!accommodation);
        setBathroomError(!bathroom);
        setImageError(!image);

        if (!username || !amenities || !checkIn || !address || !bedroom || !description || !ownerName || !prices || !checkOut || !accommodation || !bathroom || !image) {
            return;
        }

        const data = { name: username, ownerName: ownerName, description: description, accomodation: accommodation, bedrooms: bedroom, bathrooms: bathroom, checkIn: checkIn, checkOut: checkOut, amenities: amenities, image: image, price: prices }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/property`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Successfully Submitted', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => { router.push('/Dashboard/ViewProperty') }, 1500);

        } catch (error) {
            toast.error('Data Already Exists', {
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
    }

    return (
        <ProtectedRoute>
            {/* Create Property */}
            <div className="w-full bg-white rounded-xl p-7 shadow-md">
                <div className="mb-5">
                    <h5 className="mb-1 font-medium text-2xl">Create New Property</h5>
                    <small className="text-[#C2C2C2]">Create Property</small>
                </div>

                <form className="flex flex-col gap-5">
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Username</label>
                                <input type="text" className="border border-black rounded-[10px] px-4 py-2.5" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                                {usernameError && <div className="text-danger text-red-500 mt-1">Username is mandatory</div>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Amenities</label>
                                <input type="text" className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Enter Your Amenities' onChange={(e) => setAmenities(e.target.value.split(','))} />
                                {amenitiesError && <div className="text-danger text-red-500 mt-1">Amenities is mandatory</div>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Check In</label>
                                <input type="text" pattern="\d*" className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Check In time' onChange={(e) => setCheckIn(e.target.value)} />
                                {checkInError && <div className="text-danger text-red-500 mt-1">Check In is mandatory</div>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Address</label>
                                <input type="text" className="border border-black rounded-[10px] px-4 py-2.5" placeholder="Search for address" onChange={(e) => setAddress(e.target.value)} />
                                {addressError && <div className="text-danger text-red-500 mt-1">Address is mandatory</div>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Bedrooms</label>
                                <input type="text" className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Enter Bedrooms' onChange={(e) => setBedroom(e.target.value)} />
                                {bedroomError && <div className="text-danger text-red-500 mt-1">Bedrooms is mandatory</div>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Description</label>
                                <textarea rows={3} cols={6} className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Enter Description' onChange={(e) => setDescription(e.target.value)} />
                                {descriptionError && <div className="text-danger text-red-500 mt-1">Description is mandatory</div>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Owner name</label>
                                <input type="text" className="border border-black rounded-[10px] px-4 py-2.5" placeholder="Enter Owner Name" onChange={(e) => setOwnerName(e.target.value)} />
                                {ownerNameError && <div className="text-danger text-red-500 mt-1">Owner name is mandatory</div>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Prices(Day/Night)</label>
                                <input type="text" pattern="\d*" className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Enter Prices' onChange={(e) => setPrices(e.target.value)} />
                                {pricesError && <div className="text-danger text-red-500 mt-1">Prices is mandatory</div>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Check out</label>
                                <input type="text" pattern="\d*" className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Check Out time' onChange={(e) => setCheckOut(e.target.value)} />
                                {checkOutError && <div className="text-danger text-red-500 mt-1">Check out is mandatory</div>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Accommodation</label>
                                <input type="text" className="border border-black rounded-[10px] px-4 py-2.5" placeholder="Enter Accommodation" onChange={(e) => setAccommodation(e.target.value)} />
                                {accommodationError && <div className="text-danger text-red-500 mt-1">Accommodation is mandatory</div>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Bathrooms</label>
                                <input type="text" pattern="\d*" className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Enter Bathrooms' onChange={(e) => setBathroom(e.target.value)} />
                                {bathroomError && <div className="text-danger text-red-500 mt-1">Bathrooms is mandatory</div>}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-[#404040] text-md font-medium">Image</label>
                            <div onClick={handleImageClick}>
                                {selectedImage ? (
                                    <Image src={selectedImage} alt="selected" width={120} height={120} className="border border-[#636363] px-5 py-2 rounded-lg my-3" />
                                ) : (
                                    <Image src="/background.svg" alt="background" width={120} height={120} className="border border-[#636363] px-5 py-2 rounded-lg my-3" />
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                className="border border-black rounded-[10px] px-4 py-2.5"
                            />
                            {imageError && <div className="text-danger text-red-500 mt-1">Image is mandatory</div>}
                        </div>

                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-[#404040] text-md font-medium">Other Image</label>
                            <div onClick={handleImageClick}>
                                {selectedImage ? (
                                    <Image src={selectedImage} alt="selected" width={120} height={120} className="border border-[#636363] px-5 py-2 rounded-lg my-3" />
                                ) : (
                                    <Image src="/background.svg" alt="background" width={120} height={120} className="border border-[#636363] px-5 py-2 rounded-lg my-3" />
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                className="border border-black rounded-[10px] px-4 py-2.5"
                            />
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-4">
                        <button type="Submit" onClick={handleCreateProperty} className="bg-[#FF6764] opacity-[0.8] border border-red-400 px-4 py-1 text-white font-medium rounded-[4px]">Save</button>
                        <Link href="/Dashboard/ViewProperty" className="bg-gray-400 rounded-[4px] px-4 py-1 text-white">Cancel</Link>
                    </div>
                </form>
            </div>
        </ProtectedRoute>
    );
};

export default Page; 