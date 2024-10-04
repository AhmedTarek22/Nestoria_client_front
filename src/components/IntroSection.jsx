import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function IntroSection({ pageTitle, pageName }) {
    const translate = useSelector((state) => state.language.translation);

  return (
    <div className="relative text-center ">
      <img
        src=" /images/about/home-hotspot-img-1.jpg"
        alt="Background"

        className="w-full max-h-[400px]  object-cover rounded-lg shadow-lg"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="m-auto w-full max-w-4xl text-center text-white">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            {pageTitle}
          </h3>
          <div className="text-center my-4">
            <Link to="/">
              <span className="text-white hover:text-orange-500 duration-500 text-base sm:text-lg md:text-xl lg:text-2xl">
                {translate.home}
              </span>
            </Link>
            <span className="text-[#A5A5A5] mx-2"> / </span>
            <span className="text-[#A5A5A5] text-base sm:text-lg md:text-xl lg:text-2xl">
              {pageName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroSection;
