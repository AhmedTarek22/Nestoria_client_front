import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  const translate = useSelector((state) => state.language.translation);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-4">{translate.Unauthorized_Access}</h2>
        <p className="text-gray-600 mb-6">
          {translate.Sorry_you_don}.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
