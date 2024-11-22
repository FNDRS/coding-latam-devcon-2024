import React from "react";

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    message && <span className="text-sm text-red-500 font-bold">{message}</span>
  );
};
