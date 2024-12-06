import React, { FC } from "react";

type LoadingProps = {
  text?: string;
};

export const Loading: FC<LoadingProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-4 h-4 border-[3px] border-gray-400 border-b-gray-200 rounded-full animate-spin" />
      {text && (
        <p className="text-[16px] font-semibold text-gray-500">{text}</p>
      )}
    </div>
  );
};
