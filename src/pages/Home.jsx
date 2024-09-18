import styles from "../css modules/home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaArrowsToDot } from "react-icons/fa6";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// import { useInView } from "framer-motion";
import { GiCheckMark } from "react-icons/gi";
import { GiSofa } from "react-icons/gi";
import { GiBedLamp } from "react-icons/gi";
import { BiCabinet } from "react-icons/bi";
import { MdShelves } from "react-icons/md";
import { MdTableChart } from "react-icons/md";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { MdDinnerDining } from "react-icons/md";
import { useEffect, useState } from "react";
import { GiKitchenScale } from "react-icons/gi";
import { LuIndianRupee } from "react-icons/lu";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import axios from "axios";
import Loader from "../components/Loader";
import LazyLoadedItem from "../components/LazyLoadedItem";
import { useSearchContext } from "../context/SearchContext";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const [categoryName, setCategoryName] = useState("Home Decoration");
  const [collectionList, setCollectionList] = useState([]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const navigate = useNavigate();
  const [currentImg, setCurrentImg] = useState(
    "/images/home/Sofa-Home-1-Section-3-01.jpg"
  );
  const homeImgUrls = [
    "/images/home/3.jpg",
    "/images/home/2.jpg",
    "/images/home/1.jpg",
  ];
  const collectionName = [
    "Home Decoration",
    "Office Decoration",
    "Indoor Decoration",
    "Outdoor Decoration",
  ];

  const customerReviews = [
    {
      name: "John Doe",
      country: "USA",
      review:
        "I was thoroughly impressed with the level of service I received. From start to finish, the team was attentive, professional, and made sure all my needs were met. The product itself is top-notch, with a quality that truly stands out in the market. I highly recommend this company to anyone looking for excellence.",
      image: "/images/home/man1.jpg",
    },
    {
      name: "Maria Garcia",
      country: "Spain",
      review:
        "My experience with this company was nothing short of amazing. The customer support was always available to answer my questions, and the delivery was faster than I expected. The product exceeded my expectations in every way – from the materials used to the attention to detail in the design. I'll definitely be a returning customer.",
      image: "/images/home/man2.jpg",
    },
    {
      name: "Liu Wei",
      country: "China",
      review:
        "This was one of the best shopping experiences I've ever had. The website was easy to navigate, the purchasing process was straightforward, and the product arrived in perfect condition. The quality is absolutely phenomenal, and I can tell that this company really cares about its customers. I will recommend it to all my friends and family.",
      image: "/images/home/man3.jpg",
    },
    {
      name: "Ahmed Ali",
      country: "Egypt",
      review:
        "I cannot speak highly enough about the service I received. The team went above and beyond to ensure I was happy with my purchase. The quality of the product is simply outstanding, and it has become one of my favorite items. I appreciate the dedication to customer satisfaction and will definitely be shopping here again.",
      image: "/images/home/man4.jpg",
    },
    {
      name: "Sophie Dubois",
      country: "France",
      review:
        "The level of care and attention I received from this company was incredible. Every step of the way, I felt valued as a customer. The product is beautiful, well-made, and exactly what I was looking for. I am so pleased with my purchase and will be recommending this company to everyone I know. A truly five-star experience!",
      image: "/images/home/man5.jpg",
    },
  ];

  const sections = [
    {
      name: "Sofa",
      icon: <GiSofa />,
      img: "/images/home/Sofa-Home-1-Section-3-01.jpg",
    },
    {
      name: "Cabinet",
      icon: <BiCabinet />,
      img: "/images/home/Cabinet-Home-1-Section-3-02.jpg",
    },
    {
      name: "Shelving Units",
      icon: <MdShelves />,
      img: "/images/home/Shelving Units.jpg",
    },
    {
      name: "Tea Table",
      icon: <MdTableChart />,
      img: "/images/home/tea table.jpg",
    },
    {
      name: "Decors",
      icon: <GiBedLamp />,
      img: "/images/home/decors.jpg",
    },
    {
      name: "Office Table",
      icon: <HiBuildingOffice2 />,
      img: "/images/home/office table.jpg",
    },
    {
      name: "Kitchen Furniture",
      icon: <GiKitchenScale />,
      img: "/images/home/kitchenfurniture.jpg",
    },
    {
      name: "Storage Furniture",
      icon: <MdDinnerDining />,
      img: "/images/home/storage furniture.jpg",
    },
  ];

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/v1/fur/products/homeproducts"
        );

        const filteredCollection = response.data[1].homeProducts.filter(
          (collection) => collection.category === categoryName
        );
        setCollectionList(filteredCollection);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollection();
  }, [categoryName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
    } else if (!isChecked) {
      setError("You must agree to the privacy policy.");
    } else {
      setError("");
      // Handle form submission logic here
    }
  };
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        effect="fade"
        slidesPerView={1}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
      >
        {homeImgUrls.map((url, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="sectionOne relative ">
                <div
                  className={`${styles.text} flex flex-col gap-1 justify-center items-center absolute top-[30%] left-1/2 z-30`}
                >
                  <p className="text-[--mainColor] hidden md:block">
                    SMART SOLUTION
                  </p>
                  <h1 className="text-center text-lg md:text-3xl  lg:text-4xl xl:text-5xl 2xl:text-6xl my-2 md:my-3 lg:my-1 text-[#ffffffdc] ">
                    Enjoy With Style & Comfort
                  </h1>
                  <p className="text-[#dddadaf5]   text-center my-1 md:my-2 line-clamp-1 md:line-clamp-2 lg:line-clamp-3">
                    The price of the product is very low, or the price of the
                    book. Some like the ferry line from diam concern For the bed
                    of two valleys. But the price of the sauce is the price of
                    the bed how much does it matter to the pellentesque tortor
                  </p>
                  <button
                    onClick={() => {
                      navigate("/shop");
                    }}
                    className={`${styles.shopNowBtn} relative bg-[--mainColor] text-[white] py-1 lg:py-2 px-7 rounded-3xl text-sm md:text-lg lg:text-xl mt-2`}
                  >
                    <span className="pr-8"> Shop Now</span>
                    <span className=" absolute top-1/2 translate-y-[-50%] right-1 bg-white p-[1px] lg:p-[7px] rounded-full flex justify-center items-center  text-black">
                      <IoIosArrowRoundForward className="text-2xl arrow" />
                    </span>
                  </button>
                </div>
                <img src={url} alt="homeImg" className="w-full h-full" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* section two */}
      <div className="w-full bg-[#101010]  py-[120px]">
        <div className="homeHub flex flex-col md:flex-row  container lg:w-[1440px] mx-auto gap-4 py-20 my-[40px] px-[15px]">
          <div className="first flex-1">
            <p className="text-[--mainColor]">Home Decor Hub</p>
            <h2 className="text-xl md:text-2xl lg:text-4xl text-white">
              Exceptional Furniture's For Indoor & Outdoor
            </h2>
            <p className="my-4 line-clamp-4 text-[#dfddddd2] ">
              As eleifend mattis ligula, the door is loaded with urns at the
              borders. Aeneas vehicles do not belong to members of the arc. The
              whole protein and the price is flattering. The class is suitable
              for the silent partners who turn to the shores through our
              marriages, through the Hymenaean projects.
            </p>
            <LazyLoadedItem x="-100">
              <img alt="example" src="/images/home/first.jpg" />
            </LazyLoadedItem>
          </div>
          <div className="second flex-1">
            <LazyLoadedItem x="100">
              <img alt="example" src="/images/home/second.jpg" />
            </LazyLoadedItem>

            <h2 className="text-xl md:text-2xl lg:text-4xl text-white mt-4">
              Discover Endless Designs
            </h2>
            <div className="my-6 line-clamp-4 text-[#dfddddd2] ">
              Integer dapibus ac dui pretium blandit. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. Ut eleifend mattis ligula, porta finibus urna gravida
              at. Aenean vehicula sodales arcu non mattis.
              <div className="tip flex justify-start mt-2 items-center gap-2">
                <GiCheckMark className="text-[--mainColor]" />
                <span>
                  But the eleifend of the estate, the gate of the border, the
                  urn led at.
                </span>
              </div>
              <div className="tip flex justify-start mt-2 items-center gap-2">
                <GiCheckMark className="text-[--mainColor]" />
                <span>Ginteger proteins and dui are suitable for blanss.</span>
              </div>
              <div className="tip flex justify-start mt-2 items-center gap-2">
                <GiCheckMark className="text-[--mainColor]" />
                <span>
                  Kenean vehicles are not owned by members of the arc.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* section two */}
      {/* section three */}
      <div className={`${styles.sectionThree} bg-black relative`}>
        <div className="relative">
          <img
            src={currentImg}
            alt="currentImg"
            className="w-full h-auto transition-opacity duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-black opacity-40 z-10" />
          <div className="sectionsWithIcons absolute inset-0 flex items-center justify-center transition-all duration-200 z-20">
            <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 transition-all duration-200 px-3">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="link text-center flex items-center cursor-pointer justify-center transition-all duration-200 hover:scale-105"
                  onMouseEnter={() => setCurrentImg(section.img)}
                  onMouseLeave={() => setCurrentImg(currentImg)}
                >
                  <span className="text-white opacity-[0.7] text-xs md:text-xl lg:text-2xl 2xl:text-5xl hover:opacity-[1] font-bold transition-colors z-30">
                    {section.name}
                  </span>
                  <span className="ml-2 text-[--mainColor] text-xl md:text-3xl transition-colors z-30">
                    {section.icon}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* section three */}
      {/* Collection */}
      <div className="w-full bg-[#2c2c2c]  py-[120px]">
        <div className="container lg:w-[1440px] mx-auto flex flex-col justify-center items-center my-10">
          <p className="text-[--mainColor]">EXPLORE OUR</p>
          <h2 className="text-2xl md:text-4xl lg:text-6xl text-white">
            Luxurious Haven Collection
          </h2>
          <div className="collectionsName my-8 flex justify-center items-center px-3">
            <ul className="flex justify-center items-center gap-4 text-white">
              {collectionName.map((collection) => {
                return (
                  <li
                    className={`cursor-pointer  ${
                      collection === categoryName ? "border-b-[1px]" : ""
                    }`}
                    key={collection}
                    onClick={() => {
                      setCategoryName(collection);
                    }}
                  >
                    {collection}
                  </li>
                );
              })}
            </ul>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="boxs grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto px-3">
              {collectionList.map((product) => {
                return (
                  <div className="box" key={product.id}>
                    <div className="imgContainer relative hover:cursor-pointer hover:scale-105 transition-all duration-200">
                      <Link to={`/product-details/${product.id}`}>
                        <div className="relative group">
                          <img
                            src={product.images[0]}
                            alt="collectionImg"
                            className="rounded-lg"
                          />
                          <img
                            src={product.images[1]}
                            alt="Product Hover"
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          />
                        </div>
                      </Link>
                      <span className="absolute top-3 right-2 text-white bg-[--mainColor] p-1 text-xs rounded">
                        ON SALE
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-[#e2e1e1d0] my-2">
                        {product.category}
                      </p>
                      <h2 className="text-white text-md md:text-xl lg:text-2xl font-semibold">
                        {product.name}
                      </h2>
                      <p className="flex justify-center items-center text-white my-2">
                        <LuIndianRupee />
                        {product.price} - <LuIndianRupee /> {product.price + 50}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {/* Collection */}
      {/* Slider */}
      <div
        className={`${styles.mianContainer} w-full  overflow-hidden mx-auto flex justify-center items-center h-[60px] relative bg-[--mainColor] `}
      >
        <p
          className={`${styles.headeranimation} z-30 text-white flex items-center gap-10 py-3 text-xl`}
        >
          <span>
            Tailored Furniture For Specific Needs.
            <span>
              <FaArrowsToDot className="inline" />
            </span>
          </span>
          <span>Ensure Durability And Longevity.</span>
          <span>
            <FaArrowsToDot className="inline" />
          </span>
          <span>Diverse Range Of Furniture's.</span>
          <span>
            <FaArrowsToDot className="inline" />
          </span>
        </p>
        <p
          className={`${styles.headeranimation2} z-30 text-white flex items-center gap-10 py-3 text-xl`}
        >
          {" "}
          <span>Comfort And High Functionality.</span>
          <span>
            <FaArrowsToDot className="inline" />
          </span>
          <span>Tailored Furniture For Specific Needs.</span>
          <span>
            <FaArrowsToDot className="inline" />
          </span>
          <span>Ensure Durability And Longevity.</span>
          <span>
            <FaArrowsToDot className="inline" />
          </span>
        </p>
      </div>
      {/* Slider */}
      {/* accordian */}
      <div className="w-full bg-[#2c2c2c]  py-[120px] min-h-[875px]">
        <div className="container lg:w-[1440px] flex justify-center items-center mx-auto gap-4 flex-col lg:flex-row ">
          <div className="flex-1 px-3 max-h-[625px] overflow-hidden">
            <p className="text-[--mainColor]">Product related queries</p>
            <h2 className="text-2xl md:text-3xl lg:text-6xl text-white my-5">
              Products & Service
            </h2>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              className="border-b-[1px] border-[#5a5a5a] mb-5"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="text-red-500" />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ background: "#2c2c2c" }}
              >
                <Typography
                  sx={{ color: "white" }}
                  className="hover:text-[--mainColor]"
                >
                  For furniture purchases, do you have financing options?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ background: "#2c2c2c" }}>
                <Typography className="text-[#dddcdccc] max-w-[80%]">
                  Pain should be followed by coaching. Elit duis sad
                  sollicitudin nibh is important. Utrice eros in the course of
                  the high school. Ultricies sad no aquet for the tortor at the
                  auctor urn now. Consectetur adipiscing elit duis trisque
                  sollicitudin nibh sit amet.{" "}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              className="border-b-[1px] border-[#5a5a5a] mb-5"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ background: "#2c2c2c" }}
              >
                <Typography
                  sx={{ color: "white" }}
                  className="hover:text-[--mainColor]"
                >
                  Do you have eco-friendly furniture?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ background: "#2c2c2c" }}>
                <Typography className="text-[#dddcdccc] max-w-[80%]">
                  I need the wisdom of God. What a caricature of a doctor who
                  hates football. Everyone needs to drink and not need to do
                  their homework. It's a great airline for kids. Aliquet lectus
                  proin nibh nisl condimentum id. Ridiculous mus mauris vitae
                  ultricies leo integer.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
              className="border-b-[1px] border-[#5a5a5a] mb-5"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ background: "#2c2c2c" }}
              >
                <Typography
                  sx={{ color: "white" }}
                  className="hover:text-[--mainColor]"
                >
                  Is it possible to follow the delivery of my furniture?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ background: "#2c2c2c" }}>
                <Typography className="text-[#dddcdccc] max-w-[80%]">
                  The yeast of the god's throat in the ornament than the cartoon
                  of the doctor with football arrows. I want to decorate the
                  bed. Morbi, the urn of the employee, but the element of
                  football is easy. Everyone doesn't want to drink or do their
                  homework. I don't hate euismod lacinia at quis risus sed
                  vulputate odio.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
              className="border-b-[1px] border-[#5a5a5a] mb-5"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ background: "#2c2c2c" }}
              >
                <Typography
                  sx={{ color: "white" }}
                  className="hover:text-[--mainColor]"
                >
                  Do you offer design consultations?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ background: "#2c2c2c" }}>
                <Typography className="text-[#dddcdccc] max-w-[80%]">
                  For the pure does not present an element that is easy or
                  natural. Pharetra diam should be a lot of fans. The mountains,
                  pregnant with their partners and born, will give birth to
                  feathers and great thrusts. The price of the product itself is
                  insignificant, or the price of the bed that adorns the pure
                  palate.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
              className="border-b-[1px] border-[#5a5a5a] mb-5"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ background: "#2c2c2c" }}
              >
                <Typography
                  sx={{ color: "white" }}
                  className="hover:text-[--mainColor]"
                >
                  Are custom orders accepted for furniture that isn't in stock?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ background: "#2c2c2c" }}>
                <Typography className="text-[#dddcdccc] max-w-[80%]">
                  It is said that everyone who lived in this street is free from
                  arrows. It is said that it is sad and urgent that someone
                  himself suspended the basketball. Ultricies lake but ugly
                  tincidunt id aquiet risus feugiat. Maecenas was flattered by
                  some of the chocolates he wanted.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="imgContainer flex-1 px-3">
            <LazyLoadedItem x="100">
              <img
                src="/images/home/Home-1-Section-5-3.jpg"
                alt=""
                className="rounded-lg"
              />
            </LazyLoadedItem>
          </div>
        </div>
      </div>
      {/* accordian */}

      {/* Furniture's */}

      <div className="w-full bg-[#131313]  py-[120px] ">
        <div className="container lg:w-[1440px] mx-auto my-10 px-3">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className="text-[--mainColor]">Sleek And Stylish</p>
              <h2 className="text-2xl md:text-3xl lg:text-6xl text-white my-5">
                Innovative Furniture's
              </h2>
            </div>
            <div className="info text-[#d6d5d5d8] w-[40%] line-clamp-3">
              The class is silent. As eleifend mattis ligula, the door is loaded
              with urns at the borders. Aeneas do not own the vehicles of the
              bow. The whole protein and the price is flattering.
            </div>
          </div>
          <div className="imgContainer !mt-[20px] md:!mt-[55px] relative">
            <img src="/images/home/home-hotspot-img-1.jpg" alt="" />
            <DetailsBtn
              top="top-[50%]"
              left="left-[20%]"
              img="/images/home/chair.jpg"
              title="Steel Chair"
              price="$20.00"
            />
            <DetailsBtn
              top="top-[40%]"
              left="left-[62%]"
              img="/images/home/planet.jpg"
              title="Wooden Vase"
              price="$18.00"
            />
            <DetailsBtn
              top="top-[74%]"
              left="left-[65%]"
              img="/images/home/bigChair.jpg"
              title="Soft Cushion Chair"
              price="$40.00"
            />
          </div>
        </div>
      </div>

      {/* Furniture's */}

      {/* our customer */}
      <div className="w-full bg-[#313030]  py-[120px]">
        <div className="container lg-w-[1440px] mx-auto">
          <div className="text text-center ">
            <p className="text-[--mainColor]">Testimonial Time</p>
            <h2 className="text-2xl md:text-3xl lg:text-6xl text-white my-5">
              Our Customers Speak
            </h2>
            <div className="rating flex justify-center items-center mt-8 gap-2">
              <FaStar className="text-[--mainColor]" />
              <FaStar className="text-[--mainColor]" />
              <FaStar className="text-[--mainColor]" />
              <FaStar className="text-[--mainColor]" />
              <FaStar className="opacity-70 text-[--mainColor]" />
            </div>
          </div>
          <Swiper
            modules={[Navigation, Pagination, EffectFade, Autoplay]}
            effect="fade"
            slidesPerView={1}
            navigation
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
          >
            {customerReviews.map((person, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="relative z-10 swiper-slide-custom"
                >
                  <div className="customer text-center">
                    <h2 className="text-white max-w-[800px] mx-auto leading-relaxed my-[60px]">
                      {person.review}
                    </h2>
                    <div className="personContainer">
                      <div className="imgContainer w-[90px] h-[90px] mx-auto mt-[80px] mb-3">
                        <img
                          src={person.image}
                          alt="personImg"
                          className="w-full h-full rounded-full"
                        />
                      </div>
                      <p className="text-[#e6e3e3] text-lg md:text-2xl">
                        {person.name}
                      </p>
                      <p className="text-[#bdbcbcb7]">{person.country}</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      {/* our customer */}

      {/* blog */}
      <div className="w-full bg-[#131313]  py-[120px]">
        <div className="container lg:w-[1440px] mx-auto my-10 px-3">
          <p className="text-[--mainColor]">Get the Latest News</p>
          <h2 className="text-2xl md:text-3xl lg:text-6xl text-white my-5">
            Visit Our Blog
          </h2>
          <div className="flex justify-center items-center gap-5 flex-col lg:flex-row">
            <div className="right flex-1">
              <div className="imgCotainer overflow-hidden">
                <LazyLoadedItem x="-100">
                  <img
                    src="/images/home/blog-01.jpg"
                    alt="blog-01"
                    className="hover:scale-110 transition-all duration-500 cursor-pointer"
                  />
                </LazyLoadedItem>
              </div>
              <p className="date text-[--mainColor] my-3">
                May 27, 2024 -{" "}
                <span className="text-white ml-2">
                  By
                  <span className="hover:text-[--mainColor] cursor-pointer ml-2 transition-all duration-200">
                    Designer
                  </span>
                </span>
              </p>
              <h2 className="text-xl md:text-3xl text-white hover:text-[--mainColor] cursor-pointer transition-all duration-200">
                The Modest Living Space Furnishings Ideas
              </h2>
              <p className="text-[#d4d2d2bb] line-clamp-2 w-[70%] my-3">
                Explore the best solutions for refreshing your home with our
                diverse range of furniture articles. We offer tips and
                inspiration to transform your living spaces into stylish and
                comfortable environments that reflect your personal taste, from
                selecting the right furniture to coordinating colors and decor.
              </p>
            </div>
            <div className="left flex-1 ">
              <div className="box flex justify-center items-center gap-5 h-[180px] mb-6">
                <div className="imgContainer w-[45%] overflow-hidden h-full">
                  <LazyLoadedItem x="100">
                    <img
                      src="/images/home/blog-04.jpg"
                      alt="blog-04"
                      className="h-full rounded-lg hover:scale-110 transition-all duration-500 cursor-pointer"
                    />
                  </LazyLoadedItem>
                </div>
                <div className="info flex-1">
                  <p className="date text-[--mainColor]">May 27, 2024</p>
                  <h2 className="mt-3 text-xl md:text-2xl text-white hover:text-[--mainColor] cursor-pointer transition-all duration-500">
                    Tips For Designing Reading Area Space Smartly
                  </h2>
                  <p className="text-[#d4d2d2bb] line-clamp-2 w-[70%] my-3">
                    Struggling with limited space? Watch this video to explore
                    smart furniture solutions designed to maximize functionality
                    and style in small homes. From multi-purpose pieces to
                    clever storage solutions, you'll find inspiration for making
                    the most of your compact living area.
                  </p>
                </div>
              </div>
              <div className="box flex justify-center items-center gap-5 h-[180px] mb-6">
                <div className="imgContainer w-[45%] overflow-hidden h-full">
                  <LazyLoadedItem x="100">
                    <img
                      src="/images/home/blog-05.jpg"
                      alt="blog-04"
                      className="h-full rounded-lg hover:scale-110 transition-all duration-500 cursor-pointer"
                    />
                  </LazyLoadedItem>
                </div>
                <div className="info flex-1">
                  <p className="date text-[--mainColor]">May 26, 2024</p>
                  <h2 className="mt-3 text-xl md:text-2xl text-white hover:text-[--mainColor] cursor-pointer transition-all duration-500">
                    Easy Way To Furnish Your Home Affordably
                  </h2>
                  <p className="text-[#d4d2d2bb] line-clamp-2 w-[70%] my-3">
                    Transform your bedroom into a relaxing oasis with our
                    essential furniture and decor tips. This video guides you
                    through selecting the right furniture and accessories to
                    create a serene and inviting retreat, perfect for unwinding
                    after a long day.
                  </p>
                </div>
              </div>
              <div className="box flex justify-center items-center gap-5 h-[180px] ">
                <div className="imgContainer w-[45%] overflow-hidden h-full">
                  <LazyLoadedItem x="100">
                    <img
                      src="/images/home/blog-09.jpg"
                      alt="blog-04"
                      className="h-full rounded-lg hover:scale-110 transition-all duration-500 cursor-pointer"
                    />
                  </LazyLoadedItem>
                </div>
                <div className="info flex-1">
                  <p className="date text-[--mainColor]">May 25, 2024</p>
                  <h2 className="mt-3 text-xl md:text-2xl text-white hover:text-[--mainColor] cursor-pointer transition-all duration-500">
                    Minimalist Modern Modular Kitchen Design
                  </h2>
                  <p className="text-[#d4d2d2bb] line-clamp-2 w-[70%] my-3">
                    Discover innovative ways to elevate your living room with
                    our stylish furniture ideas. This video showcases the latest
                    trends and design tips for selecting the perfect pieces to
                    create a cozy and modern living space that reflects your
                    personal style.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* blog */}
      {/* Transforming */}
      <div className="transforming w-full min-h-[160px]">
        <div className="relative h-full w-full">
          <img
            src="/images/home/Hue_Saturation 1.png"
            alt=""
            className="h-full w-full"
          />
          <div className="text text-center mx-auto absolute z-20 top-1/2 left-1/2 transform translate-x-[-50%]  translate-y-[-50%]">
            <p className="text-[--mainColor] ">Art Of Comfort</p>
            <h2 className="text-xl md:text-3xl lg:text-6xl text-white my-2 md:my-5 ">
              Transforming Spaces,
            </h2>
            <h2 className="text-2xl md:text-3xl lg:text-6xl text-white my-2 md:my-5 hidden md:block">
              Transforming Style
            </h2>
            <form className="relative w-[80%] mx-auto" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                className="placeholder:text-sm w-full placeholder:md:text-lg py-1 md:py-3 px-6 bg-transparent border border-[--mainColor] rounded-3xl  outline-none caret-[#6a6a6a] text-[#979696]"
                placeholder="Enter Your Email Here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button type="submit">
                <IoSendSharp className="absolute top-[27%] right-2 transform translate-y-[-50%] bg-white w-9 h-[20%]  lg:h-[40%] rounded-full text-black p-[9px] lg:[7px] cursor-pointer hover:bg-[--mainColor] hover:text-white transition-all duration-500 hidden lg:block" />
              </button>

              <div className="flex justify-center items-center mt-2 lg:mt-4 mb-2">
                <input
                  type="checkbox"
                  id="privacyPolicy"
                  className="mr-2 w-4 h-4 accent-[--mainColor] bg-gray-200 checked:bg-[--mainColor] checked:border-transparent "
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  required
                />
                <label
                  htmlFor="privacyPolicy"
                  className="text-[#979696] line-clamp-2 text-sm whitespace-nowrap"
                >
                  Your email is safe with us, we don't spam.
                  <Link href="/privacy-policy" className="underline text-white">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
      {/* Transforming */}
    </div>
  );
}
export default Home;

