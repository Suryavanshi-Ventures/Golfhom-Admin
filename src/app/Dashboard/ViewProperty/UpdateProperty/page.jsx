
"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import ProtectedRoute from '@/component/Protected Route/page';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';

const Page = () => {
    const [token, setToken] = useState(null);
    const SearchParams = useSearchParams();
    const PropertyId = SearchParams.get("id");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [propertyList, setPropertyList] = useState([]);
    const [newPropertyName, setNewPropertyName] = useState("");
    const [amenities, setAmenities] = useState("");
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
    const [otherImage, setOtherImage] = useState("");
    const [amenityList, setAmenityList] = useState([]);
    const [status, setStatus] = useState("");

    const handleInputChange = (e) => {
        setAmenities(e.target.value);
    };

    const handleAddAmenity = () => {
        const trimmedAmenity = amenities.toString().trim();
        if (trimmedAmenity !== '') {
            setAmenityList([...amenityList, trimmedAmenity]);
            setAmenities('');
        }
    };

    const handleRemoveAmenity = (index) => {
        const updatedAmenities = [...amenityList];
        updatedAmenities.splice(index, 1);
        setAmenityList(updatedAmenities);
    };

    const fileInputRef = useRef(null);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setSelectedImage(URL.createObjectURL(selectedFile));
        setImage(selectedFile);
    };
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        const item = localStorage.getItem("access_token");
        setToken(item);
    }, [])

    useEffect(() => {
        if (PropertyId) {
            listProperty();
        }
    }, [PropertyId]);

    useEffect(() => {
        if (propertyList && propertyList?.data) {
            setNewPropertyName(propertyList?.data?.name);
            setAmenities(propertyList?.data?.amenities);
            setCheckIn(propertyList?.data?.checkIn);
            setAddress(propertyList?.data?.address);
            setBedroom(propertyList?.data?.bedrooms);
            setDescription(propertyList?.data?.description);
            setOwnerName(propertyList?.data?.ownerName);
            setPrices(propertyList?.data?.price);
            setCheckOut(propertyList?.data?.checkOut);
            setAccommodation(propertyList?.data?.accomodation);
            setBathroom(propertyList?.data?.bathrooms);
            setImage(propertyList?.data?.imageUrl);
            setOtherImage(propertyList?.data?.otherImageUrls);
            setStatus(propertyList?.data?.status || "Draft");

            // setNewContent(propertyList?.data?.content);
            // let content = JSON.parse(propertyList.data.content);
            // setData({ blocks: content.blocks });
        }
    }, [propertyList]);

    // GET PREVIOUS DATA ID
    const listProperty = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property/${PropertyId}`,
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
                setPropertyList(viewPropertyData);
            }
        } catch (error) {
            console.log("error message", error)
        }
    };

    // UPDATE PROPERTY API
    async function handleUpdateProperty(e) {
        // e.preventDefault();

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
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/property/${PropertyId}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("response", response)

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

                <div>
                    <h5>Status: <span className="text-green-500 font-medium">{status}</span></h5>
                    <div className="flex gap-2">
                        <input
                            type='radio'
                            checked={status === 'Active'}
                            onChange={() => setStatus('Active')}
                        />
                        <p>Active</p>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type='radio'
                            checked={status === 'Inactive'}
                            onChange={() => setStatus('Inactive')}
                        />
                        <p>Inactive</p>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type='radio'
                            checked={status === 'Draft'}
                            onChange={() => setStatus('Draft')}
                        />
                        <p>Draft</p>
                    </div>
                </div>

                <form className="flex flex-col gap-5">
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Property Name</label>
                                <input
                                    type="text"
                                    value={newPropertyName}
                                    className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                                    placeholder="Sample Golf Course"
                                    onChange={(e) => setNewPropertyName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Check In</label>
                                <input type="text" pattern="\d*" value={checkIn} className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none" placeholder='20:30' onChange={(e) => setCheckIn(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Address</label>
                                <input type="text" value={address}
                                    className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                                    placeholder="B-20, Street name" onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Bedrooms</label>
                                <input type="text" pattern="\d*" value={bedroom} className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none" placeholder='7' onChange={(e) => setBedroom(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Accommodation</label>
                                <input type="text" value={accommodation} className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none" placeholder="20:40" onChange={(e) => setAccommodation(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Owner name</label>
                                <input type="text" value={ownerName} className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none" placeholder="Alexendar Jones" onChange={(e) => setOwnerName(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Check out</label>
                                <input type="text" pattern="\d*" value={checkOut} className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none" placeholder='09:30' onChange={(e) => setCheckOut(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Prices(Day/Night)</label>
                                <input type="text" pattern="\d*" value={prices} className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none" placeholder='$200' onChange={(e) => setPrices(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Bathrooms</label>
                                <input type="text" pattern="\d*" value={bathroom} className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none" placeholder='6' onChange={(e) => setBathroom(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#404040] text-md font-medium">Amenities</label>
                            <div className="amenities-input-container">
                                <ul className="list-disc">
                                    {amenityList.map((amenity, index) => (
                                        <li key={index} className="text-sm amenity-tag">
                                            {amenity}
                                            <span onClick={() => handleRemoveAmenity(index)} className="cursor-pointer">&times;</span>
                                        </li>
                                    ))}
                                </ul>
                                {!isSubmitting && (
                                    <input
                                        type="text"
                                        value={amenities}
                                        className="w-full text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                                        placeholder="Example wifi pool etc"
                                        onChange={handleInputChange}
                                        onBlur={handleAddAmenity}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#404040] text-md font-medium">Description</label>
                            <textarea
                                rows={12}
                                cols={6}
                                value={description}
                                className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                                placeholder="This is sample description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-[#404040] text-md font-medium">Image</label>
                            <div onClick={handleImageClick}>
                                {selectedImage ? (
                                    <Image src={selectedImage} alt="selected" width={120} height={120} className="border border-[#636363] rounded-md my-3" />
                                ) : (
                                    <Image src={image} alt="background" width={120} height={120} className="border border-[#636363] rounded-md my-3" />
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                className="border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-[#404040] text-md font-medium">Other Image</label>
                            <div onClick={handleImageClick}>
                                {selectedImage ? (
                                    <Image src={selectedImage} alt="selected" width={120} height={120} className="border border-[#636363] rounded-md my-3" />
                                ) : (
                                    <Image src={otherImage} alt="background" width={120} height={120} className="border border-[#636363] rounded-md my-3" />
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                className="border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
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
