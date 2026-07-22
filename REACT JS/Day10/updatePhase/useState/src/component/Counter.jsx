import { useState } from "react"


const Counter = () => {

    const [count,setCount] = useState(0)
const handleClick=()=>{
    setCount(count+1)
}

  return (
    <>
  <div >
      <h1 className="text-3xl m-5 ">Task-1</h1>
    <p  className="text-red-500 text-2xl p-5 font-bold">{count}</p>
    <button  className=" p-5 bg-amber-200 text-amber-950 rounded-3xl w-50  hover:bg-blue-700"  onClick={handleClick} >Click to Change</button>
  </div>
   
    </>
  )
}

export default Counter