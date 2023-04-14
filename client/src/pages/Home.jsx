import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Steps from "../components/Steps";
import CTA from "../components/CTA";

const Home = () => {
  return (
    <section>
      <Hero />
      <Features />
      <Steps />
      <CTA />
    </section>
  );
};

export default Home;