export const DetailsBtn = ({ top, left, img, title, price }) => {
  const [showDtails, setShowDetails] = useState(false);
  function changeDetails() {
    setShowDetails((prev) => !prev);
  }
  return (
    <div className={`absolute ${top} ${left}`}>
      <button
        className={`bg-[--mainColor] text-white text-md lg:text-3xl w-[20px] h-[20px] md:w-[25px] md:h-[25px] lg:w-[34px] lg:h-[34px] flex justify-center items-center lg:items-start rounded-full transition-all duration-500 ${
          showDtails ? "rotate-45" : ""
        }`}
        onClick={changeDetails}
      >
        <span className="leading-none ">+</span>
      </button>

      <div
        className={`rounded-lg details absolute text-white flex-col md:flex-row flex justify-start mt-2 items-center gap-2 bg-[#101010] py-[20px] lg:py-[53px] px-3 min-w-[140px] max-h-[75px] md:min-w-[250px] md:max-h-[87px] lg:min-w-[290px] lg:max-h-[87px] ${
          showDtails ? "opacity-100" : "opacity-0"
        } transition-all duration-500 z-10 rtl`}
      >
        <div className="imgContainer bg-[#282828] max-h-[80px]  p-3">
          <img
            src={`${img}`}
            alt="detailsImg"
            className="rounded-lg max-w-full max-h-full w-[60px]"
          />
        </div>
        <div className="text ml-3">
          <p>{title}</p>
          <p>From {price}</p>
        </div>
      </div>
    </div>
  );
};
