import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ id, name, description, price, restaurant, full_address }) => {
  return (
    <div className="text-left m-8 p-4 bg-white rounded-lg drop-shadow-lg min-h-[250px]">
      <h4 className="font-bold text-xl">{name}</h4>
      <p>{description}</p>
      <p className="font-bold text-lg">{price}</p>
      <Link
        to={`https://www.google.com/search?q=${restaurant + " " + full_address}`}
        target="_blank"
      >
        <div
          className="font-light text-sm hover:underline hover:text-blue-800"
          title="Click to Google Search"
        >
          <p>{restaurant}</p>
          <p>{full_address}</p>
        </div>
      </Link>
    </div>
  );
};

export default Cards;
