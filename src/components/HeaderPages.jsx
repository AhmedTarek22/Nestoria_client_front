import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export function HeaderPages({ namePage }) {
    const translate = useSelector((state) => state.language.translation);

  return (
    <section className="relative flex w-full h-[300px] md:h-[450px]">
      <div
        style={{
          backgroundImage: "url('/home-hotspot-img-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          opacity: "0.45",
        }}
        className="absolute top-0 left-0 w-full h-full"
      ></div>
      <div className="relative m-auto w-fit">
        <h3 className="text-5xl text-white">{namePage}</h3>
        <div className="text-center my-4">
          <Link to="/">
            <span className="text-white hover:text-orange-500 duration-500">
              {translate.home}
            </span>
          </Link>
          <span className="text-[#A5A5A5]"> / </span>
          <span className="text-[#A5A5A5]">{namePage}</span>
        </div>
      </div>
    </section>
  );
}
