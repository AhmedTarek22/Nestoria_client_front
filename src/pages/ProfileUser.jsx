import { useState } from "react";
import { HeaderPages } from "../components/HeaderPages";
import { Orders } from "../components/Profile components/Orders";
import { AccountDetails } from "../components/Profile components/AccountDetails";
import { BillingAddress } from "../components/Profile components/BillingAddress";
import { ShippingAddress } from "../components/Profile components/ShippingAddress";

import { Link, useNavigate } from "react-router-dom";
import { useUserInfoContext } from "../context/UserProvider";
import Loader from "../components/Loader";
import axiosInstance from "../apis/axiosConfig";

function ProfileUser() {
  const itemsSlide = [
    "Dashboard",
    "Orders",
    "Addresses",
    "Account details",
    "Wishlist",
    "Log out",
  ];

  const [itemSelected, setItemSelected] = useState("Dashboard");
  const [typeAddress, setTypeAddress] = useState("");
  const { currentUser, isLogin, setIsLogin } = useUserInfoContext();

  const handleTypeAddress = (action) => {
    if (action === "Add") {
      setTypeAddress(action);
    } else if (action === "Edit") {
      setTypeAddress(action);
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    axiosInstance("/api/v1/fur/profile/logout")
      .then((res) => {
        setIsLogin(false);
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
    <div>
      {/* section header */}
      <HeaderPages namePage="My Account"></HeaderPages>

      <section
        style={{
          backgroundImage: "url('/body-bg.png')",
          backgroundPosition: "left top",
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
          backgroundAttachment: "scroll",
          backgroundColor: "#101010",
        }}
        className="py-20 px-4 md:px-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 justify-between">
          <ul className="col-span-3">
            {itemsSlide.map((item) => (
              <li
                tabIndex="0"
                key={item}
                onClick={() => setItemSelected(item)}
                className={`text-white text-lg cursor-pointer py-3 px-8 my-3 hover:bg-[#C26510] ${
                  itemSelected === item && "bg-[#C26510]"
                } duration-500 border border-[#393938] rounded-full`}
              >
                {item === "Wishlist" ? (
                  <Link to="/wishlist">{item}</Link>
                ) : item === "Log out" ? <span onClick={(() => handleLogout())}>{item}</span> : (
                  <span>{item}</span>
                )}
              </li>
            ))}
          </ul>
          <div className="col-span-9 mt-6 md:mt-3 mx-10">
            {/* Dashboard */}
            {itemSelected === "Dashboard" && (
              <div>
                {!currentUser ? (
                  <Loader />
                ) : (
                  <h3 className="text-lg text-[#A9A9A9]">
                    Hello {currentUser.fullName}
                  </h3>
                )}
                <p className="text-[#A9A9A9] mt-4">
                  From your account dashboard you can view your recent orders,
                  manage your shipping and billing addresses, and edit your
                  password and account details.
                </p>
              </div>
            )}
            {/* Orders component */}
            {itemSelected === "Orders" && <Orders></Orders>}
            {/* Addresses component */}
            {itemSelected === "Addresses" &&
              (typeAddress ? (
                typeAddress === "Edit" ? (
                  <BillingAddress />
                ) : (
                  typeAddress === "Add" && <ShippingAddress />
                )
              ) : (
                <div>
                  <p className="text-[#A2A2A2]">
                    The following addresses will be used on the checkout page by
                    default.
                  </p>
                  <div className="my-6 p-2 border-2 border-[#393939]">
                    <div className="flex flex-col p-5 border-2 border-[#393939] border-dashed">
                      <div className="flex justify-between">
                        <h3 className="text-xl text-white">Billing Address</h3>
                        <Link
                          onClick={() => handleTypeAddress("Edit")}
                          className="text-[#A2A2A2] cursor-pointer hover:text-[#C26510] duration-500"
                        >
                          Edit
                        </Link>
                      </div>
                      <span className="mt-5 italic font-bold text-[#A2A2A2]">
                        {currentUser.fullName}
                      </span>
                    </div>
                  </div>

                  <div className="p-2 border-2 border-[#393939]">
                    <div className="flex flex-col p-5 border-2 border-[#393939] border-dashed">
                      <div className="flex justify-between">
                        <h3 className="text-xl text-white">Shipping address</h3>
                        <Link
                          onClick={() => handleTypeAddress("Add")}
                          className="text-[#A2A2A2] cursor-pointer hover:text-[#C26510] duration-500"
                        >
                          Add
                        </Link>
                      </div>
                      <span className="mt-5 font-bold text-[#A2A2A2]">
                        You have not set up this type of address yet.
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            {/* Account details component */}
            {itemSelected === "Account details" && (
              <AccountDetails></AccountDetails>
            )}
            {/* Log out */}
            {itemSelected === "Log out"}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileUser;