import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/footer";
import Home from "./components/HomePage/home"
import Navbar from "./components/Navbar/navbar";
import AboutUs from './components/AboutUs/AboutUs';
import ContactUs from './components/ContactUs/ContactUs';
import Pages from './components/Pages/Pages';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Pages" element={<Pages />}></Route>
        <Route path="/aboutUs" element={<AboutUs />}></Route>
        <Route path="/contactUs" element={<ContactUs />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
