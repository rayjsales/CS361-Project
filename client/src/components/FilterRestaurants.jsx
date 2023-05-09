import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const FilterDishes = (props) => {
  const [showDishes, setShowDishes] = useState(false);

  const handleShowDishes = () => {
    setShowDishes(!showDishes);
  };

  const dishSelection = (selectedDish) => {
    props.onSelect(selectedDish);
  };

  return (
    <div className="pt-2">
      <p onClick={handleShowDishes} className="hover:italic cursor-pointer">
        Select Dishes{" "}
        {!showDishes && <MdKeyboardArrowDown className="inline-block text-xl" />}{" "}
        {showDishes && <MdKeyboardArrowUp className="inline-block text-xl" />}
      </p>

      {showDishes && (
        <div className="h-24 overflow-y-scroll bg-slate-100">
          {props.dishes.map((item, index) => (
            <div
              key={index}
              value={item.category}
              className="text-sm hover:bg-blue-200 p-[2px]"
              onClick={() => dishSelection(item.category)}
            >
              {item.category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDishes;
