import React, { useState, useEffect } from "react";
import { resultsTest } from "../constants";
import Cards from "./Cards";
import { IoMdCloseCircle } from "react-icons/io";

// When using a backend to get the data, need to pass in a parameter with the json and all the dish info
const Results = ({ key, meals }) => {
  const [filterOpen, setFilterButton] = useState(false);
  const [maxPrice, setMaxPrice] = useState("");
  const [initialData, setData] = useState(meals);
  const [displayCount, setDisplayCount] = useState(12);
  const [sortOpen, setSortButton] = useState(false);

  const showFilter = () => {
    setFilterButton(!filterOpen);
    setSortButton(false);
  };

  const handleShowMore = () => {
    if (displayCount + 12 < initialData.length) {
      setDisplayCount(displayCount + 12);
    } else {
      setDisplayCount(initialData.length);
    }
  };

  const handleMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  };

  // Filter function based on the prices. This may change depending on the string. Currently
  // its 12.00 USD, where we want $12.00.
  const handleFilter = (e) => {
    e.preventDefault();
    if (maxPrice !== "") {
      setData(
        initialData.filter(
          (dish) => parseFloat(dish.price.slice(1)) <= parseFloat(maxPrice)
        )
      );
    } else {
      setData(meals);
    }
    setFilterButton(false);
  };

  // Sort the meals from A to Z
  const sortAtoZ = () => {
    const sortedMeals = initialData.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setData(sortedMeals);
    showSort();
  };

  // Sort meals from Z to A
  const sortZtoA = () => {
    const sortedMeals = initialData.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    });
    setData(sortedMeals);
    showSort();
  };

  const handleClearFilter = () => {
    setData(meals);
    setMaxPrice("");
  };

  const showSort = () => {
    setFilterButton(false); // make sure to hide filter area
    setSortButton(!sortOpen);
  };

  useEffect(() => {
    setData(meals);
  }, [meals]);

  return (
    <section className="bg-gray-400 mt-10 pb-8 w-full">
      <h3 className="font-bold py-5 my-4 text-2xl">Search Results</h3>
      <p className="pb-4 italic">
        {initialData.length == 1
          ? initialData.length + " result found"
          : initialData.length + " results found"}
      </p>
      {initialData.length > 0 && (
        <div>
          <div className="text-center flex flex-col items-center relative">
            <div className="flex items-center space-x-5">
              <button
                className="font-inter font-medium bg-blue-600 text-white px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 hover:bg-blue-800 active:bg-blue-400"
                type="button"
                onClick={showFilter}
              >
                Filter
              </button>
              <button
                className="font-inter font-medium bg-blue-600 text-white px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 hover:bg-blue-800 active:bg-blue-400"
                type="button"
                onClick={showSort}
              >
                Sort
              </button>
            </div>
            {filterOpen && (
              <div className="bg-slate-200 rounded-lg w-[250px] absolute text-left p-3 z-50 top-[45px] drop-shadow-lg">
                <div>
                  <div className="float-right">
                    <IoMdCloseCircle
                      onClick={showFilter}
                      className="hover:text-red-400 ml-3"
                    />
                  </div>
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
                        onClick={handleClearFilter}
                        className="font-inter  mx-2 font-sm bg-white text-black px-2 py-1 rounded focus:ring-slate-200 focus:border-slate-200 hover:bg-slate-300 active:bg-blue-400"
                      >
                        Clear Filter
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {sortOpen && (
              <div className="bg-slate-200 rounded-lg w-[250px] absolute text-left p-3 z-50 top-[45px] drop-shadow-lg">
                <div className="relative text-center">
                  <div className="border-slate-400 border-b-2">Sort Results</div>
                  <IoMdCloseCircle
                    onClick={showSort}
                    className="hover:text-red-400 ml-3 absolute right-0 -top-0"
                  />
                </div>
                <div className="text-center">
                  <div className="drop-shadow-md cursor-pointer p-1" onClick={sortAtoZ}>
                    Sort A to Z
                  </div>
                  <div className="drop-shadow-md cursor-pointer p-1" onClick={sortZtoA}>
                    Sort Z to A
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Show results here */}
          <div className="grid md:grid-cols-4">
            {initialData.slice(0, displayCount).map((card) => (
              <Cards key={card.id} {...card} />
            ))}
          </div>
          {initialData.length > displayCount && (
            <p
              className="text-center italic hover:font-bold cursor-pointer "
              onClick={handleShowMore}
            >
              Show More Results
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default Results;
