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
import Womens from "./components/categoryProducts/Womens";
import WomenSinglepage from "./components/singlepage/WomenSinglepage";
import TrendingSinglepage from "./components/singlepage/TrendingSinglepage";
import BestSellingSinglepage from "./components/singlepage/BestSellingSinglepage";
import TopratedSinglepage from "./components/singlepage/TopratedSinglepage";
import Login from "./components/user/Login";
import Signup  from './components/user/Signup';
import DashBoard from "./components/admin/DashBoard";
import ProtectRoute from "./components/admin/ProtectRoute";
import AllProducts from "./components/Allproduct/AllProducts";
import AllSinglepage from "./components/singlepage/AllSinglepage";
import UserProfile from "./components/user/UserProfile";
import Cart from "./components/user/Cart";
import PaymentCheckout from './components/checkout/PaymentCheckout';
import OrderConfirmation from "./components/orderConfirmation/OrderConfirmation";
import PotectUserRoute from "./components/protectRoutes/PotectUserRoute";
import Error404 from "./components/Error404";

const App = () => {
  return (
    <Routers>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        
        <Route path="/profile" element={<PotectUserRoute> <UserProfile />  </PotectUserRoute> } />

        <Route path="/kids" element={<Kids />} />
        <Route path="/best-selling" element={<BestSelling />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/mens" element={<Mens />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<PaymentCheckout />} />
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />






        <Route path="/allSinglepage/:id" element={<AllSinglepage />} />
        <Route path="/singlepagekids/:id" element={<SingleProductKids />} />
        <Route path="/MenSinglepage/:id" element={<MenSinglepage />} />
        <Route  path="/electronicSinglepage/:id" element={<ElectronicSinglepage />}/>
        <Route  path="/womenSinglepage/:id" element={<WomenSinglepage />}/>
        <Route  path="/women" element={<Womens />}/>

        <Route  path="/TrendingSinglepage/:id" element={<TrendingSinglepage />}/>
        <Route  path="/bestSelinglePage/:id" element={<BestSellingSinglepage />}/>
        <Route  path="/toprated-Singlepage/:id" element={<TopratedSinglepage />}/>
       
        <Route  path="/dashboard" element={ <ProtectRoute> <DashBoard />   </ProtectRoute>}/>
        <Route  path="*" element={ <Error404 /> }/>
      
      




      </Routes>
    </Routers>
  );
};

export default App;
