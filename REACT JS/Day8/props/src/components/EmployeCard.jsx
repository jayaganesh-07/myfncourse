import React from 'react'

const EmployeCard = ({details}) => {
  return (
    <>
    <h2>Task-2</h2>
    <h3>Employe Details</h3>
    <p>Name : {details.Name}</p>
    <p>Email : {details.Email}</p>
    <p>City : {details.City}</p>
    <p>Experience : {details.Experience}</p>
    
    </>
  )
}

export default EmployeCard