import React, { useState, useEffect } from "react";
import { resultsTest } from "../constants";
import Cards from "./Cards";

// When using a backend to get the data, need to pass in a parameter with the json and all the dish info
const Results = ({ key, meals }) => {
  const [filterOpen, setFilterButton] = useState(false);
  const [maxPrice, setMaxPrice] = useState("");
  const [initialData, setData] = useState(meals);

  const showFilter = () => {
    setFilterButton(!filterOpen);
  };

  const handleMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setData(
      resultsTest.filter((dish) => parseInt(dish.price.slice(1)) <= parseInt(maxPrice))
    );
    setFilterButton(false);
    console.log(initialData);
  };

  useEffect(() => {}, [initialData, meals]);

  return (
    <section className="bg-gray-400 mt-10 pb-8 w-full">
      <h3 className="font-bold py-5 my-4 text-2xl">Search Results</h3>
      <div className="text-center flex flex-col items-center relative">
        <button
          className="font-inter font-medium bg-blue-600 text-white px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 hover:bg-blue-800 active:bg-blue-400"
          type="button"
          onClick={showFilter}
        >
          Filter
        </button>
        {filterOpen && (
          <div className="bg-slate-200 rounded-lg w-[250px] absolute text-left p-3 z-50 top-[45px] drop-shadow-lg">
            <div>
              <form onSubmit={handleFilter}>
                <div className="grid grid-cols-2">
                  <label>Max Price</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={handleMaxPrice}
                    className="w-24 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 mt-4">
                  <button
                    type="submit"
                    className="font-inter mx-2 font-sm bg-blue-600 text-white px-2 py-1 rounded focus:ring-blue-500 focus:border-blue-500 hover:bg-blue-800 active:bg-blue-400"
                  >
                    Filter
                  </button>
                  <button
                    type="button"
                    onClick={showFilter}
                    className="font-inter  mx-2 font-sm bg-white text-black px-2 py-1 rounded focus:ring-slate-200 focus:border-slate-200 hover:bg-slate-300 active:bg-blue-400"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="grid md:grid-cols-4">
        {initialData.map((card) => (
          <Cards key={card.name} {...card} />
        ))}
      </div>
    </section>
  );
};

export default Results;
