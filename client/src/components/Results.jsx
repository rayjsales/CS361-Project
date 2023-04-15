import React from "react";
import { resultsTest } from "../constants";
import Cards from "./Cards";

const Results = ({ searchSubmitted }) => {
  return (
    <section className="bg-gray-400 mt-10 pb-8">
      <h3 className="font-bold py-5 my-4 text-2xl">Search Results</h3>
      <div className="grid md:grid-cols-4">
        {resultsTest.map((card) => (
          <Cards key={card.dish} {...card} />
        ))}
      </div>
    </section>
  );
};

export default Results;
