import React, { createContext, useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  // const localUser = JSON.parse(Cookies.get("user"));
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [profile, setProfile] = useState([]);
  const [fetchStatusDone, setFetchStatusDone] = useState(true);
  const [arrayOngoing, setArrayOngoing] = useState([]);
  const [arrayDone, setArrayDone] = useState([]);
  const [currentId, setcurrentId] = useState(-1);

  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);

  const executeScroll = (ref) => ref.current.scrollIntoView();

  const getUID = () => {
    if (Cookies.get("user") === undefined) {
      return null;
    } else {
      const userLocal = JSON.parse(Cookies.get("user"));
      const localUID = userLocal.uid;
      return localUID;
    }
  };
  const renderDataOngoing = () => {
    axios
      .get(`http://localhost:8080/api/todo/ongoing/user/${getUID()}`)
      .then((res) => {
        const tempArr = res.data.map((el) => {
          return el;
        });
        setArrayOngoing(tempArr);
      })
      .catch((e) => console.log(e));

    setFetchStatus(false);
  };

  const renderDataDone = () => {
    axios
      .get(`http://localhost:8080/api/todo/done/user/${getUID()}`)
      .then((res) => {
        const tempArr = res.data.map((el) => {
          return el;
        });
        setArrayDone(tempArr);
      })
      .catch((e) => console.log(e));
    setFetchStatusDone(false);
  };

  const formatDate = (dateString) => {
    if (dateString !== undefined) {
      const [day, month, year] = dateString.split("-");
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const formattedDate = new Date(`${year}-${month}-${day}`);
      const monthName = months[formattedDate.getMonth()];
      const formattedDay = formattedDate.getDate();
      const formattedYear = formattedDate.getFullYear();
      const result = `${formattedDay} ${monthName} ${formattedYear}`;

      return result;
    } else return null;
  };

  const showLocalDate = (date) => {
    let newDate = new Date(date).toLocaleString("id-ID", {
      month: "long",
      year: "numeric",
      day: "2-digit",
    });
    return newDate;
  };
  const fetchProfile = async () => {
    try {
      const localUser = JSON.parse(Cookies.get("user"));
      const q = query(
        collection(db, "users"),
        where("uid", "==", localUser.uid)
      );
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setProfile(data);
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "An error occured while fetching user data",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const contextState = {
    isLoggedIn,
    setIsLoggedIn,
    arrayOngoing,
    setArrayOngoing,
    arrayDone,
    setArrayDone,
    fetchStatus,
    setFetchStatus,
    fetchStatusDone,
    setFetchStatusDone,
    profile,
    setProfile,
    fetchProfile,
    div1Ref,
    div2Ref,
    div3Ref,
    executeScroll,
  };

  const contextFunctions = {
    renderDataOngoing,
    renderDataDone,
    showLocalDate,
    getUID,
    formatDate,
  };

  return (
    <GlobalContext.Provider
      value={{
        contextState,
        contextFunctions,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
