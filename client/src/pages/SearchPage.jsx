import React, { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdHelpCenter } from "react-icons/md";

import Results from "../components/Results";

const SearchPage = () => {
  const [locationValid, setValidLocation] = useState(false);
  const [cuisine, setCuisine] = useState("");
  const [cuisineValid, setValidCuisine] = useState(false);
  const [advanced, setAdv] = useState(false);
  const [dishTypes, setDishes] = useState([]);
  const [dish, setDish] = useState("");
  const [searchSubmitted, setSubmitted] = useState(false);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [meals, setMeals] = useState(null);
  const [cuisines, setCuisines] = useState([]);

  const handleCuisine = (e) => {
    // Use API to get the type of dishes, based on the city entered and the Cuisine selected
    setCuisine(e.target.value);
    setValidCuisine(true);
    setErrorMessage(false);
    // If Dish has been selected from the user previously, reset dish section and hide advanced section
    if (dish !== "") {
      setDish("");
      setAdv(false);
      setMeals(null);
    }
    getDishes(e);
  };

  const getDishes = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:9124/dishes?param1=${e.target.value}&param2=${city}`
      );
      const data = await response.json();
      setDishes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSection = (e) => {
    if (!cuisineValid) {
      setErrorMessage(true);
    } else {
      setAdv(!advanced);
      // Clear out the field
      setDish("");
    }
  };

  const handleDish = (e) => {
    setDish(e.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:9124/meals?cuisine=${cuisine}&city=${city}&dish=${dish}`
    );
    const data = await response.json();
    setMeals(data);
  }

  const handleCity = (event) => {
    if (event.target.value == 0) {
      setValidLocation(false);
    }
    setCity(event.target.value);
  };

  const searchCuisinesFromCity = async (cityName) => {
    // Run API fetch here to get a list of all the cuisines. SearchTerm will be a string of 'city, state'. Pass this to the async to API
    try {
      const response = await fetch(`http://localhost:9124/cuisines?param=${cityName}`);
      const data = await response.json();
      try {
        // Send the data to another API (microservice) that will give back the Cuisines. Then setCuisines([]) to setCuisines(dataCuisines)
        const response2 = await fetch(`http://localhost:7777/distinct-values`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const updatedCuisines = await response2.json();
        console.log(await updatedCuisines);
        setCuisines(updatedCuisines);
        setCity(cityName);
        setValidLocation(true);
        // Reset cuisine, dish, and meals if user had searched for something already
        if (cuisine !== "") {
          setCuisine("");
          setDish("");
          setAdv(false);
          setMeals(null);
        }
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch("http://localhost:9124/cities");
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCities();
    if (meals) {
      console.log(meals);
      setSubmitted(true);
    }
  }, [meals]);

  const filteredCities = cities.filter((item) => {
    const searchTerm = city.toLowerCase();
    const cityName = item.city.toLowerCase();
    return searchTerm && cityName.startsWith(searchTerm) && cityName !== searchTerm;
  });

  const handleClear = () => {
    // Clear all fields
    setCity("");
    setCuisine("");
    setDish("");
    setAdv(false);
    setMeals(null);
    setValidCuisine(false);
    setValidLocation(false);
  };

  return (
    <section className="flex items-center flex-col">
      <h3 className="font-bold py-5 my-4 text-3xl">Search for your next meal here</h3>
      <form onSubmit={handleSubmit} className="pb-12">
        <div className="my-4 relative">
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-900">
              Enter City<span className="text-red-500">*</span>
            </label>
          </div>
          <input
            type="text"
            value={city}
            onChange={handleCity}
            className="w-80 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter a City (ex. 'Portland, OR')"
            required
          />
          {city.length > 0 && !locationValid && (
            <div className="absolute w-full drop-shadow-lg">
              {filteredCities.length > 0 ? (
                filteredCities.slice(0, 10).map((item) => (
                  <div
                    key={item.city}
                    onClick={() => searchCuisinesFromCity(item.city)}
                    className="bg-white hover:bg-blue-300 w-full py-2"
                  >
                    {item.city}
                  </div>
                ))
              ) : (
                <div className="bg-white w-full py-2">Sorry, no results in that city</div>
              )}
            </div>
          )}
        </div>

        {/**Section for selecting the Cuisine */}
        <div className="my-4">
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-900">
              Select a Cuisine<span className="text-red-500">*</span>
            </label>
          </div>
          <select
            className="w-80 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={cuisine}
            onChange={handleCuisine}
            required
          >
            <option value="" disabled>
              Select a Cuisine
            </option>
            {cuisines.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="my-4 py-4">
          <p className="italic cursor-pointer hover:underline" onClick={handleSection}>
            Advanced Search
          </p>
          {errorMessage && (
            <p className="italic py-4 text-red-700 ">
              Select a Cuisine first before advanced search.
            </p>
          )}
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
                className="w-80 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={dish}
                onChange={handleDish}
                disabled={!cuisineValid}
              >
                <option value="" disabled>
                  Select a Dish
                </option>
                {dishTypes.map((option, index) => (
                  <option key={index} {...option} value={option.category}>
                    {option.category}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="flex items-center ">
          {locationValid && cuisineValid ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="font-inter w-[150px] mx-2 font-medium bg-blue-600 text-white px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 hover:bg-blue-800 active:bg-blue-400"
            >
              Submit
            </button>
          ) : (
            <button
              type="submit"
              className="font-inter w-[150px] mx-2 font-medium bg-gray-400 text-black px-4 py-2 rounded-md focus:ring-gray-300 focus:border-gray-300"
            >
              Submit
            </button>
          )}
          <button
            type="submit"
            onClick={handleClear}
            className="font-inter w-[150px] mx-2 font-medium bg-slate-300 px-4 py-2 rounded-md focus:ring-slate-300 focus:border-slate-300 hover:bg-slate-500 active:bg-slate-300"
          >
            Clear Search
          </button>
        </div>
      </form>
      <div className="w-full max-w-6xl text-right pb-3 inline-block">
        <Link to="/FAQs" className="italic">
          <MdHelpCenter className="inline-block text-2xl" />
          <span className="text-sm">Got questions, visit the FAQs Page</span>
        </Link>
      </div>
      {searchSubmitted && meals && (
        <Results key={meals.name} meals={meals} dishTypes={dishTypes} />
      )}
    </section>
  );
};

export default SearchPage;
