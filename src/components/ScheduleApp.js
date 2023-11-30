import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate, Link } from "react-router-dom";

function ScheduleApp() {
  let navigate = useNavigate();
  const { contextState, contextFunctions } = useContext(GlobalContext);
  const {
    arrayOngoing,
    arrayDone,
    setFetchStatus,
    setFetchStatusDone,
    div1Ref,
    div2Ref,
  } = contextState;
  const { renderDataOngoing, renderDataDone } = contextFunctions;

  const handleDetail = (event) => {
    const id = parseInt(event.target.getAttribute("data-item"));
    navigate(`/ongoing/${id}`);
    setFetchStatus(true);
  };

  const handleDetailDone = (event) => {
    const id = parseInt(event.target.getAttribute("data-item"));
    navigate(`/done/${id}`);
    setFetchStatusDone(true);
  };
  useEffect(() => {
    renderDataOngoing();
    renderDataDone();
  }, []);
  return (
    <section className="schedule py-4">
      <div className="container">
        <section className="webinar-page py-5 mt-2" ref={div1Ref}>
          <div className="webinar">
            <div className="webinar__head d-flex justify-content-between">
              <h2 className="fw-bold">Ongoing Todo</h2>
            </div>
            <div className="webinar__body">
              <div className="row">
                {arrayOngoing.length !== 0 ? (
                  arrayOngoing.map((el) => (
                    <div className="col-lg-4 col-md-6" key={el.id}>
                      <div className="card card-item shadow mb-4">
                        <div className="card-body">
                          <h3>
                            <a onClick={handleDetail} data-item={el.id}>
                              {el.title}
                            </a>
                          </h3>
                          <p className="deskripsi my-4">{el.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center">
                    You don't have todo,{" "}
                    <Link to="/addTodo" style={{ color: "#0000ff" }}>
                      Add a todo
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="podcast-page py-1 mt-1" ref={div2Ref}>
          <div className="podcast">
            <div className="podcast__head d-flex justify-content-between mb-2">
              <h2 className="fw-bold">Done Todo</h2>
            </div>
            <div className="podcast__body">
              <div className="row">
                {arrayDone.length !== 0 ? (
                  arrayDone.map((el) => (
                    <div className="col-lg-4 col-md-6" key={el.id}>
                      <div className="card card-item shadow mb-4">
                        <div className="card-body">
                          <h3>
                            <a onClick={handleDetailDone} data-item={el.id}>
                              {el.title}
                            </a>
                          </h3>
                          <p className="deskripsi my-4">{el.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center">
                    You don't have todo,{" "}
                    <Link to="/addTodo" style={{ color: "#0000ff" }}>
                      Add a todo
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default ScheduleApp;
