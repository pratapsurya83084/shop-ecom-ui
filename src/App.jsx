import React from "react";
import Home from "./components/home/Home";
import Kids from "./components/categoryProducts/Kids";
import BestSelling from "./components/categoryProducts/BestSelling";
import Electronics from "./components/categoryProducts/Electronics";
import Mens from "./components/categoryProducts/Mens";
import TopRated from "./components/categoryProducts/TopRated";
import Trending from "./components/categoryProducts/Trending";
import SingleProductKids from "./components/singlepage/SingleProductKids";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import MenSinglepage from "./components/singlepage/MenSinglepage";
import ElectronicSinglepage from "./components/singlepage/ElectronicSinglepage";

const App = () => {
  return (
    <Routers>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/best-selling" element={<BestSelling />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/mens" element={<Mens />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/singlepage/:id" element={<SingleProductKids />} />
        <Route path="/MenSinglepage/:id" element={<MenSinglepage />} />
        <Route
          path="/electronicSinglepage/:id"
          element={<ElectronicSinglepage />}
        />
      </Routes>
    </Routers>
  );
};

export default App;
