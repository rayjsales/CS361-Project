import React from "react";

const Cards = ({ name, description, price, restaurant, full_address }) => {
  return (
    <div className="text-left m-8 p-4 bg-white rounded-lg drop-shadow-lg min-h-[250px]">
      <h4 className="font-bold text-xl">{name}</h4>
      <p>{description}</p>
      <p className="font-bold text-lg">{price}</p>
      <p className="font-light text-sm">{restaurant}</p>
      <p className="font-light text-sm">{full_address}</p>
    </div>
  );
};

export default Cards;
