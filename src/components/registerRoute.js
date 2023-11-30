import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";
import RegisterPage from "../pages/register";
import Navigation from "./Navigation";
import Footer from "./Footer";

const RegisterRoute = () => {
  if (Cookies.get("token") === undefined) {
    return (
      <>
        <Navigation />
        <RegisterPage />
        <Footer />
      </>
    );
  } else if (Cookies.get("token") !== undefined) {
    window.alert("Logged In!");
    return <Navigate to={"/"} />;
  }
};

export default RegisterRoute;
