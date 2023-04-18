import React, { useState } from "react";
import { Form } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdHelpCenter } from "react-icons/md";

import { cuisines, dishTypes, cities } from "../constants";
import Results from "../components/Results";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const SearchPage = () => {
  const [locationValid, setValidLocation] = useState(false);
  const [cuisine, setCuisine] = useState("");
  const [cuisineValid, setValidCuisine] = useState(false);
  const [advanced, setAdv] = useState(false);
  const [dish, setDish] = useState("");
  const [searchSubmitted, setSubmitted] = useState(false);
  //const [address, setAddress] = useState("");
  /*const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });*/
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  /*const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    console.log(results);
    const ll = await getLatLng(results[0]);
    console.log(ll);
    setAddress(value);
    setCoordinates(ll);
    setValidLocation(true);
  };*/

  const handleCuisine = (e) => {
    setCuisine(e.target.value);
    setValidCuisine(true);
    setErrorMessage(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    let obj = {
      place: city,
      cuis: cuisine,
      dish: dish,
    };
    setSubmitted(true);
    console.log(obj);
  };

  const handleCity = (event) => {
    if (event.target.value == 0) {
      setValidLocation(false);
    }
    setCity(event.target.value);
  };

  const searchCuisinesFromCity = (searchTerm) => {
    // Run API fetch here to get a list of all the cuisines
    setCity(searchTerm);
    setValidLocation(true);
    console.log(searchTerm);
  };

  const filteredCities = cities.filter((item) => {
    const searchTerm = city.toLowerCase();
    const cityName = item.city.toLowerCase();
    return searchTerm && cityName.startsWith(searchTerm) && cityName !== searchTerm;
  });

  return (
    <section className="flex items-center flex-col">
      <h3 className="font-bold py-5 my-4 text-3xl">Search for your next dish here</h3>
      <form onSubmit={handleSubmit} className="pb-12">
        <div className="my-4 relative">
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-900">
              Enter City / Zip Code<span className="text-red-500">*</span>
            </label>
          </div>
          <input
            type="text"
            value={city}
            onChange={handleCity}
            className="w-80 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter a City (ex. 'Portland, OR')"
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

          {/* <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div key={suggestions.description}>
                <input
                  type="text"
                  id="location"
                  placeholder="Enter a City or Zip Code (ex. 'New York City' or '100013')"
                  required
                  {...getInputProps({
                    placeholder:
                      "Enter a City or Zip Code (ex. 'New York City' or '100013')",
                    className:
                      "location-search-input w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#356fce] focus:border-[#356fce] outline-none block p-3 relative",
                  })}
                />
                <div className="autocomplete-dropdown-container absolute text-left w-96">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#AAD7F3", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className: "p-2 text-sm",
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete> */}
        </div>
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
                {dishTypes.map((option) => (
                  <option key={option.dish} {...option} value={option.dish}>
                    {option.dish}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        {locationValid && cuisineValid ? (
          <button
            type="submit"
            className="font-inter w-[150px] font-medium bg-blue-600 text-white px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 hover:bg-blue-800 active:bg-blue-400"
          >
            Submit
          </button>
        ) : (
          <button
            type="submit"
            className="font-inter w-[150px] font-medium bg-gray-400 text-black px-4 py-2 rounded-md focus:ring-gray-300 focus:border-gray-300"
          >
            Submit
          </button>
        )}
      </form>
      <div className="w-full max-w-6xl text-right pb-3 inline-block">
        <Link to="/FAQs" className="italic">
          <MdHelpCenter className="inline-block text-2xl" />
          <span className="text-sm">Got questions, visit the FAQs Page</span>
        </Link>
      </div>
      {searchSubmitted && <Results />}
    </section>
  );
};

export default SearchPage;
