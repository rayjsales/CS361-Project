import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { Home, SearchPage, FAQs } from "./pages";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-2 border-b border-b-[#e6ebf4]">
        <div>
          <Link className="mx-5 text-blue-600 font-bold text-[20px]" to="/">
            FLAVOR-IT
          </Link>
          <HashLink className="mx-5 hover:text-blue-600" to="/#features">
            Features
          </HashLink>
        </div>
        <div>
          <Link className="mx-5 hover:text-blue-600" to="/">
            Home
          </Link>
          <Link className="mx-5 hover:text-blue-600" to="/search-page">
            Search Page
          </Link>
          <Link className="mx-5 hover:text-blue-600" to="/faqs">
            FAQs
          </Link>
          <Link
            to="/search-page"
            className="font-inter font-medium bg-blue-600 text-white px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 hover:bg-blue-800 active:bg-blue-400"
          >
            Find Meals
          </Link>
        </div>
      </header>
      <main className="py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-page" element={<SearchPage />} />
          <Route path="/FAQs" element={<FAQs />} />
        </Routes>
        <footer>
          <Footer />
        </footer>
      </main>
    </BrowserRouter>
  );
}

export default App;
