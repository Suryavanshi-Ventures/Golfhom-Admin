"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 300);
    router.push("/");
  };

  const isLinkActive = (href) => {
    return pathname === href;
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("access_token") || false;
    if (!isAuthenticated) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <div className="sidebar-container md:w-[44%] lg:w-full bg-white rounded-xl lg:block min-h-screen">
        <div className="py-5 px-3 overflow-y-auto h-screen shadow-lg">
          <div className="px-5 pb-5">
            <div className="flex flex-col mb-4 px-3">
              <Image src="/icons/avatar.svg" alt="Profile" width={70} height={70} className="rounded-full" />
              <h3>Golfhom Admin</h3>
              <h4 className="text-[#C2C2C2]">admin@golfhom.com</h4>
            </div>

            <Link href="/Dashboard" className="cursor-pointer">
              <div
                className={`${
                  isLinkActive("/Dashboard") ? "text-white bg-[#FF6764] opacity-[0.8] w-full" : "bg-white"
                } py-2 px-3 flex gap-2 rounded-lg inline-block`}
              >
                <Image
                  src="/icons/dashboard.svg"
                  alt="Dashboard"
                  width={20}
                  height={10}
                  className={`${isLinkActive("/Dashboard") ? "invert" : ""}`}
                />
                <h4>Dashboard</h4>
              </div>
            </Link>
          </div>
          <hr />

          <div className="p-5 flex flex-col">
            <h3 className="text-[#C2C2C2] font-medium">User</h3>
            {/* <Link href="/Dashboard/CreateUsers" className="my-1 flex gap-2 cursor-pointer">
                            <div className={`${isLinkActive('/Dashboard/CreateUsers') ? 'text-white bg-[#FF6764] opacity-[0.8] w-full' : 'bg-white'} py-2 px-3 flex gap-2 rounded-lg inline-block`}>
                                <Image src="/icons/user.svg" alt='User' width={20} height={10} className={`${isLinkActive('/Dashboard/CreateUsers') ? 'invert' : ''}`} />
                                <h3>Create users</h3>
                            </div>
                        </Link> */}
            <Link href="/Dashboard/ViewUsers" className="my-1 flex gap-2 cursor-pointer">
              <div
                className={`${
                  isLinkActive("/Dashboard/ViewUsers") ? "text-white bg-[#FF6764] opacity-[0.8] w-full" : "bg-white"
                } py-2 px-3 flex gap-2 rounded-lg inline-block`}
              >
                <Image
                  src="/icons/viewAllUser.svg"
                  alt="User"
                  width={20}
                  height={20}
                  className={`${isLinkActive("/Dashboard/ViewUsers") ? "invert" : ""}`}
                />
                <h3>All Users</h3>
              </div>
            </Link>
            <Link href="/Dashboard/ViewAdmin" className="my-1 flex gap-2 cursor-pointer">
              <div
                className={`${
                  isLinkActive("/Dashboard/ViewAdmin") ? "text-white bg-[#FF6764] opacity-[0.8] w-full" : "bg-white"
                } py-2 px-3 flex gap-2 rounded-lg inline-block`}
              >
                <Image
                  src="/icons/Admin.svg"
                  alt="Admin"
                  width={20}
                  height={10}
                  className={`${isLinkActive("/Dashboard/ViewAdmin") ? "invert" : ""}`}
                />
                <h3>All Admin</h3>
              </div>
            </Link>
            <Link href="/Dashboard/ViewBooking" className="my-1 flex gap-2 cursor-pointer">
              <div
                className={`${
                  isLinkActive("/Dashboard/ViewBooking") ? "text-white bg-[#FF6764] opacity-[0.8] w-full" : "bg-white"
                } py-2 px-3 flex gap-2 rounded-lg inline-block`}
              >
                <Image
                  src="/icons/booking.svg"
                  alt="Booking"
                  width={20}
                  height={10}
                  className={`${isLinkActive("/Dashboard/ViewBooking") ? "invert" : ""}`}
                />
                <h3>Bookings</h3>
              </div>
            </Link>
          </div>
          <hr />

          <div className="p-5 flex flex-col">
            <h3 className="text-[#C2C2C2] font-medium">Property</h3>
            {/* <Link href="/Dashboard/CreateProperty" className="my-1 flex gap-2 cursor-pointer">
                            <Image src="/icons/listProperty.svg" alt='Dashboard' width={20} height={10} className={`${isLinkActive('/Dashboard') ? 'invert' : 'text-black'}`} />
                            <h3>Create property</h3>
                        </Link> */}
            <Link href="/Dashboard/ViewProperty" className="my-1 flex gap-2 cursor-pointer">
              <div
                className={`${
                  isLinkActive("/Dashboard/ViewProperty") ? "text-white bg-[#FF6764] opacity-[0.8] w-full" : "bg-white"
                } py-2 px-3 flex gap-2 rounded-lg inline-block`}
              >
                <Image
                  src="/icons/rental.svg"
                  alt="Property"
                  width={20}
                  height={10}
                  className={`${isLinkActive("/Dashboard/ViewProperty") ? "invert" : ""}`}
                />
                <h3>All Property</h3>
              </div>
            </Link>
            {/* <Link href="/Dashboard/Location" className="my-1 flex gap-2 cursor-pointer">
                            <Image src="/icons/Message.svg" alt='Dashboard' width={20} height={10} className={`${isLinkActive('/Dashboard') ? 'invert' : 'text-black'}`} />
                            <h3>Location</h3>
                        </Link> */}
            <Link href="/Dashboard/ViewBlog" className="my-1 flex gap-2 cursor-pointer">
              <div
                className={`${
                  isLinkActive("/Dashboard/ViewBlog") ? "text-white bg-[#FF6764] opacity-[0.8] w-full" : "bg-white"
                } py-2 px-3 flex gap-2 rounded-lg inline-block`}
              >
                <Image src="/icons/blog.svg" alt="Blog" width={20} height={10} className={`${isLinkActive("/Dashboard/ViewBlog") ? "invert" : ""}`} />
                <h3>All Blogs</h3>
              </div>
            </Link>
            <Link href="/Dashboard/ViewMessage" className="my-1 flex gap-2 cursor-pointer">
              <div
                className={`${
                  isLinkActive("/Dashboard/ViewMessage") ? "text-white bg-[#FF6764] opacity-[0.8] w-full" : "bg-white"
                } py-2 px-3 flex gap-2 rounded-lg inline-block`}
              >
                <Image
                  src="/icons/Message.svg"
                  alt="Message"
                  width={20}
                  height={10}
                  className={`${isLinkActive("/Dashboard/ViewMessage") ? "invert" : ""}`}
                />
                <h3>All Messages</h3>
              </div>
            </Link>
            <Link href="/Dashboard/Podcasts" className="my-1 flex gap-2 cursor-pointer">
              <div
                className={`${
                  isLinkActive("/Dashboard/Podcasts") ? "text-white bg-[#FF6764] opacity-[0.8] w-full" : "bg-white"
                } py-2 px-3 flex gap-2 rounded-lg`}
              >
                <Image src="/icons/blog.svg" alt="Blog" width={20} height={10} className={`${isLinkActive("/Dashboard/Podcasts") ? "invert" : ""}`} />
                <h3>Podcasts</h3>
              </div>
            </Link>
            <Link href="/Dashboard/Newsletter" className="my-1 flex gap-2 cursor-pointer">
              <div
                className={`${
                  isLinkActive("/Dashboard/Newsletter") ? "text-white bg-[#FF6764] opacity-[0.8] w-full" : "bg-white"
                } py-2 px-3 flex gap-2 rounded-lg`}
              >
                <Image
                  src="/icons/Message.svg"
                  alt="Newsletter"
                  width={20}
                  height={10}
                  className={`${isLinkActive("/Dashboard/Newsletter") ? "invert" : ""}`}
                />
                <h3>Newsletter</h3>
              </div>
            </Link>
          </div>
          <hr />

          {/* <div className='p-5 flex flex-col gap-1'>
                        <h3 className='text-[#C2C2C2] font-medium'>Chart</h3>
                        <h3>Graph</h3>
                    </div>
                    <hr /> */}

          <button
            className={`${
              isActive ? "text-white bg-[#FF6764] opacity-[0.8] w-full" : "bg-white"
            } py-2 my-4 px-8 flex gap-2 rounded-lg inline-block flex items-center gap-2 cursor-pointer`}
            onClick={handleLogout}
          >
            <Image src="/icons/logout.svg" alt="Exit" width={20} height={20} className={`${isActive ? "invert" : ""}`} />
            <h3>Log out</h3>
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
