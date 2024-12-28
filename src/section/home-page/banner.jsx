import React from "react";

const Banner = () => {
  return (
    <div className="min-h-screen w-full  relative flex justify-center">
      <div className="absolute w-full h-full bg-gradient-to-b to-primary from-secondary opacity-30" />
      <div className="h-full flex flex-col lg:flex-row items-center justify-center  w-full z-30">
        <div className="w-full lg:w-1/2 h-full flex flex-col items-center lg:items-end  gap-6 p-5">
          <div className="max-w-xl space-y-5">
            <h1 className="text-6xl font-bold bg-gradient-to-b from-secondary  to-primary bg-clip-text text-transparent">
              Learn without Limits
            </h1>

            <p className="max-w-xl text-lg text-secondary">
              Start, switch, or advance your career with more than 7,000
              courses, Professional Certificates, and degrees from world-class
              universities and companies.
            </p>
            <button className=" bg-gradient-to-r from-secondary   to-primary rounded-full px-8 py-3 text-white font-bold">
              Get Started
            </button>
          </div>
        </div>
        <div className=" lg:w-1/2 h-full flex items-center justify-center">
          <img src="/assets/online-Course.png" alt="Online Course" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
