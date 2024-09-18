import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faCommentSms,
  faEnvelopeOpenText,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { HeaderPages } from "../components/HeaderPages";
import { toast } from "react-toastify";
import axiosInstance from "../apis/axiosConfig";
import { useState } from "react";
import { Link } from "react-router-dom";

function ContactUs() {
  const regexName = /^[a-zA-Z][a-zA-Z ]{2,30}$/;
  const regexPhone = /^01[0125][0-9]{8}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regexProblem = /^[a-zA-Z][a-zA-Z ]{10,100}$/;

  const [problemDetails, setProblemDetails] = useState({
    userName: "",
    userMobile: "",
    userEmail: "",
    userProblem: "",
  });
  const [errors, setErrors] = useState({
    userNameError: "",
    userMobileError: "",
    UserEmailError: "",
    userProblemError: "",
  });

  const handleProblemDetails = (e) => {
    if (e.target.name === "name") {
      setProblemDetails({
        ...problemDetails,
        userName: e.target.value,
      });
      setErrors({
        ...errors,
        userNameError:
          e.target.value.length === 0
            ? "Enter name"
            : !regexName.test(e.target.value) && "Enter valid name",
      });
    }
    if (e.target.name === "phone") {
      setProblemDetails({
        ...problemDetails,
        userMobile: e.target.value,
      });
      setErrors({
        ...errors,
        userMobileError:
          e.target.value.length === 0
            ? "Enter mobile number"
            : !regexPhone.test(e.target.value) && "Enter valid mobila number",
      });
    }
    if (e.target.name === "email") {
      setProblemDetails({
        ...problemDetails,
        userEmail: e.target.value,
      });
      setErrors({
        ...errors,
        userEmail:
          e.target.value.length === 0
            ? "Enter email"
            : !emailRegex.test(e.target.value) && "Enter valid email",
      });
    }
    if (e.target.name === "problem") {
      setProblemDetails({
        ...problemDetails,
        userProblem: e.target.value,
      });
      setErrors({
        ...errors,
        userProblemError:
          e.target.value.length === 0
            ? "Enter problem or query"
            : !regexProblem.test(e.target.value) &&
              "Enter valid problem or query (10 words at least)",
      });
    }
  };

  const handleSendProblem = async (e) => {
    e.preventDefault();
    console.log(errors);
    console.log(problemDetails);
    try {
      if (
        !problemDetails.userName ||
        !problemDetails.userMobile ||
        !problemDetails.userEmail ||
        !problemDetails.userProblem
      ) {
        return toast.error("Enter full data");
      } else if (
        errors.userNameError ||
        errors.userMobileError ||
        errors.UserEmailError ||
        errors.userProblemError
      ) {
        return toast.error("Enter valid data");
      } else {
        const res = await axiosInstance.post(
          "/api/v1/fur/problems/addProblem",
          {
            userName: problemDetails.userName,
            userMobile: problemDetails.userMobile,
            userEmail: problemDetails.userEmail,
            userProblem: problemDetails.userProblem,
          }
        );
        if (res) {
          toast.success("The problem has been sent.");
          setProblemDetails({
            userName: "",
            userMobile: "",
            userEmail: "",
            userProblem: "",
          });
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div>
      {/* section header */}
      <HeaderPages namePage="Contact Us"></HeaderPages>
      {/* section drop up */}
      <section
        style={{
          backgroundImage: "url('/body-bg.png')",
          backgroundPosition: "left top",
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
          backgroundAttachment: "scroll",
          backgroundColor: "#000000",
        }}
        className="text-center py-12 px-6 md:px-10"
      >
        <div className="lg:w-1/2 m-auto px-11">
          <p className="text-[#C5660E]">DROP US A LINE</p>
          <h2 className="text-white text-4xl md:text-6xl my-6">
            Round-the-clock Service
          </h2>
          <p className="text-[#9C9C9C] text-[17px] md:text-[15px] font-bold">
            Sed id semper risus in hendrerit gravida rutrum quisque. Vitae proin
            sagittis nisl Vel elit scelerisque mauris rhoncus mattis rhoncus
            urna.
          </p>
        </div>

        <div className="bg-[#101010] my-14 p-14 rounded-3xl w-full lg:w-2/3 mx-auto shadow-lg">
          <form onSubmit={(e) => handleSendProblem(e)}>
            {/* Name and Mobile Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={problemDetails.userName}
                  onChange={(e) => handleProblemDetails(e)}
                  className="w-full bg-[#101010] text-white py-4 px-8 rounded-3xl border border-[#5E5E5E] focus:outline-none focus:border-orange-500 duration-500"
                />
                <span className="text-red-500 text-sm font-semibold">
                  {errors.userNameError}
                </span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Mobile Number"
                  name="phone"
                  value={problemDetails.userMobile}
                  onChange={(e) => handleProblemDetails(e)}
                  className="w-full bg-[#101010] border border-[#5E5E5E] text-white py-4 px-8 rounded-3xl focus:outline-none focus:border-orange-500 duration-500"
                />
                <span className="text-red-500 text-sm font-semibold">
                  {errors.userMobileError}
                </span>
              </div>
            </div>

            {/* Mail ID */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Mail ID"
                name="email"
                value={problemDetails.userEmail}
                onChange={(e) => handleProblemDetails(e)}
                className="w-full bg-[#101010] border border-[#5E5E5E] my-3 text-white py-4 px-8 rounded-3xl focus:outline-none focus:border-orange-500 duration-500"
              />
              <span className="text-red-500 text-sm font-semibold">
                {errors.UserEmailError}
              </span>
            </div>

            {/* Additional Information */}
            <div className="mb-6">
              <textarea
                placeholder="Additional Information"
                name="problem"
                value={problemDetails.userProblem}
                onChange={(e) => handleProblemDetails(e)}
                rows="9"
                className="w-full bg-[#101010] border border-[#5E5E5E] my-3 text-white py-4 px-8 rounded-3xl focus:outline-none focus:border-orange-500 duration-500"
              ></textarea>
              <span className="text-red-500 text-sm font-semibold">
                {errors.userProblemError}
              </span>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-orange-500 text-white text-[17px] py-3 px-8 rounded-3xl hover:bg-white hover:text-black duration-500"
              >
                Submit Query
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* section contact links */}
      <section
        style={{
          backgroundImage: "url('/body-bg.png')",
          backgroundPosition: "left top",
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
          backgroundAttachment: "scroll",
          backgroundColor: "#101010",
        }}
        className="py-16 px-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
          <div className="content flex items-center gap-5">
            <div>
              <FontAwesomeIcon
                className="text-orange-500 text-7xl"
                icon={faClipboardList}
              />
            </div>
            <div>
              <Link to="">
                <h4 className="text-2xl text-white hover:text-orange-500 duration-500">
                  Transit Protocol
                </h4>
              </Link>
              <p className="text-[#9D9D9D]">
                Eget arcu dictum varius duis at lorem donec.
              </p>
            </div>
          </div>
          <div className="content flex items-center gap-5">
            <div>
              <FontAwesomeIcon
                className="text-orange-500 text-7xl"
                icon={faCommentSms}
              />
            </div>
            <div>
              <Link to="">
                <h4 className="text-2xl text-white hover:text-orange-500 duration-500">
                  Chat Assistance
                </h4>
              </Link>
              <p className="text-[#9D9D9D]">
                Tuam quisque id diam vel quam aecenas.
              </p>
            </div>
          </div>
          <div className="content flex items-center gap-5">
            <div>
              <FontAwesomeIcon
                className="text-orange-500 text-7xl"
                icon={faEnvelopeOpenText}
              />
            </div>
            <div>
              <Link to="">
                <h4 className="text-2xl text-white hover:text-orange-500 duration-500">
                  Email Interaction
                </h4>
              </Link>
              <p className="text-[#9D9D9D]">
                Quis varius quam id diam vel aecenas.
              </p>
            </div>
          </div>
          <div className="content flex items-center gap-5">
            <div>
              <FontAwesomeIcon
                className="text-orange-500 text-7xl"
                icon={faStore}
              />
            </div>
            <div>
              <Link to="">
                <h4 className="text-2xl text-white hover:text-orange-500 duration-500">
                  Global Stores
                </h4>
              </Link>
              <p className="text-[#9D9D9D]">
                Condimentum id venenatis a vitae sapien.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
