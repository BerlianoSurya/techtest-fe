import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Swal from "sweetalert2";
import axios from "axios";
import { BsHeartFill, BsHeart, BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const DetailDone = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [filtered, setFiltered] = useState([]);
  const [length, setLength] = useState();
  const [likeArray, setLikeArray] = useState([]);
  const { contextState, contextFunctions } = useContext(GlobalContext);
  const { fetchStatusDone, setFetchStatusDone } = contextState;
  const { formatDate } = contextFunctions;
  const linkDaftar = () => {
    return `https://${filtered.link_daftar}`;
  };
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/todo/${id}`)
      .then((res) => {
        if (res.status === 200) {
          navigate("/", { replace: true });
        }
      })
      .catch((e) => console.log(e));
  };

  const handleDone = () => {
    axios
      .put(`http://localhost:8080/api/todo/done/${id}`)
      .then((res) => {
        if (res.status === 200) navigate(`/ongoing/${id}`, { replace: true });
      })
      .catch((e) => console.log(e));
  };

  const handleEdit = () => {
    navigate(`/editTodo/${id}`);
  };
  useEffect(() => {
    axios.get(`http://localhost:8080/api/todo/${id}`).then((response) => {
      const res = response.data;
      setFiltered(res);
      setFetchStatusDone(false);
    });
  }, [fetchStatusDone]);

  return (
    <div className="detail-page py-4">
      <div className="detail-page__body container text-lg-start mt-5">
        <div className="header__container">
          <h2 className="fw-bold mb-3">{filtered.title}</h2>
          <div className="btncontainer__ongoing">
            <button className="btn__done" onClick={handleDone}>
              Mark as Ongoing
            </button>
            <button className="btn__edit" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn__delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
        <h5 className="mt-3 fw-bold">
          Due Date: {formatDate(filtered.due_date)}
        </h5>

        <div className="detail-page__desrkipsi">
          <span className="fw-bold">Description:</span>
          <p>{filtered.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailDone;
