import React, { useState } from "react";

const Array = () => {
  const [array, setArray] = useState([1, 2, 3, 4, 5, 6]);
  const [obj,setObj] = useState({Model:"Iphone",Rate:"1Lakhs",Storage:256})



//array

  const changeData = () => {
    setArray([...array, 10003]);
  };
//object
  const chaneName = () =>{
    setObj({...obj,Model:"Iqoo",Rate:"2 Lakhs"})
  }


  return (
    <>
    
      <div className="p-5   rounded-3xl gap-3 bg-fuchsia-200
       w-40">
        <h1>Array</h1>
        <h1>{array.map((e)=>(
        <h1>
          {e}
        </h1>
      ))}</h1>
      <button className="rounded bg-amber-600 text-white w-20
      " onClick={changeData}>Click</button>
      </div>

      <div className="p-5   rounded-3xl gap-3 bg-cyan-300 w-40">
        <h1 className="text-3xl">Object</h1>
        <p>Model:{obj.Model}</p>
        <p>Rate:{obj.Rate}</p>
        <p>Storage:{obj.Storage}</p>
        <button className="rounded bg-amber-200" onClick={chaneName} > Click Here </button>
      </div>
    </>
  );
};

export default Array;