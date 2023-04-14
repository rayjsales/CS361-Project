import React, { useState } from "react";
import { Form } from "react-router-dom";

import { cuisines, dishTypes } from "../constants";

const SearchPage = () => {
  const [location, setLocation] = useState("");
  const [locationValid, setValidLocation] = useState(false);
  const [cuisine, setCuisine] = useState("");
  const [cuisineValid, setValidCuisine] = useState(false);
  const [advanced, setAdv] = useState(false);
  const [dish, setDish] = useState("");

  const handleLocation = (e) => {
    setLocation(e.target.value);
    setValidLocation(true);
  };
  const handleCuisine = (e) => {
    setCuisine(e.target.value);
    setValidCuisine(true);
  };

  const handleSection = (e) => {
    setAdv(!advanced);
    // Clear out the field
    setDish("");
  };

  const handleDish = (e) => {
    setDish(e.target.value);
  };

  const handleSubmit = () => {
    event.preventDefault();
    let obj = {
      place: location,
      cuis: cuisine,
      dish: dish,
    };
    console.log(obj);
  };

  return (
    <section className="flex items-center flex-col pb-10">
      <h3 className="font-bold py-5 my-4 text-3xl">Search for your next dish here</h3>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-900">
              Enter City / Zip Code<span className="text-red-500">*</span>
            </label>
          </div>
          <input
            type="text"
            id="location"
            placeholder="Enter a City or Zip Code (ex. 'New York City' or '100013')"
            value={location}
            onChange={handleLocation}
            required
            className="w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#356fce] focus:border-[#356fce] outline-none block p-3"
          />
        </div>
        <div className="my-4">
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-900">
              Select a Cuisine<span className="text-red-500">*</span>
            </label>
          </div>
          <select
            className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={cuisine}
            onChange={handleCuisine}
          >
            <option value="" disabled>
              Select a Cuisine
            </option>
            {cuisines.map((option) => (
              <option key={option.id} {...option} value={option.cuisine}>
                {option.cuisine}
              </option>
            ))}
          </select>
        </div>

        <div className="my-4 py-4">
          <p className="italic cursor-pointer hover:underline" onClick={handleSection}>
            Advanced Search
          </p>
          {advanced && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-900 pt-4"
                >
                  Select a Dish Type<span className="font-light italic"> (optional)</span>
                </label>
              </div>
              <select
                className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={dish}
                onChange={handleDish}
                disabled={!cuisineValid}
              >
                <option value="" disabled>
                  Select a Dish
                </option>
                {dishTypes.map((option) => (
                  <option key={option.dish} {...option} value={option.dish}>
                    {option.dish}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="font-inter font-medium bg-blue-600 text-white px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 hover:bg-blue-800 active:bg-blue-400"
          disabled={!locationValid || !cuisineValid}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default SearchPage;
