"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ProtectedRoute from "@/component/Protected Route/page";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

const Page = () => {
  const router = useRouter();

  const [token, setToken] = useState(null);
  const SearchParams = useSearchParams();
  const PropertyId = SearchParams.get("id");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [propertyList, setPropertyList] = useState(null);
  const [newPropertyName, setNewPropertyName] = useState("");
  const [amenities, setAmenities] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [address, setAddress] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [description, setDescription] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [country, setCountry] = useState("");
  const [stateName, setStateName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [city, setCity] = useState("");
  const [prices, setPrices] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [beds, setBeds] = useState("");
  const [vicinity, setVicinity] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [maxNights, setMaxNights] = useState("");
  const [minNights, setMinNights] = useState("");
  const [paymentMethods, setPaymentMethods] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [image, setImage] = useState("");
  const [otherImage, setOtherImage] = useState([]);
  const [amenityList, setAmenityList] = useState([]);
  const [status, setStatus] = useState("");
  const [golfCourses, setGolfCourses] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);

  const handleAmenityChange = (e) => {
    const AmenityValue = e.target.value;
    setAmenities(AmenityValue);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };
  const handleAddTag = () => {
    if (amenities) {
      setAmenityList((prevAmenity) => [...prevAmenity, amenities]);
      setAmenities("");
    }
  };

  const handleOtherImageChange = (e) => {
    const selectedOtherImages = Array.from(e.target.files);
    const otherImageUrls = selectedOtherImages.map((image) =>
      URL.createObjectURL(image)
    );
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
  }, []);

  useEffect(() => {
    if (PropertyId) {
      listProperty();
    }
  }, [PropertyId]);

  useEffect(() => {
    const addressParts = [];
    if (propertyList?.data?.address)
      addressParts.push(propertyList.data.address);
    if (propertyList?.data?.city)
      addressParts.push(propertyList.data.city + ",");
    if (propertyList?.data?.state)
      addressParts.push(propertyList.data.state + ",");
    if (propertyList?.data?.country)
      addressParts.push(propertyList.data.country + ".");

    if (propertyList && propertyList?.data) {
      setNewPropertyName(propertyList?.data?.name);
      setAmenityList(propertyList?.data?.amenities);
      setCheckIn(propertyList?.data?.checkIn);
      setAddress(addressParts.join(" "));
      setCountry(propertyList?.data?.country);
      setStateName(propertyList?.data?.state);
      setCity(propertyList?.data?.city);
      setBedroom(propertyList?.data?.bedrooms);
      setDescription(propertyList?.data?.description);
      setOwnerName(propertyList?.data?.ownerName);
      setOwnerPhone(propertyList?.data?.ownerDetail?.phone);
      setCompanyName(propertyList?.data?.ownerDetail?.companyName);
      setOwnerEmail(propertyList?.data?.ownerDetail?.email);
      setPrices(propertyList?.data?.price);
      setCheckOut(propertyList?.data?.checkOut);
      setBeds(propertyList?.data?.beds);
      setVideoUrl(propertyList?.data?.videoUrl);
      setMaxNights(propertyList?.data?.maxNightsOfBooking);
      setMinNights(propertyList?.data?.minNightsOfBooking);
      setPaymentMethods(propertyList?.data?.paymentMethods);
      setAccommodation(propertyList?.data?.accomodation);
      setBathroom(propertyList?.data?.bathrooms);
      setImage(propertyList?.data?.imageUrl);
      setOtherImage(propertyList?.data?.otherImageUrls);
      setStatus(propertyList?.data?.status || "Draft");
      setIsFeatured(propertyList?.data?.isFeatured || false);
    }

    if (propertyList) {
      getGolfCourses();
    }
  }, [propertyList]);

  // GET PREVIOUS DATA ID
  const listProperty = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/property/${PropertyId}`,
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

      if (viewPropertyData.status === "success") {
        setPropertyList(viewPropertyData);
      }
    } catch (error) {}
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
      amenities: Array.isArray(amenityList) ? amenityList : [amenityList],
      // image: image,
      otherImageUrls: otherImage,
      price: prices,
      status: status,
      country: country,
      city: city,
      state: stateName,
      beds: beds,
      maxNightsOfBooking: maxNights,
      minNightsOfBooking: minNights,
      address: address,
      paymentMethods:
        typeof paymentMethods === "string"
          ? paymentMethods.split(",")
          : paymentMethods,
      ownerDetail: {
        ...propertyList?.data?.ownerDetail,
        companyName: companyName,
        email: ownerEmail,
        phone: ownerPhone,
      },
      isFeatured: isFeatured,
    };

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/property/${PropertyId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Successfully Submitted", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push("/Dashboard/ViewProperty");
      }, 1500);
    } catch (error) {
      toast.error("Data Already Exists", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  // GET GOLF COURSES
  const getGolfCourses = async () => {
    try {
      if (propertyList?.data?.latitude && propertyList?.data?.longitude) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/golfcourse?latitude=${propertyList?.data?.latitude}&longitude=${propertyList?.data?.longitude}&distance=7&limit=7`,
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
        const golf_response = await response.json();

        if (golf_response.status === "success") {
          setGolfCourses(golf_response.data);
        }
      }
    } catch (error) {}
  };

  console.log("golfCourses:", golfCourses);

  return (
    <ProtectedRoute>
      {/* UPDATE MODAL */}
      <div className="flex flex-col bg-white rounded-lg p-5 gap-4 z-50">
        <h2 className="mb-1 font-medium text-2xl">Update Property</h2>

        <div className="flex flex-col gap-2 mb-3">
          <h5>
            Status: <span className="text-green-500 font-medium">{status}</span>
          </h5>
          <div className="ml-5">
            <div className="flex gap-2">
              <input
                type="radio"
                checked={status === "Active"}
                onChange={() => setStatus("Active")}
              />
              <p>Active</p>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                checked={status === "Inactive"}
                onChange={() => setStatus("Inactive")}
              />
              <p>Inactive</p>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                checked={status === "Draft"}
                onChange={() => setStatus("Draft")}
              />
              <p>Draft</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-3">
          <div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={() => setIsFeatured(!isFeatured)}
              />
              <label className="font-medium">Is featured property ?</label>
            </div>
          </div>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => handleUpdateProperty(e)}
        >
          <div className="flex gap-5">
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Property Name
                </label>
                <input
                  type="text"
                  value={newPropertyName || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Property Name"
                  onChange={(e) => setNewPropertyName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Company Name"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Owner Phone
                </label>
                <input
                  type="text"
                  value={ownerPhone || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Owner Phone"
                  onChange={(e) => setOwnerPhone(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  State
                </label>
                <input
                  type="text"
                  value={stateName || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="State"
                  onChange={(e) => setStateName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Accommodation
                </label>
                <input
                  type="text"
                  value={accommodation || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Accommodation"
                  onChange={(e) => setAccommodation(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Video Url
                </label>
                <input
                  type="text"
                  value={videoUrl || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Video Url"
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Bedrooms
                </label>
                <input
                  type="text"
                  pattern="\d*"
                  value={bedroom || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Bedrooms"
                  onChange={(e) => setBedroom(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Check In
                </label>
                <input
                  type="text"
                  value={checkIn || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="10:30"
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Min Nights of Booking
                </label>
                <input
                  type="text"
                  pattern="\d*"
                  value={minNights || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Min Nights of Booking"
                  onChange={(e) => setMinNights(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Address
                </label>
                <input
                  type="text"
                  value={address || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Payment Methods
                </label>
                <input
                  type="text"
                  value={paymentMethods || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Payment Methods"
                  onChange={(e) => setPaymentMethods(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Owner name
                </label>
                <input
                  type="text"
                  value={ownerName || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Owner name"
                  onChange={(e) => setOwnerName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Owner Email
                </label>
                <input
                  type="text"
                  value={ownerEmail || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Owner Email"
                  onChange={(e) => setOwnerEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Country
                </label>
                <input
                  type="text"
                  value={country || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Country"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  City
                </label>
                <input
                  type="text"
                  value={city || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Prices(Day/Night)
                </label>
                <input
                  type="text"
                  pattern="[0-9]+([\.,][0-9]+)?"
                  value={prices || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Prices(Day/Night)"
                  onChange={(e) => setPrices(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Beds
                </label>
                <input
                  type="text"
                  pattern="\d*"
                  value={beds || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Beds"
                  onChange={(e) => setBeds(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Bathrooms
                </label>
                <input
                  type="text"
                  pattern="\d*"
                  value={bathroom || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Bathrooms"
                  onChange={(e) => setBathroom(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Check out
                </label>
                <input
                  type="text"
                  value={checkOut || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Check out"
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Max Nights of Booking
                </label>
                <input
                  type="text"
                  pattern="\d*"
                  value={maxNights || ""}
                  className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                  placeholder="Max Nights of Booking"
                  onChange={(e) => setMaxNights(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#404040] text-md font-medium">
                  Vicinity Golf Course
                </label>
                <div className="text-sm space-y-2 border rounded-md px-4 py-2.5 bg-gray-100 hover:ring-0.5 hover:shadow-sm hover:shadow-[#FF6764] hover:ring-[#FF6764] hover:border-[#FF6764] transition-all border-transparent outline-none">
                  <div className="flex flex-wrap gap-2">
                    {golfCourses.length
                      ? golfCourses.map((i, inx) => (
                          <h4 className="flex flex-row items-center bg-gray-200 border border-gray-400 rounded-full py-1 px-4 ">
                            Shingle Creek Golf Club
                          </h4>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-[#404040] text-md font-medium">
                Amenities
              </label>
              <div className="flex flex-row flex-wrap gap-2 mt-2 bg-gray-100 rounded-md px-4 py-2.5">
                {amenityList.map((amenityItem, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center bg-gray-200 rounded-full py-1 px-4 w-fit"
                  >
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
                  placeholder="Amenities"
                  onChange={handleAmenityChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#404040] text-md font-medium">
                Description
              </label>
              <textarea
                rows={12}
                cols={6}
                value={description || ""}
                className="text-sm border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-[#404040] text-md font-medium">
                Image
              </label>
              <div onClick={handleImageClick}>
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="selected"
                    width={320}
                    height={320}
                    className="border border-[#636363] rounded-md my-3"
                  />
                ) : (
                  <Image
                    src={image || "/noImageFound.png"}
                    alt="background"
                    width={320}
                    height={320}
                    className="border border-[#636363] rounded-md my-3"
                  />
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                className="border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-[#404040] text-md font-medium">
                Other Images
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {otherImage &&
                  otherImage.slice(0, 8).map((imageUrl, index) => (
                    <div key={index} className="relative">
                      {/* <span
                      onClick={() => handleRemoveOtherImage(index)}
                      className="absolute top-2 right-2 cursor-pointer text-red-500 bg-gray-100 rounded-full px-2 py-0.5 font-bold text-lg opacity-1"
                    >
                      &times;
                    </span> */}
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
                style={{ display: "none" }}
                onChange={handleOtherImageChange}
                className="border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none"
                multiple
              />
              {/* <button
                type="button"
                onClick={handleImageClick}
                className="bg-gray-400 w-fit rounded-[4px] px-4 py-1 mt-2 text-white"
              >
                Add Images
              </button> */}
            </div>
          </div>
          <div className="flex gap-4 justify-start">
            <button
              type="submit"
              className="bg-[#FF6764] opacity-[0.8] rounded-[4px] px-4 py-1 text-white w-fit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
            <Link
              href="/Dashboard/ViewProperty"
              className="bg-gray-400 rounded-[4px] px-4 py-1 text-white"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
