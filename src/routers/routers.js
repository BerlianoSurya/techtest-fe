import React from "react";
import { GlobalProvider } from "../context/GlobalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import RegisterRoute from "../components/registerRoute";
import LoginRoute from "../components/LoginRoute";
import RegulerUserRoute from "../components/regUserRoute";
import Profile from "../pages/Profile";
import Page404 from "../components/Page404";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import DetailOngoing from "../components/DetailOngoing";
import DetailDone from "../components/DetailDone";
import AddTodo from "../components/AddTodo";
import EditTodo from "../components/EditTodo";

const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <Routes>
            <Route path="*" element={<Page404 />} />
            <Route
              path="/"
              element={
                // <Layout>
                <>
                  <RegulerUserRoute>
                    <Navigation />
                    <Home />
                    <Footer />
                  </RegulerUserRoute>
                </>
                // </Layout>
              }
            />
            <Route
              path="/ongoing/:id"
              element={
                // <Layout>
                <>
                  <RegulerUserRoute>
                    <Navigation />
                    <DetailOngoing />
                    <Footer />
                  </RegulerUserRoute>
                </>
                // </Layout>
              }
            />
            <Route
              path="/done/:id"
              element={
                // <Layout>
                <>
                  <RegulerUserRoute>
                    <Navigation />
                    <DetailDone />
                    <Footer />
                  </RegulerUserRoute>
                </>
                // </Layout>
              }
            />
            <Route
              path="/addTodo"
              element={
                // <Layout>
                <>
                  <RegulerUserRoute>
                    <Navigation />
                    <AddTodo />
                    <Footer />
                  </RegulerUserRoute>
                </>
                // </Layout>
              }
            />
            <Route
              path="/editTodo/:id"
              element={
                // <Layout>
                <>
                  <RegulerUserRoute>
                    <Navigation />
                    <EditTodo />
                    <Footer />
                  </RegulerUserRoute>
                </>
                // </Layout>
              }
            />
            <Route path="/register" element={<RegisterRoute />} />
            <Route path="/login" element={<LoginRoute />} />
            <Route
              path="/profile"
              element={
                <RegulerUserRoute>
                  <Navigation />
                  <Profile />
                  <Footer />
                </RegulerUserRoute>
              }
            />
          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    </>
  );
};

export default Routers;
