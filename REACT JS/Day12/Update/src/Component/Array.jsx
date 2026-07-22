import React, { useState } from 'react'

const Array = () => {

const [arr,setArr]=useState(["Apple","Iqoo","Vivo"])
const arrChange =()=>{
    setArr([...arr,arr[1]="Redme"])
}

  return (
   <>
<div>
    <h1>{arr}</h1>
    <button onClick={arrChange}> click</button>
</div>
   
   </>
  )
}

export default Array