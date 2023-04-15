import React from "react";
import { faqs } from "../constants";

const FAQs = () => {
  return (
    <section className="pb-4">
      <h3 className="font-bold py-5 my-4 text-3xl">Frequently Asked Questions</h3>
      <div className="mx-auto max-w-2xl">
        {faqs.map((faq) => (
          <div key={faq.question} {...faq} className="py-4 text-left">
            <p className="font-bold py-2">{faq.question}</p>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
