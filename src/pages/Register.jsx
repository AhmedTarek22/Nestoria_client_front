import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userApi from "../apis/userApi";
import InputField from "../components/Input";
import { FaRegEyeSlash } from "react-icons/fa";
import IntroSection from "../components/IntroSection";
import { IoIosWarning } from "react-icons/io";
import { toast } from "react-toastify";
import { IoIosArrowDropdown } from "react-icons/io";
import Loader from "../components/Loader";
import { IoEye } from "react-icons/io5";
import { useSearchContext } from "../context/SearchContext";
function Register() {
  const { search } = useSearchContext();
  console.log(search);

  const [user, setUser] = useState({
    fullName: "",
    phone: "",
    address: "",
    role: "",
    passwordConfirm: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\*\@\%\$\#]).{8,30}$/;
  const regexName = /^[a-zA-Z][a-zA-Z ]{2,30}$/;
  const regexPhone = /^01[0125][0-9]{8}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  useEffect(() => {
    window.scrollTo(0, 300);
  }, []);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value) {
          error = "Full name is required";
        } else if (!regexName.test(value)) {
          error = "Full name is invalid";
        }
        break;
      case "address":
        if (!value) {
          error = "Address is required";
        }
        break;
      case "role":
        if (!value) {
          error = "Role is required";
        }
        break;
      case "phone":
        if (!value) {
          error = "Phone is required";
        } else if (!regexPhone.test(value)) {
          error = "Phone is invalid";
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!emailRegex.test(value)) {
          error = "Email is invalid";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (!passwordRegex.test(value)) {
          error = "use upper, lower, digit, and special char from @ # % $";
        }
        break;
      case "passwordConfirm":
        if (!value) {
          error = "Password confirmation is required";
        } else if (value !== user.password) {
          error = "Password confirmation must match the password";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const newErrors = {};
    Object.keys(user).forEach((key) => {
      const error = validateField(key, user[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setIsLoading(true);
        const { data: user2 } = await userApi.createUser(user);
        localStorage.setItem("token", user2.token);
        setSuccess("Check your email to verify your account.");
        navigate("/login");
        toast.success("Check your email to verify your account");
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          // setServerErr(error.response.data.message);
          toast.error(error.response.data.message);
          // console.log(error.response.data.message);
        } else {
          // setServerErr("Something went wrong. Please try again later.");
          toast.error("Something went wrong. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      // setServerErr("Please fix the errors in the form.");
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <>
      <IntroSection pageTitle="Register" pageName="Register" />

      <div
        className="flex justify-center items-center min-h-[80vh] pt-5 relative"
        style={{
          backgroundImage: "url('/body-bg.png')",
          backgroundPosition: "left top",
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
          backgroundAttachment: "scroll",
          backgroundColor: "#101010",
        }}
      >
        {isLoading && <Loader />}
        <div className="bg-black p-10 rounded-xl shadow-xl w-full max-w-2xl">
          <h2 className="text-white text-3xl font-200 mb-3 text-center font-[serif]">
            Register Form
          </h2>
          <p className="text-[#c7c6c6b9] text-md text-center mb-5">
            Do not have an account?
          </p>
          <form onSubmit={handleSubmit}>
            <span className="text-green-500 text-sm mt-2">{success} </span>
            <div className="h-[40px] mb-[40px]">
              <div className="mb-2 inputDiv  py-1">
                <input
                  className={`w-full px-4 py-3 bg-black text-white text-sm rounded-full focus:outline-none focus:ring-2 ${
                    errors.fullName
                      ? "focus:ring-red-500 border-red-500 "
                      : "focus:ring-orange-500 border-orange-500"
                  }`}
                  id="fullName"
                  name="fullName"
                  type="text"
                  style={{ border: "1px solid #A5A5A5" }}
                  value={user.fullName}
                  onChange={(e) =>
                    setUser({ ...user, fullName: e.target.value })
                  }
                  onBlur={handleBlur}
                  placeholder="Full name*"
                />
                {errors.fullName ? (
                  <span
                    className="text-red-500 text-sm "
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      gap: "5px",
                      margin: "5px",
                    }}
                  >
                    {errors.fullName}{" "}
                    <IoIosWarning className="text-yellow-500" />
                  </span>
                ) : (
                  <span
                    className="text-red-500 text-sm "
                    style={{ display: "none" }}
                  >
                    {errors.fullName}{" "}
                    <IoIosWarning className="text-yellow-200" />
                  </span>
                )}
              </div>
            </div>

            <div className="h-[40px] mb-[40px]">
              <InputField
                id="email"
                name="email"
                type="email"
                value={user.email}
                placeholder="please Enter your Email*"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                onBlur={handleBlur}
                error={errors.email}
              />
            </div>
            <div className="h-[40px] mb-[40px]">
              <div className="mb-2 py-1 relative">
                <select
                  name="role"
                  value={user.role}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                  onBlur={handleBlur}
                  style={{ border: "1px solid #A5A5A5" }}
                  className={` appearance-none w-full px-4 py-3 bg-black text-[#d8d6d6d5] text-sm rounded-full focus:outline-none focus:ring-2 ${
                    errors.fullName
                      ? "focus:ring-red-500 border-red-500 "
                      : "focus:ring-orange-500 border-orange-500"
                  }`}
                >
                  <option value="" disabled>
                    <span> Role* </span>
                  </option>
                  <option value="client">Client</option>
                  <option value="workshop">Workshop</option>
                </select>
                {errors.role ? (
                  <span
                    className="text-red-500 text-sm "
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      gap: "5px",
                      margin: "5px",
                    }}
                  >
                    {errors.role} <IoIosWarning className="text-yellow-500" />
                  </span>
                ) : (
                  <span
                    className="text-red-500 text-sm "
                    style={{ display: "none" }}
                  >
                    {errors.role} <IoIosWarning className="text-yellow-500" />
                  </span>
                )}
                <span className="absolute text-[white] top-[17px] text-xl right-5">
                  <IoIosArrowDropdown />
                </span>
              </div>
            </div>
            <div className="container mx-auto justify-between flex flex-col md:gap-8 md:flex-row ">
              <div className="h-[40px] mb-[40px] flex-grow">
                <InputField
                  id="phone"
                  name="phone"
                  type="text"
                  value={user.phone}
                  placeholder="phone*"
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  onBlur={handleBlur}
                  error={errors.phone}
                />
              </div>

              <div className="h-[40px] mb-[40px] flex-grow">
                <div className="mb-2 py-1 relative">
                  <select
                    name="address"
                    value={user.address}
                    onChange={(e) =>
                      setUser({ ...user, address: e.target.value })
                    }
                    onBlur={handleBlur}
                    style={{ border: "1px solid #A5A5A5" }}
                    className={`appearance-none w-full px-4 py-3 bg-black text-[#d8d6d6d5] text-sm rounded-full focus:outline-none focus:ring-2 ${
                      errors.address
                        ? "focus:ring-red-500 border-red-500 "
                        : "focus:ring-orange-500 border-orange-500"
                    }`}
                  >
                    <option value="" disabled>
                      Address*
                    </option>
                    <option value="Egypt">Egypt</option>
                    <option value="Palestine">Palestine</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Syria">Syria</option>
                  </select>
                  {errors.address ? (
                    <span
                      className="text-red-500 text-sm "
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "5px",
                        margin: "5px",
                      }}
                    >
                      {errors.address}{" "}
                      <IoIosWarning className="text-yellow-500" />
                    </span>
                  ) : (
                    <span
                      className="text-red-500 text-sm "
                      style={{ display: "none" }}
                    >
                      {errors.address}
                      <IoIosWarning className="text-yellow-500" />
                    </span>
                  )}
                  <span
                    className={`absolute text-[white] top-[18px] text-xl right-5`}
                  >
                    <IoIosArrowDropdown />
                  </span>
                </div>
              </div>
            </div>
            <div className="h-[40px] mb-[40px]">
              <div className="mb-6">
                <div className="relative">
                  <input
                    style={{ border: "1px solid #A5A5A5" }}
                    className={`w-full px-4 py-3 bg-black text-white text-sm rounded-full focus:outline-none focus:ring-2 ${
                      errors.password
                        ? "focus:ring-red-500 border-red-500 "
                        : "focus:ring-orange-500 border-orange-500"
                    }`}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    onBlur={handleBlur}
                    placeholder="Enter your password*"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <IoEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2 ml-3">
                    {errors.password}{" "}
                    <IoIosWarning className="inline text-yellow-500" />
                  </p>
                )}
              </div>
            </div>
            <div className="h-[40px] mb-[40px]">
              <div className="mb-6">
                <div className="relative">
                  <input
                    style={{ border: "1px solid #A5A5A5" }}
                    className={`w-full px-4 py-3 bg-black text-white text-sm rounded-full focus:outline-none focus:ring-2 ${
                      errors.passwordConfirm
                        ? "focus:ring-red-500 border-red-500 "
                        : "focus:ring-orange-500 border-orange-500"
                    }`}
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type={showPassword ? "text" : "password"}
                    value={user.passwordConfirm}
                    onChange={(e) =>
                      setUser({ ...user, passwordConfirm: e.target.value })
                    }
                    onBlur={handleBlur}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <IoEye />}
                  </button>
                </div>
                {errors.passwordConfirm && (
                  <p className="text-red-500 text-sm mt-2 ml-3">
                    {errors.passwordConfirm}{" "}
                    <IoIosWarning className="text-yellow-500 inline" />
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="submit"
              >
                Register
              </button>
            </div>

            <div className="text-center mt-6 flex justify-center items-center gap-2">
              <span className="inline-block align-baseline font-bold text-sm text-gray-100 ">
                Already have an account ?
              </span>
              <Link
                className="inline-block align-baseline font-bold text-md text-orange-500 hover:text-orange-700 "
                to="/login"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
