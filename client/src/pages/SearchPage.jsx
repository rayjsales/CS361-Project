import React, { useState } from "react";
import { Form } from "react-router-dom";

import { cuisines } from "../constants";

const SearchPage = () => {
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [advanced, setAdv] = useState(false);

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleCuisine = (e) => {
    setCuisine(e.target.value);
  };

  const handleSection = (e) => {
    setAdv(!advanced);
  };

  return (
    <section className="flex items-center flex-col">
      <h3 className="font-bold py-5 my-4 text-3xl">Search for your next dish here</h3>
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
          onChange={setLocation}
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
          className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={cuisine}
          onChange={handleCuisine}
        >
          <option value="">Select an option</option>
          {cuisines.map((option) => (
            <option key={option.id} {...option} value={option.cuisine}>
              {option.cuisine}
            </option>
          ))}
        </select>
      </div>

      <p onClick={handleSection}>Advanced Search</p>
      {advanced && <div>Something Here</div>}
    </section>
  );
};

export default SearchPage;
