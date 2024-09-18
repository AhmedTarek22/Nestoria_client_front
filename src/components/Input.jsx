import React from "react";
import { IoIosWarning } from "react-icons/io";

const InputField = ({
  id,
  name,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
}) => {
  return (
    <>
      <div className="mb-2  py-1">
        <input
          className={`w-full px-4 py-3 bg-black text-white text-sm rounded-full focus:outline-none focus:ring-2 ${
            error
              ? "focus:ring-red-500 border-red-500"
              : "focus:ring-orange-500 border-orange-500"
          }`}
          id={id}
          name={name}
          type={type}
          style={{ border: "1px solid #A5A5A5" }}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
        {error ? (
          <span
            className="text-red-500 text-sm "
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "5px",

              margin: "5px 9px",
            }}
          >
            {error} <IoIosWarning className="text-yellow-500" />
          </span>
        ) : (
          <span
            className="text-red-500 text-sm "
            style={{ display: "none" }}
          ></span>
        )}
      </div>
    </>
  );
};

export default InputField;
