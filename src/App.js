import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import "./App.css";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import Products from "./components/pages/Products";
import SignUp from "./components/pages/SignUp";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import SubscriberForm from "./components/SubscriberForm";
import CityForm from "./components/CityForm";
// import store from "./asyncCityActions";
import rootStore from "./asyncCityAction";

function App() {
  return (
    <>
      <Provider store={rootStore}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<CityForm />} />
            {/* <Route path="/" element={<SubscriberForm />} /> */}
            {/* <Route path="/" element={<PostForm />} /> */}
            {/* <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sign-up" element={<SignUp />} /> */}
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
