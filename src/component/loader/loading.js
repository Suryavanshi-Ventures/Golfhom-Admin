import React from "react";

const Loading = () => {
  return (
    <>
      <div className="grid  items-center w-full">
        <div className=" place-content-center">
          <div role="status" className="animate-pulse">
            <div className="h-2.5 bg-[#FF6764] rounded-full w-full mb-4"></div>
            <div className="h-2 bg-[#FF6764] rounded-full max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-[#FF6764] rounded-full mb-2.5"></div>
            <div className="h-2 bg-[#FF6764] rounded-full max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-[#FF6764] rounded-full max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-[#FF6764] rounded-full max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
