import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const FilterRestaurants = (props) => {
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [distinctRest, setDistinctRest] = useState([]);

  const handleShowRestaurants = () => {
    setShowRestaurants(!showRestaurants);
  };

  useEffect(() => {
    const uniqueRest = [...new Set(props.data.map((item) => item.restaurant))];
    setDistinctRest(uniqueRest);
  }, [props.data]);

  // Create a distinct array with the restaurants from the props

  const restaurantSelection = (selectedRestaurant) => {
    props.onRestaurantSelect(selectedRestaurant);
  };

  return (
    <div className="pt-2">
      <p onClick={handleShowRestaurants} className="hover:italic cursor-pointer">
        Select Restaurants{" "}
        {!showRestaurants && <MdKeyboardArrowDown className="inline-block text-xl" />}{" "}
        {showRestaurants && <MdKeyboardArrowUp className="inline-block text-xl" />}
      </p>

      {showRestaurants && (
        <div className="h-24 overflow-y-scroll bg-slate-100">
          {distinctRest.map((item, index) => (
            <div
              key={index}
              value={item}
              className="text-sm hover:bg-blue-200 p-[2px]"
              onClick={() => restaurantSelection(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterRestaurants;
