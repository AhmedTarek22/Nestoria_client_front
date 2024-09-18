import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/home/1.jpg')" }}
    >
      <div className="bg-red-800 bg-opacity-80 text-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Payment Failed</h1>
        <p className="text-lg mb-6">Something went wrong with your payment.</p>
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-white text-red-900 font-semibold py-2 px-4 rounded-lg hover:bg-red-100 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;
