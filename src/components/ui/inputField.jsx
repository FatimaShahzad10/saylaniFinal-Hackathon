import React, { useState } from "react";

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  required = false,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full relative">
      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        className={`w-full mt-1 p-3 rounded-full bg-gray-300 placeholder-white placeholder:font-bold text-white, ${className}`}
        value={value}
        onChange={onChange}
        required={required}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-700 font-bold bg-gray-300 rounded-full px-3 py-1"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
};

export default InputField;
