import React from "react";
import Counter from "./component/Counter";
import NameChange from "./component/nameChange";
import LoginStatus from "./component/LoginStatus ";
import courseUpdate from "./component/courseUpdate";

const App = () => {
  return (
    <>
      <Counter />
      <NameChange />
      <LoginStatus/>
      <courseUpdate/>
    </>
  );
};

export default App;