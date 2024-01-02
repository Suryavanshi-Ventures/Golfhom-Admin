import Image from "next/image";

export default function Page() {
  return <>
    <div className="w-full min-h-screen flex">
      <div className="flex flex-col justify-center relative top-[25%] left-[36%] w-[25%] gap-6">
        <Image src="/GOLFHOM-Logo.png" alt="GOLFHOM" width={250} height={250} className="flex px-5" />
        <h1 className="text-5xl text-center w-full">Welcome <span className="text-[#FF6764]">back!</span></h1>
        <div className="bg-[#C7DEEB] text-white flex gap-4 rounded p-4 justify-center items-center">
          <Image src="/phone.png" alt="Phone" width={20} height={20} />
          SIGN IN WITH PHONE
        </div>
        <div className="bg-[#FF6764] text-white flex gap-4 rounded p-4 justify-center items-center">
          <Image src="/google.png" alt="Phone" width={20} height={20} />
          SIGN IN WITH GOOGLE
        </div>

        <div className="flex gap-4">
          <h4 className="text-[#636363]">Don’t have an account?</h4>
          <h4 className="text-[#FF6764]">Signup</h4>
        </div>
      </div>

      <div className="text-[#636363]">Copyrights 2023 Golfhom. All Rights Reserved.</div>
    </div>
  </>
}