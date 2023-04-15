import React from "react";

const Cards = ({ dish, description, price, address }) => {
  return (
    <div className="text-left m-8 p-4 bg-white rounded-lg drop-shadow-lg min-h-[250px]">
      <h4 className="font-bold text-xl">{dish}</h4>
      <p>{description}</p>
      <p className="font-bold text-lg">{price}</p>
      <p className="font-light text-sm">{address}</p>
    </div>
  );
};

export default Cards;
