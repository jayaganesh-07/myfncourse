import React from "react";

const StudentCard = ({ Name, Age, Course, isPlaced }) => {
  return (
    <>
      <h2>Task-1</h2>

      <p>Name : {Name}</p>
      <p>Age : {Age}</p>
      <p>Course : {Course}</p>
      <p>Status : {isPlaced ? "Placed" : "Not Placed"}</p>
    </>
  );
};

export default StudentCard;