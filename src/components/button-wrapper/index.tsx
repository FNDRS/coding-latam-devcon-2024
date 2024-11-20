import React from "react";

interface ButtonProps {
  text: string;
}

export const ButtonWrapper: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className="bg-black text-white rounded-lg p-2 px-6 transition-all duration-300 ease-in-out transform hover:bg-gray-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
      {text}
    </button>
  );
};
