import React from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Home from "./components/HomePage/home";
import Navbar from "./components/Navbar/navbar";

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Home />}></Route>
        <Route path="/pricing" element={<Home />}></Route>
        <Route path="/blog" element={<Home />}></Route>
        </Routes>
    </BrowserRouter>
  );
};

export default App;
