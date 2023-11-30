import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";
import LoginPage from "../pages/login";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Swal from "sweetalert2";

const LoginRoute = () => {
  if (Cookies.get("token") === undefined) {
    return (
      <>
        <Navigation />
        <LoginPage />
        <Footer />
      </>
    );
  } else if (Cookies.get("token") !== undefined) {
    window.alert("Logged In");
    return <Navigate to={"/"} />;
  }
};

export default LoginRoute;
