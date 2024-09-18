import { Link } from "react-router-dom";
import { useUserInfoContext } from "../../context/UserProvider";

export function Addresses() {
  const { currentUser } = useUserInfoContext();

  return (
    <div>
      <p className="text-[#A2A2A2]">
        The following addresses will be used on the checkout page by default.
      </p>
      <div className="my-6 p-2 border-2 border-[#393939]">
        <div className="flex flex-col p-5 border-2 border-[#393939] border-dashed">
          <div className="flex justify-between">
            <h3 className="text-xl text-white">Billing Address</h3>
            <Link className="text-[#A2A2A2] cursor-pointer hover:text-[#C26510] duration-500">
              Edit
            </Link>
          </div>
          <span className="mt-5 italic font-bold text-[#A2A2A2]">{currentUser.fullName}</span>
        </div>
      </div>

      <div className="p-2 border-2 border-[#393939]">
        <div className="flex flex-col p-5 border-2 border-[#393939] border-dashed">
          <div className="flex justify-between">
            <h3 className="text-xl text-white">Shipping address</h3>
            <Link className="text-[#A2A2A2] cursor-pointer hover:text-[#C26510] duration-500">
              Add
            </Link>
          </div>
          <span className="mt-5 font-bold text-[#A2A2A2]">
            You have not set up this type of address yet.
          </span>
        </div>
      </div>
    </div>
  );
}
