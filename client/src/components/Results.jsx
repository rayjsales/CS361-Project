import React, { useState } from "react";
import { resultsTest } from "../constants";
import Cards from "./Cards";

const Results = () => {
  const [filterOpen, setFilterButton] = useState(false);

  const showFilter = () => {
    setFilterButton(!filterOpen);
  };

  return (
    <section className="bg-gray-400 mt-10 pb-8">
      <h3 className="font-bold py-5 my-4 text-2xl">Search Results</h3>
      <div className="text-center flex flex-col items-center">
        <button
          className="font-inter font-medium bg-blue-600 text-white px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 hover:bg-blue-800 active:bg-blue-400"
          type="button"
          onClick={showFilter}
        >
          Filter
        </button>
        {filterOpen && (
          <div className="bg-white rounded-lg w-[250px] text-left p-3 z-50">
            <div className="grid grid-cols-2">
              <p>Max Price</p>
              <input
                type="number"
                className="w-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        )}
      </div>
      <div className="grid md:grid-cols-4">
        {resultsTest.map((card) => (
          <Cards key={card.dish} {...card} />
        ))}
      </div>
    </section>
  );
};

export default Results;
