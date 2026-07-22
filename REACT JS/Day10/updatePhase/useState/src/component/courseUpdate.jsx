import { useState } from "react"


const courseUpdate = () => {

    const [count,setCount] = useState("JavaScript")
const handleClick=()=>{
    setCount("React JS")
}

  return (
    <>
    <h1 className="text-3xl m-5">Task-5</h1>
    <p  className="text-red-500  font-bold p-5">{count}</p>
    <button  className=" p-5 bg-amber-200 text-amber-950 rounded-3xl w-50  hover:bg-orange-700"  onClick={handleClick} >Update Course</button>
   
    </>
  )
}

export default courseUpdate