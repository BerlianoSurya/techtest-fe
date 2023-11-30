import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axios from "axios";

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contextState } = useContext(GlobalContext);
  const { setIsLoggedIn } = contextState;
  const localUser = JSON.parse(Cookies.get("user"));
  const [input, setInput] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  const convertDateFormat = (inputDate) => {
    const [year, month, day] = inputDate.split("-");
    const dateObject = new Date(year, month - 1, day);
    const dd = String(dateObject.getDate()).padStart(2, "0");
    const mm = String(dateObject.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
    const yyyy = dateObject.getFullYear();
    const formattedDate = `${dd}-${mm}-${yyyy}`;
    return formattedDate;
  };
  const reverseDateFormat = (inputDate) => {
    const [dd, mm, yyyy] = inputDate.split("-");
    const dateObject = new Date(yyyy, mm - 1, dd);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
    const day = String(dateObject.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInput({ ...input, [name]: value });
  };

  const handleAdd = (event) => {
    event.preventDefault();
    let { title, due_date, description } = input;
    const newDate = convertDateFormat(due_date);

    if (title === "" || description === "" || due_date === "") {
      Swal.fire({
        title: "Error!",
        text: "Fill all required fields!",
        icon: "error",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      });
    } else {
      const tempObj = {
        title: title,
        due_date: newDate,
        description: description,
        user_id: localUser.uid,
      };
      axios
        .put(`http://localhost:8080/api/todo/${id}`, tempObj)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Todo Edited!",
          });
          navigate(-1);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8080/api/todo/${id}`);

      setInput({
        due_date: reverseDateFormat(res.data.due_date),
        title: res.data.title,
        description: res.data.description,
      });
    };
    fetchData();
  }, []);
  return (
    <div className="user d-flex justify-content-center">
      <div className="addtodo__container">
        <form onSubmit={handleAdd}>
          <h2 className="text-center fw-bold">Edit Todo</h2>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              className="form-control"
              name="title"
              onChange={handleChange}
              value={input.title}
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              name="description"
              onChange={handleChange}
              value={input.description}
              type="text"
              placeholder="Description"
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="due_date" className="form-label">
              Due Date
            </label>
            <input
              className="form-control"
              name="due_date"
              onChange={handleChange}
              value={input.due_date}
              type="date"
              placeholder="Due Date"
            />
          </div>
          <button
            className="btn btn-primary rounded-pill float-end mt-3"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTodo;
