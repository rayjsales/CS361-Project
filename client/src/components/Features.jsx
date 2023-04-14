import React from "react";

const Features = () => {
  return (
    <div id="features" className="bg-gray-400 p-12">
      <div className="font-bold py-5 my-4 text-3xl">
        The best way to search for meals near you
      </div>
      <div className="grid md:grid-cols-2 drop-shadow-lg">
        <div className="p-5 rounded-lg bg-white m-3">
          <h3 className="font-bold py-3 my-2 text-lg">
            Search by location, cuisine, or dish
          </h3>
          <p className="py-3 my-2">
            Get results from dishes near you, specifying your preferred cuisine, and the
            type of dish you are looking for.
          </p>
        </div>
        <div className="p-5 rounded-lg bg-white m-3 drop-shadow-lg">
          <h3 className="font-bold py-3 my-2 text-lg">
            Get meal prices and restaurant info
          </h3>
          <p className="py-3 my-2">
            Select meals that are within your budget and restaurant address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
