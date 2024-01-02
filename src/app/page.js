import Image from "next/image";

export default function Page() {
  return <>
    <div className="w-full flex flex-col justify-center items-center gap-12 mt-48">
      <div className="flex flex-col justify-center items-center gap-10 w-[28%]">
        <Image src="/GOLFHOM-Logo.png" alt="GOLFHOM" width={250} height={250} className="flex px-5" />
        <h1 className="text-5xl font-medium text-center w-full">Welcome <span className="text-[#FF6764]">back!</span></h1>

        <div className="flex flex-col w-full gap-6">
          <button className="bg-[#C7DEEB] text-white flex gap-4 rounded py-3 px-5 justify-center items-center shadow-lg cursor-pointer w-full">
            <Image src="/phone.png" alt="Phone" width={20} height={20} />
            SIGN IN WITH PHONE
          </button>
          <button className="bg-[#FF6764] text-white flex gap-4 rounded py-4 px-5 justify-center items-center shadow-lg cursor-pointer w-full">
            <Image src="/google.png" alt="Phone" width={20} height={20} />
            SIGN IN WITH GOOGLE
          </button>
        </div>

        <div className="flex gap-4">
          <h4 className="text-[#636363]">Don’t have an account?</h4>
          <h4 className="text-[#FF6764]">Signup</h4>
        </div>
      </div>

      <div className="text-[#636363] mt-20">Copyrights 2024 Golfhom. All Rights Reserved.</div>
    </div>
  </>
}