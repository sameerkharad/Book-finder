import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar"; // import the navbar component

export default function App() {
  return (
    <BrowserRouter>
     

      <main className=" w-full ">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/favorites" element={<Favorites />} />
  </Routes>
</main>

    </BrowserRouter>
  );
}
