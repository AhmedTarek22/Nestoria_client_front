import React from "react";

const ThankYou = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-[#131312] text-white"
      style={{ backgroundImage: "url('/images/home/2.jpg')" }}
    >
      <h1 className="text-3xl font-semibold mb-4">
        Thank You for Registering!
      </h1>
      <p className="text-lg text-[#929292]">
        Your documents will be reviewed within 48 hours.
      </p>
    </div>
  );
};

export default ThankYou;
