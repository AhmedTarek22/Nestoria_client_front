import { GiCheckMark } from "react-icons/gi";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCouch,
  faBlender,
  faBriefcase,
  faBed,
  faChair,
} from "@fortawesome/free-solid-svg-icons";
import IntroSection from "../components/IntroSection";

function AboutUs() {
  return (
    <div>
      {/* Section one*/}
      <IntroSection pageTitle="About Us" pageName="About Us" />

      {/* Section Two */}
      <div className="homeHub flex flex-col md:flex-row container lg:w-[1440px] mx-auto gap-4 py-20 my-[40px] px-[15px]">
        <div className="first flex-1">
          <p className="text-[--mainColor]">WE DESIGN</p>
          <h2 className="text-xl md:text-2xl lg:text-4xl text-white">
            World Class Furniture For Ultimate Comfort
          </h2>
          <p className="my-4 line-clamp-4 text-[#dfddddd2]">
            As eleifend mattis ligula, the door is loaded with urns at the
            borders. Aeneas vehicles do not belong to members of the arc. The
            whole protein and the price is flattering. The class is suitable for
            the silent partners who turn to the shores through our marriages,
            through the Hymenaean projects.
          </p>
          <img alt="example" src="/images/about/first.jpg" />
        </div>
        <div className="second flex-1">
          <img alt="example" src="/images/about/second.jpg" />
          <h2 className="text-xl md:text-2xl lg:text-4xl text-white mt-4">
            Crafting Quality Furnitre
          </h2>
          <div className="my-6 line-clamp-4 text-[#dfddddd2]">
            Integer dapibus ac dui pretium blandit. Class aptent taciti sociosqu
            ad litora torquent per conubia nostra, per inceptos himenaeos. Ut
            eleifend mattis ligula, porta finibus urna gravida at. Aenean
            vehicula sodales arcu non mattis.
            <div className="tip flex justify-start mt-2 items-center gap-2">
              <GiCheckMark className="text-[--mainColor]" />
              <span>
                But the eleifend of the estate, the gate of the border, the urn
                led at.
              </span>
            </div>
            <div className="tip flex justify-start mt-2 items-center gap-2">
              <GiCheckMark className="text-[--mainColor]" />
              <span>Ginteger proteins and dui are suitable for blanss.</span>
            </div>
            <div className="tip flex justify-start mt-2 items-center gap-2">
              <GiCheckMark className="text-[--mainColor]" />
              <span>Kenean vehicles are not owned by members of the arc.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Three */}
      <section className="relative py-8">
        <div className="relative">
          <img
            src="/images/about/counter-bg-h2.jpg"
            alt="Counter Background"
            className="w-full h-48 md:h-64 lg:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>{" "}
          {/* تراكب غامق */}
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-white border-opacity-50 overflow-hidden">
            <div className="flex flex-col items-center justify-center space-y-2 border-b md:border-b-0 md:border-r border-white border-opacity-50 h-full p-2 md:p-4">
              <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                10k+
              </h2>
              <p className="text-xs md:text-sm lg:text-base xl:text-lg text-white">
                Products Sold
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 border-b md:border-b-0 md:border-r border-white border-opacity-50 h-full p-2 md:p-4">
              <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                35
              </h2>
              <p className="text-xs md:text-sm lg:text-base xl:text-lg text-white">
                Years Service
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 border-b md:border-b-0 md:border-r border-white border-opacity-50 h-full p-2 md:p-4">
              <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                450
              </h2>
              <p className="text-xs md:text-sm lg:text-base xl:text-lg text-white">
                Outlets Worldwide
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 border-b lg:border-b-0 h-full p-2 md:p-4">
              <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                1000+
              </h2>
              <p className="text-xs md:text-sm lg:text-base xl:text-lg text-white">
                Satisfied Customers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Four */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[--mainColor] mb-4 text-sm md:text-base lg:text-lg">
              DIVERSE RANGE
            </p>
            <h2 className="text-xl md:text-2xl lg:text-4xl text-white">
              Customized Furniture
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex justify-center items-center">
              <img
                src="/images/about/Home-3-Category-04 (1).jpg"
                alt="Customized Furniture"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center border border-white border-opacity-50 p-6 rounded-md hover:bg-[--mainColor] transition duration-300">
                <FontAwesomeIcon
                  icon={faUtensils}
                  className="text-4xl sm:text-5xl text-white mb-3"
                />
                <p className="text-base sm:text-lg md:text-xl text-white">
                  Dining Room
                </p>
              </div>

              <div className="flex flex-col items-center justify-center border border-white border-opacity-50 p-6 rounded-md hover:bg-[--mainColor] transition duration-300">
                <FontAwesomeIcon
                  icon={faCouch}
                  className="text-4xl sm:text-5xl text-white mb-3"
                />
                <p className="text-base sm:text-lg md:text-xl text-white">
                  Living Room
                </p>
              </div>

              <div className="flex flex-col items-center justify-center border border-white border-opacity-50 p-6 rounded-md hover:bg-[--mainColor] transition duration-300">
                <FontAwesomeIcon
                  icon={faBlender}
                  className="text-4xl sm:text-5xl text-white mb-3"
                />
                <p className="text-base sm:text-lg md:text-xl text-white">
                  Kitchen
                </p>
              </div>

              <div className="flex flex-col items-center justify-center border border-white border-opacity-50 p-6 rounded-md hover:bg-[--mainColor] transition duration-300">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="text-4xl sm:text-5xl text-white mb-3"
                />
                <p className="text-base sm:text-lg md:text-xl text-white">
                  Office
                </p>
              </div>

              <div className="flex flex-col items-center justify-center border border-white border-opacity-50 p-6 rounded-md hover:bg-[--mainColor] transition duration-300">
                <FontAwesomeIcon
                  icon={faBed}
                  className="text-4xl sm:text-5xl text-white mb-3"
                />
                <p className="text-base sm:text-lg md:text-xl text-white">
                  Bedroom
                </p>
              </div>

              <div className="flex flex-col items-center justify-center border border-white border-opacity-50 p-6 rounded-md hover:bg-[--mainColor] transition duration-300">
                <FontAwesomeIcon
                  icon={faChair}
                  className="text-4xl sm:text-5xl text-white mb-3"
                />
                <p className="text-base sm:text-lg md:text-xl text-white">
                  Waiting Hall
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Five */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[--mainColor]">COMFORT CRAFTERS</p>
            <h2 className="text-xl md:text-2xl lg:text-4xl text-white">
              Special Team
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="flex flex-col items-center">
              <img
                src="/images/about/Home-2-Team-01.jpg"
                alt="Service 1"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">chales scarter</h3>
              <p className="text-[#dfddddd2]">CEO</p>
            </div>
            {/* Service 2 */}
            <div className="flex flex-col items-center">
              <img
                src="/images/about/Home-2-Team-03.jpg"
                alt="Service 1"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">chales scarter</h3>
              <p className="text-[#dfddddd2]">VP SALES</p>
            </div>
            {/* Service 3 */}
            <div className="flex flex-col items-center">
              <img
                src="/images/about/Home-2-Team-01.jpg"
                alt="Service 1"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">chales scarter</h3>
              <p className="text-[#dfddddd2]">PRODUCT DESIGNER</p>
            </div>
            {/* Service 4 */}
            <div className="flex flex-col items-center">
              <img
                src="/images/about/Home-2-Team-03.jpg"
                alt="Service 4"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Roger</h3>
              <p className="text-[#dfddddd2]">Web Devolper</p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-20">
        <div className="relative">
          <img
            src="/images/about/Brand-Logo-BG-Images-03.jpg"
            alt="Background"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-8">
            <p className="text-[--mainColor] mb-4 text-sm md:text-base lg:text-lg">
              ART OF COMFORT
            </p>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
              Transforming Spaces
            </h2>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
              Transforming Style
            </h2>

            <div className="mb-4 w-full max-w-md md:max-w-lg">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your mail id here"
                  className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:border-[--mainColor] bg-transparent"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <svg
                    className="h-5 w-5 text-[--mainColor]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm md:text-base">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-[--mainColor] rounded focus:ring-2 focus:ring-[--mainColor]"
              />
              <span>Your email is safe with us, we don't spam.</span>
              <a
                href="#"
                className="text-blue-400 hover:text-blue-600 underline ml-2"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
