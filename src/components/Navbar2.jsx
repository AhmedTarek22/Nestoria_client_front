import {
  faCaretDown,
  faCartPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchContainer from "./searchContainer";
import { CgProfile } from "react-icons/cg";
import { LiaCartPlusSolid } from "react-icons/lia";
import { IoMdLogOut } from "react-icons/io";
import { IoIosMan } from "react-icons/io";
import styles from "../css modules/nab2.module.css";
import { useUserInfoContext } from "../context/UserProvider";
import axiosInstance from "../apis/axiosConfig";

function Navbar2() {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const divRef = useRef(null);
  const { currentUser, isLogin, setIsLogin } = useUserInfoContext();
  const [loginStatus, setLoginStatus] = useState(isLogin);

  useEffect(() => {
    setLoginStatus(isLogin);
  }, [isLogin]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    axiosInstance("/api/v1/fur/profile/logout")
      .then((res) => {
        setIsLogin(false);

        console.log("Logged out:", res);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      })
      .catch((err) => console.log(err));

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="bg-transparent absolute top-[48px] left-0 w-full mt-3 z-50">
      <div className="container mx-auto px-2 flex justify-between items-center w-full lg:w-[1440px]">
        <div className="text-white text-xl sm:text-2xl lg:text-3xl hover:text-[--mainColor] transition-all duration-150 font-serif ">
          {/* <Link to="/">
            <img
              className="w-[230px]"
              src="https://res.cloudinary.com/delh2nrhf/image/upload/v1725672603/ajsz6xaqtvynhmnliwi3.png"
              alt=""
            />
          </Link> */}
          <Link to="/">Nestoria</Link>
        </div>
        <ul className="hidden lg:flex justify-between gap-4 lg:gap-12">
          <li className="text-white hover:text-[--mainColor] transition-all duration-150">
            <Link to="/">HOME</Link>
          </li>

          <li className="text-white hover:text-[--mainColor] transition-all duration-150">
            <Link to="/shop">SHOP</Link>
          </li>
          <li className="text-white hover:text-[--mainColor] transition-all duration-150">
            <Link to="/wishlist">WISHLIST</Link>
          </li>

          <li className="text-white hover:text-[--mainColor] transition-all duration-150">
            <Link to="/aboutus">ABOUT US</Link>
          </li>
          <li className="text-white hover:text-[--mainColor] transition-all duration-150">
            <Link to="/contactus">CONTACT US</Link>
          </li>
        </ul>
        <div className="flex gap-2 sm:gap-4 lg:gap-5 justify-center items-center">
          <FontAwesomeIcon
            onClick={() => {
              setShowSearch(true);
            }}
            className="cursor-pointer text-lg  lg:text-xl text-[#ecececec]  hover:text-[--mainColor] transition-all duration-200"
            icon={faMagnifyingGlass}
          />
          <Link to="/cart">
            <LiaCartPlusSolid className="cursor-pointer text-lg  lg:text-3xl text-[#ecececec]  hover:text-[--mainColor] transition-all duration-200" />
          </Link>
          {/* FIXME: */}

          {isLogin && currentUser ? (
            <div
              ref={divRef}
              className="relative z-50"
              onClick={() => {
                setShowProfile((prev) => !prev);
              }}
            >
              <div className="flex text-white gap-2">
                <CgProfile className="cursor-pointer text-lg  lg:text-2xl text-[#ecececec] hover:text-[--mainColor] transition-all duration-200" />
                <>{currentUser ? currentUser.fullName : "Guest"}</>
              </div>

              {showProfile && (
                <div
                  className={`${styles.profile} bg-black p-1 rounded-lg absolute bottom-[-100px] left-[-41px] z-10`}
                >
                  <p
                    className="flex items-center gap-2 justify-center  cursor-pointer text-white hover:bg-[--mainColor] py-2 px-4 text-center rounded-lg"
                    value="profile"
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    <span>Profile</span>
                    <IoIosMan />
                  </p>
                  <p
                    className="flex items-center gap-2 justify-center cursor-pointer text-white hover:bg-[--mainColor] py-2 px-2 text-center rounded-lg"
                    value="logout"
                    onClick={() => handleLogout()}
                  >
                    <span> Logout</span>
                    <IoMdLogOut className="inline-block" />
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div
              className="text-white cursor-pointer hover:text-[--mainColor] transition-all duration-200"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login/Register
            </div>
          )}
          {showSearch && <SearchContainer setShowSearch={setShowSearch} />}
        </div>
      </div>
    </div>
  );
}

export default Navbar2;
