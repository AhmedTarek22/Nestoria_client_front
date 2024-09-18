import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css modules/heroSection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import ProductCarousel from "./ProductSection";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";


const HeroSection = () => {
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { workshopId } = useParams();
  console.log("workshopId ", workshopId);

  // Moved useNavigate to the top, before any early return
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const response = await axios.get(

          `http://localhost:5000/api/v1/fur/workshops/${workshopId}?page=2`

        );
        const workShopDetails = response.data.products[0].workshop_id;
        setWorkshop(workShopDetails);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, []);

  // Loading state
  if (loading) {
    return  <div className=" text-center flex justify-center items-center h-screen bg-black font-serif">
      <Loader />
    </div>
  }

  // Error state
  if (error) {
    return <div className="text-white text-center">Error: {error}</div>;
  }

  const handleChatSelect = () => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen text-white font-serif pb-16">
      {/* Main Content */}
      <div className="flex justify-center items-center h-80 bg-black relative text-center text-white overflow-hidden hero_section">
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative text-center">
          <img
            src="/images/about/home-hotspot-img-1.jpg"
            alt="Background"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24">
            <div className="m-auto w-full max-w-4xl text-center text-white">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                {workshop.name}
              </h3>
              <div className="text-center my-4">
                <Link to="/">
                  <span className="text-white hover:text-orange-500 duration-500 text-base sm:text-lg md:text-xl lg:text-2xl">
                    Home
                  </span>
                </Link>
                <span className="text-[#A5A5A5] mx-2"> / </span>
                <span className="text-[#A5A5A5] text-base sm:text-lg md:text-xl lg:text-2xl">
                  {workshop.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Work-Shop Details */}
      <section className="py-16 px-8 md:px-16 lg:px-32">
        <div className="flex justify-center items-start space-x-8">
          <div className="w-1/2 pr-8">
            <h2 className="text-3xl font-semibold mb-4">{workshop.name}</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Location: {workshop.location}
            </p>
            <p className="text-gray-400 mb-4">{workshop.description}</p>
          </div>

          <div className="border-l border-gray-600 h-auto"></div>

          <div className="w-1/2 pl-8">
            <h2 className="text-3xl font-semibold mb-4">Message Title</h2>
            <p className="text-gray-400 mb-6">
              Share your thoughts or reach out to us for more information!
            </p>

            <div className="mb-6">
              <p className="text-gray-300 mb-2">Rating:</p>
              <div className="flex space-x-2">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon
                  icon={faStarHalfAlt}
                  className="text-yellow-400"
                />
              </div>
            </div>

            <button
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded w-full"
              onClick={handleChatSelect}
            >
              Message me!
            </button>
          </div>
        </div>
      </section>

      <ProductCarousel />
    </div>
  );
};

export default HeroSection;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../css modules/heroSection.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
// import ProductCarousel from "./ProductSection";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import Loader from "../Loader";

// const HeroSection = () => {
//   const [workshop, setWorkshop] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Use useParams to retrieve the workshop_id from the URL
//   const { workshop_id } = useParams(); // Get the workshop ID from the URL
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchWorkshop = async () => {
//       try {
//         // Use the workshop_id to fetch the specific workshop details
//         const response = await axios.get(
//           `http://localhost:5000/api/v1/fur/workshops/${workshop_id}?page=2`
//         );
//         const workShopDetails = response.data;
//         setWorkshop(workShopDetails); // Set the retrieved workshop details
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchWorkshop();
//   }, [workshop_id]); // The effect will run when workshop_id changes

//   // Loading state
//   if (loading) {
//     return <Loader />;
//   }

//   // Error state
//   if (error) {
//     return <div className="text-white text-center">Error: {error}</div>;
//   }

//   const handleChatSelect = () => {
//     navigate("/chat");
//   };

//   return (
//     <div className="min-h-screen text-white font-serif pb-16">
//       {/* Main Content */}
//       <div className="flex justify-center items-center h-80 bg-black relative text-center text-white overflow-hidden hero_section">
//         <div className="absolute inset-0 bg-black opacity-60" />
//         <div className="relative text-center">
//           <img
//             src="/images/about/home-hotspot-img-1.jpg"
//             alt="Background"
//             className="w-full h-auto object-cover rounded-lg shadow-lg"
//           />
//           <div className="absolute inset-0 bg-black opacity-60"></div>
//           <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24">
//             <div className="m-auto w-full max-w-4xl text-center text-white">
//               <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
//                 {workshop.name}
//               </h3>
//               <div className="text-center my-4">
//                 <Link to="/">
//                   <span className="text-white hover:text-orange-500 duration-500 text-base sm:text-lg md:text-xl lg:text-2xl">
//                     Home
//                   </span>
//                 </Link>
//                 <span className="text-[#A5A5A5] mx-2"> / </span>
//                 <span className="text-[#A5A5A5] text-base sm:text-lg md:text-xl lg:text-2xl">
//                   {workshop.name}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Work-Shop Details */}
//       <section className="py-16 px-8 md:px-16 lg:px-32">
//         <div className="flex justify-center items-start space-x-8">
//           <div className="w-1/2 pr-8">
//             <h2 className="text-3xl font-semibold mb-4">{workshop.name}</h2>
//             <p className="text-gray-300 text-lg leading-relaxed mb-4">
//               Location: {workshop.location}
//             </p>
//             <p className="text-gray-400 mb-4">{workshop.description}</p>
//           </div>

//           <div className="border-l border-gray-600 h-auto"></div>

//           <div className="w-1/2 pl-8">
//             <h2 className="text-3xl font-semibold mb-4">Message Title</h2>
//             <p className="text-gray-400 mb-6">
//               Share your thoughts or reach out to us for more information!
//             </p>

//             <div className="mb-6">
//               <p className="text-gray-300 mb-2">Rating:</p>
//               <div className="flex space-x-2">
//                 <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
//                 <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
//                 <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
//                 <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
//                 <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-400" />
//               </div>
//             </div>

//             <button
//               className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded w-full"
//               onClick={handleChatSelect}
//             >
//               Message me!
//             </button>
//           </div>
//         </div>
//       </section>

//       <ProductCarousel />
//     </div>
//   );
// };

// export default HeroSection;
