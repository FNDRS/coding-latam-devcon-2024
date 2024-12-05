import React from "react";

export const ConfirmDelete = () => {
  return (
    <div>
      <h1 className="text-black  font-extrabold text-[25px] text-center">
        Confirm Deletion
      </h1>
      <p className="text-center text-gray-500 mt-4 font-bold">
        Are you sure you want to delete this item?
      </p>
      <p className="text-center text-gray-500 font-bold">
        You can't undo this action
      </p>
      <div className="flex w-full justify-center items-center mt-8">
        <button className="bg-black text-white p-2 rounded-lg px-10 py-3 font-extrabold">
          Delete
        </button>
      </div>
    </div>
  );
};
