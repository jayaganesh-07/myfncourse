import React, { useState } from "react";
import Array from "./component/Array";
import Task from "./component/Task";

const App = () => {
  const [color, setColor] = useState(true);

  const changeColor = () => {
    setColor(!color);
  };

  return (
    <>
    <Task/>
     <Array/>
      <div
        className={
          color
            ? "bg-fuchsia-400 w-40 h-40"
            : "bg-amber-200 w-40 h-40"
        }
      >
        <button
               onClick={changeColor}
          className="bg-white px-4 py-2 rounded m-5"
        >
              Click
        </button>
      </div>


     
    </>
  );
};

export default App;