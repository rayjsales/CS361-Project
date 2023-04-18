import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-blue-600 sm:text-6xl">
            Don't know what to eat?
          </h1>
          <p className="my-6 text-lg leading-8 text-gray-600">
            Search for meals from nearby restaurants or wherever you are, from specific
            cuisines, to dishes as well as coffee or teas.
          </p>
          <Link
            to="/search-page"
            className="font-inter font-medium bg-blue-600 text-white px-6 py-4 drop-shadow-md rounded-md focus:ring-blue-500 focus:border-blue-500 hover:bg-blue-800 active:bg-blue-400 hover:drop-shadow-xl"
          >
            Find Meals
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
