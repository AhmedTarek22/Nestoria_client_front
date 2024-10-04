
import {  FaUserCircle } from "react-icons/fa";
import React from "react";

const Avatar = ({ userId, name, imageUrl }) => {
 

  let avatarName = "";

  if (name) {
    const splitName = name?.split(" ");

    if (splitName?.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }
  // const bgColor = [
  //   "bg-slate-200",
  //   "bg-teal-200",
  //   "bg-red-200",
  //   "bg-green-200",
  //   "bg-yellow-200",
  //   "bg-gray-200",
  //   "bg-cyan-200",
  //   "bg-sky-200",
  //   "bg-blue-200",
  // ];
  // const randomNumber = Math.floor(Math.random() * 9);

  // const isOnline = onlineUser?.includes(userId);
  return (
    <div>
      {imageUrl ? (
        <img
          src={imageUrl}
          width={40}
          height={40}
          alt={name}
          className="overflow-hidden rounded-full"
        />
      ) :  name ? (
        <div
          className={"overflow-hidden rounded-full p-0 flex justify-center items-center text-center text-lg bg-gray-100 "}
        >
          {/* {avatarName} `${bgColor[randomNumber]}`*/}
           < FaUserCircle size={40}/>
        </div>
      ) : 
        < FaUserCircle size={40}/>
      }
      {/* {isOnline ? (
        <div className="bg-green-600 p-1 absolute  bottom-2-right-1 z-10 rounded-full"></div>
      ):<div></div>}  */}
      {/*  className="bg-gray-200 p-1 absolute  bottom-2-right-1 z-10 rounded-full"></div>} */}
    </div>
  );
};

export default Avatar;