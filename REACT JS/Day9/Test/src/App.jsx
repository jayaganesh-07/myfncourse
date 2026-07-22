import React from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./component/NavBar";
import Home from "./component/Home";
import Employee from "./component/Employee";

const App = () => {
  const emp = {
    name: "Ganesh",
    email: "jaya07ganesh@gmail.com",
    dept: "BE-ECE",
  };

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Employee" element={<Employee detail={emp} />} />
      </Routes>
    </>
  );
};

export default App;