import { useState } from "react"


const nameChange = () => {

    const [count,setCount] = useState("Sudhan")
const handleClick=()=>{
    setCount("React Developer")
}

  return (
    <>
    <h1 className="text-3xl m-5">Task-2</h1>
    <p  className="text-red-500  font-bold p-5">{count}</p>
    <button  className=" p-5 bg-amber-200 text-amber-950 rounded-3xl w-50  hover:bg-orange-700"  onClick={handleClick} >Click to Change</button>
   
    </>
  )
}

export default nameChange