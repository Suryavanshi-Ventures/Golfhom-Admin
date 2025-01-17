import Sidebar from "@/component/Sidebar/page"
import Header from "@/component/Header/page";
import { ToastContainer } from "../../component/nexToastify";
import 'react-toastify/dist/ReactToastify.css';
import '@/app/globals.css'
export const metadata = {
    title: 'Golfhom | Admin',
    description: 'Generated by Golfhom',
}

export default function RootLayout({ children }) {
    return (
        <>
            <div className="lg:flex lg:flex-col">
                <ToastContainer />
                <Header />
                <div className="lg:flex lg:flex-row bg-gray-200">
                    <div className="lg:basis-[22%] z-50 py-8 pl-8 hidden lg:block">
                        <Sidebar />
                    </div>

                    <div className='w-full lg:basis-5/6 z-50'>
                        <div className="p-8 flex flex-col gap-8 min-h-screen">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}