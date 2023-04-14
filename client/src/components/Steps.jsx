import React from "react";
import { steps } from "../constants";

const StepBlock = ({ id, step, info }) => (
  <div className="p-8 drop-shadow-lg hover:drop-shadow-xl">
    <h4 className="text-lg font-bold py-20 bg-blue-800 text-white rounded-t-lg">
      {step}
    </h4>
    <p className="p-8 bg-white rounded-b-lg min-h-[110px]">{info}</p>
  </div>
);

const Steps = () => {
  return (
    <div className="p-12">
      <h3 className="font-bold py-5 my-4 text-3xl">How to find your next meal...</h3>
      <p>Follow these 4 simple steps to find your next meal.</p>
      <div className="grid md:grid-cols-4">
        {steps.map((step, info) => (
          <StepBlock key={step.id} {...step} index={info} />
        ))}
      </div>
    </div>
  );
};

export default Steps;
