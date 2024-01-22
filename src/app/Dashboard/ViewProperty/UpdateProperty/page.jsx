
"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import ProtectedRoute from '@/component/Protected Route/page';

const Page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setSelectedImage(URL.createObjectURL(selectedFile));
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // CREATE PROPERTY API
    async function handleUpdateProperty(e) {
        e.preventDefault();

        // setUsernameError(!username);
        // setAmenitiesError(!amenities);
        // setCheckInError(!checkIn);
        // setAddressError(!address);
        // setBedroomError(!bedroom);
        // setDescriptionError(!description);
        // setOwnerNameError(!ownerName);
        // setPricesError(!prices);
        // setCheckOutError(!checkOut);
        // setAccommodationError(!accommodation);
        // setBathroomError(!bathroom);
        // setImageError(!image);

        // if (!username || !amenities || !checkIn || !address || !bedroom || !description || !ownerName || !prices || !checkOut || !accommodation || !bathroom || !image) {
        //     return;
        // }

        // const data = { name: username, ownerName: ownerName, description: description, accomodation: accommodation, bedrooms: bedroom, bathrooms: bathroom, checkIn: checkIn, checkOut: checkOut, amenities: amenities, image: image, price: prices }

        try {
            const response = await axios.PATCH(
                `${process.env.NEXT_PUBLIC_API_URL}/property`, data, {
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
            setTimeout(() => { router.push('/Dashboard/ViewProperty') }, 1500);

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

    return (
        <ProtectedRoute>
            {/* UPDATE MODAL */}
            <div className="flex flex-col bg-white rounded-lg p-5 gap-4 z-50">
                <h2 className="mb-1 font-medium text-2xl">Update Property</h2>

                <form className="flex flex-col gap-5">
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Username</label>
                                <input type="text" className="border border-black rounded-[10px] px-4 py-2.5" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Amenities</label>
                                <input type="text" className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Enter Your Amenities' onChange={(e) => setAmenities(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Check In</label>
                                <input type="text" pattern="\d*" className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Check In time' onChange={(e) => setCheckIn(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Address</label>
                                <input type="text" className="border border-black rounded-[10px] px-4 py-2.5" placeholder="Search for address" onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Bedrooms</label>
                                <input type="text" pattern="\d*" className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Enter Bedrooms' onChange={(e) => setBedroom(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Description</label>
                                <textarea rows={3} cols={6} className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Enter Description' onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Owner name</label>
                                <input type="text" className="border border-black rounded-[10px] px-4 py-2.5" placeholder="Enter Owner Name" onChange={(e) => setOwnerName(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Prices(Day/Night)</label>
                                <input type="text" pattern="\d*" className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Enter Prices' onChange={(e) => setPrices(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Check out</label>
                                <input type="text" pattern="\d*" className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Check Out time' onChange={(e) => setCheckOut(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Accommodation</label>
                                <input type="text" className="border border-black rounded-[10px] px-4 py-2.5" placeholder="Enter Accommodation" onChange={(e) => setAccommodation(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Bathrooms</label>
                                <input type="text" pattern="\d*" className="border border-black rounded-[10px] px-4 py-2.5" placeholder='Enter Bathrooms' onChange={(e) => setBathroom(e.target.value)} />
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
                    <div className="flex gap-4 justify-start">
                        <button onClick={(e) => handleUpdateProperty(e, userUpdate)} className="bg-[#FF6764] rounded-[4px] px-4 py-1 text-white w-fit" disabled={isSubmitting}>{isSubmitting ? 'Updating...' : 'Update'}</button>
                        <Link href="/Dashboard/ViewProperty" className="bg-gray-400 rounded-[4px] px-4 py-1 text-white">Cancel</Link>
                    </div>
                </form>
            </div>
        </ProtectedRoute>
    )
}

export default Page
