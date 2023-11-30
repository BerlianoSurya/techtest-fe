import Cookies from "js-cookie";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegulerUserRoute = (props) => {
  let navigate = useNavigate();
  if (Cookies.get("user") !== undefined) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
    // return navigate("/login");
  }
};

export default RegulerUserRoute;
