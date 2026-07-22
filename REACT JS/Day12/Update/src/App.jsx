import React, { useState } from 'react'
import Array from './Component/Array'
import Array_obj from './Component/Array_Obj'

const App = () => {

  const [obj,setObj]=useState({Name:"Mobile",Model:"17 Pro",Rate:10000})
  const objChange = ()=>{
    // const updateObj ={...obj}
    // updateObj.Model= "18 Max"
    //setObj(updateObj)
    setObj({...obj,Model:"18 pro"})

  }

  return (
   <>
   <div>
    <h1>{obj.Name}</h1>
    <p>{obj.Model}</p>
    <p>{obj.Rate}</p>
    <button onClick={objChange}>Click to change</button>
   </div>
   <Array/>
   <Array_obj/>
   </>
  )
}

export default App