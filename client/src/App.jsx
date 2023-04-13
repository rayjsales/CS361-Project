import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Home, SearchPage, FAQs } from "./pages";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <div className="w-28 object-contain">FLAVOR-IT</div>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/search-page">Search Page</Link>
        <Link to="/faqs">FAQs</Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-page" element={<SearchPage />} />
          <Route path="/FAQs" element={<FAQs />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
