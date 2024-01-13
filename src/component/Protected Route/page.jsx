"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const isAuthenticated = () => {
    const token = localStorage.getItem("access_token");
    const tokenTime = localStorage.getItem("access_token");
    if (!token) {
        return false;
    }

    const dif = (Date.now() - tokenTime) / (1000 * 60 * 60);

    if (dif >= 2) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("access_token");
        return false;
    }
    return !!token;
};

const PrivateRoute = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/");
        }
    }, [router]);

    return children;
};

export default PrivateRoute;