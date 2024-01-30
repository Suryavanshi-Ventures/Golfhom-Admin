
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
    const [country, setCountry] = useState("");
    const [stateName, setStateName] = useState("");
    const [city, setCity] = useState("");
    const [prices, setPrices] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [accommodation, setAccommodation] = useState("");
    const [bathroom, setBathroom] = useState("");
    const [image, setImage] = useState("");
    const [otherImage, setOtherImage] = useState([]);
    const [amenityList, setAmenityList] = useState([]);
    const [status, setStatus] = useState("");

    const handleAmenityChange = (e) => {
        const AmenityValue = e.target.value;
        setAmenities(AmenityValue);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };
    const handleAddTag = () => {
        if (amenities) {
            setAmenityList((prevAmenity) => [...prevAmenity, amenities]);
            setAmenities('');
        }
    };

    const handleOtherImageChange = (e) => {
        const selectedOtherImages = Array.from(e.target.files);
        const otherImageUrls = selectedOtherImages.map(image => URL.createObjectURL(image));
        setOtherImage(otherImageUrls);
    };
    const handleRemoveAmenity = (index) => {
        setAmenityList((prevAmenity) => prevAmenity.filter((_, i) => i !== index));
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
    const handleRemoveOtherImage = (index) => {
        const updatedOtherImages = [...otherImage];
        updatedOtherImages.splice(index, 1);
        setOtherImage(updatedOtherImages);
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
            setAmenityList(propertyList?.data?.amenities);
            setCheckIn(propertyList?.data?.checkIn);
            setAddress(propertyList?.data?.address);
            setBedroom(propertyList?.data?.bedrooms);
            setDescription(propertyList?.data?.description);
            setOwnerName(propertyList?.data?.ownerName);
            setCountry(propertyList?.data?.country);
            setStateName(propertyList?.data?.state);
            setCity(propertyList?.data?.city);
            setPrices(propertyList?.data?.price);
            setCheckOut(propertyList?.data?.checkOut);
            setAccommodation(propertyList?.data?.accomodation);
            setBathroom(propertyList?.data?.bathrooms);
            setImage(propertyList?.data?.imageUrl);
            setOtherImage(propertyList?.data?.otherImageUrls);
            setStatus(propertyList?.data?.status || "Draft");
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
        }
    };

    // UPDATE PROPERTY API
    async function handleUpdateProperty(e) {
        setIsSubmitting(true);
        e.preventDefault();

        const data = {
            name: newPropertyName,
            ownerName: ownerName,
            description: description,
            accomodation: accommodation,
            bedrooms: bedroom,
            bathrooms: bathroom,
            checkIn: checkIn,
            checkOut: checkOut,
            amenities: Array.isArray(amenityList) ? 'amenityList' : [amenityList],
            // image: image,
            otherImageUrls: otherImage,
            price: prices,
            status: status,
        };

        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/property/${PropertyId}`, data, {
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
        finally {
            setIsSubmitting(false);
        }
    }

    return (
        <ProtectedRoute>
            {/* UPDATE MODAL */}
            <div className="flex flex-col bg-white rounded-lg p-5 gap-4 z-50">
                <h2 className="mb-1 font-medium text-2xl">Update Property</h2>

                <div className="flex flex-col gap-2 mb-3">
                    <h5>Status: <span className="text-green-500 font-medium">{status}</span></h5>
                    <div>
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
                                <label className="text-[#404040] text-md font-medium">Country</label>
                                <input
                                    type="text"
                                    value={country}
                                    className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                                    placeholder="Sample Golf Course"
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">City</label>
                                <input type="text" value={city} className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none" placeholder="Alexendar Jones" onChange={(e) => setCity(e.target.value)} />
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
                        </div>
                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Owner name</label>
                                <input type="text" value={ownerName} className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none" placeholder="Alexendar Jones" onChange={(e) => setOwnerName(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">State</label>
                                <input type="text" value={stateName} className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none" placeholder="Alexendar Jones" onChange={(e) => setStateName(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#404040] text-md font-medium">Accommodation</label>
                                <input type="text" value={accommodation} className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none" placeholder="20:40" onChange={(e) => setAccommodation(e.target.value)} />
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
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-[#404040] text-md font-medium">Amenities</label>
                            <div className="flex flex-row flex-wrap gap-2 mt-2 bg-gray-100 rounded-md px-4 py-2.5">
                                {amenityList.map((amenityItem, index) => (
                                    <div key={index} className="flex flex-row items-center bg-gray-200 rounded-full py-1 px-4 w-fit">
                                        <span className="mr-2">{amenityItem}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveAmenity(index)}
                                            className="text-gray-600 font-semibold text-sm cursor-pointer"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                <input
                                    type="text"
                                    value={amenities}
                                    className="w-full text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                                    placeholder="Example wifi pool etc"
                                    onChange={handleAmenityChange}
                                    onKeyDown={handleKeyDown}
                                />
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

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-[#404040] text-md font-medium">Image</label>
                            <div onClick={handleImageClick}>
                                {selectedImage ? (
                                    <Image src={selectedImage} alt="selected" width={320} height={320} className="border border-[#636363] rounded-md my-3" />
                                ) : (
                                    <Image src={image} alt="background" width={320} height={320} className="border border-[#636363] rounded-md my-3" />
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
                            <label className="text-[#404040] text-md font-medium">Other Images Preview</label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {otherImage.slice(0, 8).map((imageUrl, index) => (
                                    <div key={index} className="relative">
                                        <span
                                            onClick={() => handleRemoveOtherImage(index)}
                                            className="absolute top-2 right-2 cursor-pointer text-red-500 bg-gray-100 rounded-full px-2 py-0.5 font-bold text-lg opacity-1"
                                        >
                                            &times;
                                        </span>
                                        <Image
                                            src={imageUrl}
                                            alt={`other-image-${index}`}
                                            width={220}
                                            height={220}
                                            className="border border-[#636363] rounded-md"
                                        />
                                    </div>
                                ))}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleOtherImageChange}
                                className="border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                                multiple
                            />
                            <button
                                type="button"
                                onClick={handleImageClick}
                                className="bg-gray-400 w-fit rounded-[4px] px-4 py-1 mt-2 text-white"
                            >
                                Add Images
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-start">
                        <button onClick={(e) => handleUpdateProperty(e, userUpdate)} className="bg-[#FF6764] opacity-[0.8] rounded-[4px] px-4 py-1 text-white w-fit" disabled={isSubmitting}>{isSubmitting ? 'Updating...' : 'Update'}</button>
                        <Link href="/Dashboard/ViewProperty" className="bg-gray-400 rounded-[4px] px-4 py-1 text-white">Cancel</Link>
                    </div>
                </form>
            </div>
        </ProtectedRoute>
    )
}

export default Page;