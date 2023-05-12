import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const FilterRestaurants = (props) => {
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [distinctRest, setDistinctRest] = useState([]);
  const [userSelected, setUserSelected] = useState([]);

  const handleShowRestaurants = () => {
    setShowRestaurants(!showRestaurants);
  };

  useEffect(() => {
    // Create a new array with distinct restaurants.
    const uniqueRest = [...new Set(props.data.map((item) => item.restaurant))];
    setDistinctRest(uniqueRest);
  }, [props.data]);

  // Handle adding the value to the userSelected
  const restaurantSelection = (optionValue) => {
    const selectedIndex = userSelected.indexOf(optionValue);
    let newSelectedItems = [...userSelected];

    if (selectedIndex === -1) {
      newSelectedItems.push(optionValue);
    } else {
      newSelectedItems.splice(selectedIndex, 1);
    }
    setUserSelected(newSelectedItems);
    props.onRestaurantSelect(newSelectedItems);
  };

  return (
    <div className="inline-block">
      <p onClick={handleShowRestaurants} className="hover:italic cursor-pointer pb-1">
        Select Restaurants{" "}
        {!showRestaurants && <MdKeyboardArrowDown className="inline-block text-xl" />}{" "}
        {showRestaurants && <MdKeyboardArrowUp className="inline-block text-xl" />}
      </p>

      {showRestaurants && (
        <div className="h-40 overflow-y-scroll bg-slate-100 p-3">
          {distinctRest.map((item, index) => (
            <div className="py-1" key={index} title={item}>
              <input
                type="checkbox"
                value={item}
                checked={userSelected.includes(item)}
                className="text-sm hover:bg-blue-200 px-[2px] inline-block align-middle"
                onChange={() => restaurantSelection(item)}
              />{" "}
              <p key={index} className="inline-block truncate w-[250px] align-middle">
                {item}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterRestaurants;
