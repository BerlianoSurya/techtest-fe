import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { GlobalContext } from "../context/GlobalContext";

const Profile = () => {
  const { contextState } = useContext(GlobalContext);
  const { profile, setProfile } = contextState;
  const localUser = JSON.parse(Cookies.get("user"));
  const [input, setInput] = useState({
    name: "",
    profile_image: "",
  });
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("uid", "==", localUser.uid)
      );
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setProfile(data);
      setInput({
        name: data.name,
        profile_image: data.profile_image,
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "An error occured while fetching user data",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInput({ ...input, [name]: value });
  };

  const handleUbahProfil = async (event) => {
    event.preventDefault();

    let { name, profile_image } = input;
    if (name === "" || profile_image === "") {
      Swal.fire({
        title: "Blank field!",
        text: "Fill all required fields!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      const q = query(
        collection(db, "users"),
        where("uid", "==", localUser.uid)
      );
      const refDoc = await getDocs(q);

      const data = refDoc.docs[0].data();
      const docRef = doc(db, "users", data.uid);
      updateDoc(docRef, {
        name: name,
        profile_image: profile_image,
      })
        .then((response) => {
          Swal.fire({
            title: "Success!",
            text: "Successfully change profile",
            icon: "success",
            confirmButtonText: "OK",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload(false);
            }
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "An error occured while fetching user data",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchProfile();
  }, [user, loading]);

  return (
    <div className="user py-4">
      <div className="user-container bg-transparent card shadow p-3">
        <div className="text-center mb-5">
          <h2 className="mb-4">Profile</h2>
          <img src={profile.profile_image} width="100" />
        </div>
        <h4>Name: {profile.name}</h4>
        <h4>Email: {profile.email}</h4>
        <div className="text-end">
          <button
            type="button"
            className="btn btn-warning ms-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Change profile
          </button>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Change Profile
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUbahProfil}>
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    value={input.name}
                    type="name"
                    placeholder="Nama"
                  />
                  <label htmlFor="profile_image" className="form-label">
                    Photo Profile Link
                  </label>
                  <textarea
                    className="form-control"
                    name="profile_image"
                    onChange={handleChange}
                    value={input.profile_image}
                    type="profile_image"
                    placeholder="profile_image"
                  />
                  <button
                    type="submit"
                    className="btn btn-warning rounded-pill float-end mt-3"
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn rounded-pill btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
