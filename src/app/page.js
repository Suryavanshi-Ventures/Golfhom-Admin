"use client"
import '@/app/globals.css'
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('access_token') || false;
    if (!isAuthenticated) {
      router.push('/');
    } else {
      const logoutTimeout = setTimeout(() => {
        handleLogout();
      }, 2 * 60 * 60 * 1000);

      return () => clearTimeout(logoutTimeout);
    }
  }, [])

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    router.push('/');
  };

  // SIGNIN LOGIC
  const handleLogin = async () => {
    try {
      setLoading(true);
      setErrorMessage('');

      // Input validation
      if (!email || !password) {
        setErrorMessage('Email and Password are required');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        const token = data.token;

        localStorage.setItem('access_token', token);
        router.push('/Dashboard')

      } else {
        const errorData = await response.json();

        setErrorMessage(errorData.message);
      }

    } catch (error) {
      setErrorMessage('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return <>
    <div className="w-full flex flex-col justify-center items-center gap-10 bg-gray-100 min-h-screen">
      <div className="flex flex-col justify-center items-center gap-6 md:w-[50%] lg:w-[30%]">
        <Image src="/GOLFHOM-Logo.png" alt="GOLFHOM" width={200} height={200} className="flex px-5" />
        <h1 className="text-4xl font-medium text-center w-full">Welcome <span className="text-[#FF6764]">back!</span></h1>

        <form className="flex flex-col w-full gap-6 shadow-xl p-8 bg-white rounded-lg">
          <h1 className="text-2xl font-medium text-center w-full">Admin Login</h1>
          <input type="email" placeholder="Please Enter Email" className="border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Please Enter Password" className="border rounded-md px-4 py-2.5 bg-gray-100 focus:ring-0.5 focus:shadow-sm focus:shadow-[#FF6764] focus:ring-[#FF6764] focus:border-[#FF6764] transition-all border-transparent outline-none" onChange={(e) => setPassword(e.target.value)} />

          {errorMessage && <p className="text-red-500 mb-1 mt-3">{errorMessage}</p>}

          <button type="submit" onClick={handleLogin} className="bg-[#FF6764] opacity-[0.8] text-white flex gap-4 rounded-lg py-4 px-5 justify-center items-center shadow-lg cursor-pointer w-full"
            disabled={loading}>{loading ? 'Loging in...' : 'Login'}
          </button>
        </form>
      </div>
      <div className="text-[#636363] font-medium">Copyrights {currentYear} Golfhom. All Rights Reserved.</div>
    </div>
  </>
}