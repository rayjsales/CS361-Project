import React, { useState } from "react";
import { IconName } from "react-icons/md";

const FilterDishes = ({ dishes }) => {
  const [showDishes, setShowDishes] = useState(false);

  const handleShowDishes = () => {
    setShowDishes(!showDishes);
  };

  return (
    <div className="pt-2">
      <p onClick={handleShowDishes}>Select Dishes</p>

      {showDishes && (
        <div className="h-24 overflow-y-scroll">
          {dishes.map((item, index) => (
            <p key={index} value={item.category}>
              {item.category}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDishes;
