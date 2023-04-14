import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const CTA = () => {
  return (
    <div className="mx-auto bg-gray-400 w-full">
      <div className="flex items-center justify-between p-20 max-w-6xl">
        <h3 className="font-bold text-2xl pl-11">Are you getting hungry yet?</h3>
        <Link
          to="/search-page"
          className="font-inter font-medium bg-blue-600 text-white px-6 py-4 rounded-md focus:ring-blue-500 focus:border-blue-500 hover:bg-blue-800 active:bg-blue-400"
        >
          Find Meals
        </Link>
      </div>
    </div>
  );
};

export default CTA;
