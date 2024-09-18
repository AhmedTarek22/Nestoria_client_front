import { useState } from "react";
import { useUserInfoContext } from "../../context/UserProvider";

export function BillingAddress() {
  const { currentUser } = useUserInfoContext();
  const countries = [
    "Egypt",
    "Palestine",
    "Yemen",
    "Sudan",
    "Syria",
  ];

  const [selectedCountry, setSelectedCountry] = useState("");

  const handleChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <form className="flex flex-col gap-6">
      <h3 className="text-white text-2xl">Billing Address</h3>
      <div className="flex flex-col gap-4 text-[#929292]">
          <label>
            Full name
          </label>
          <input
            className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
            type="text"
            name=""
            placeholder={currentUser.fullName}
          />
        </div>
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Company name (optional)</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="text"
          name=""
          placeholder=""
        />
      </div>
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Country / Region</label>
        <div className="relative flex items-center">
          <select
            value={selectedCountry}
            onChange={handleChange}
            className="block appearance-none bg-transparent cursor-pointer w-full py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          >
            {countries.map((country) => (
              <option
                key={country}
                value={country}
                className="bg-[#101010] px-3 font-bold text-[#929292] cursor-pointer hover:text-white hover:bg-slate-100"
              >
                {currentUser.address}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-5 text-white">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M0 0l10 10 10-10H0z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Street address</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="text"
          name=""
          placeholder="House number and street name"
        />
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="text"
          name=""
          placeholder="Apartment, suite, unit, etc, (optional)"
        />
      </div>
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Town/city</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="text"
          name=""
          placeholder=""
        />
      </div>
      {/* <div className="flex flex-col gap-4 text-[#929292]">
        <label>State/Country</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="text"
          name=""
          placeholder=""
        />
      </div> */}
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Postcode/ZIP</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="text"
          name=""
          placeholder=""
        />
      </div>
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Phone</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="number"
          name=""
          value={currentUser.phone}
        />
      </div>
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Email address</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="email"
          name=""
          readOnly
          placeholder={currentUser.email}
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-transparent text-[#C26510] text-[17px] py-3 px-8 border border-[#C26510] rounded-3xl hover:bg-[#C26510] hover:text-white duration-500"
        >
          Save Address
        </button>
      </div>
    </form>
  );
}
