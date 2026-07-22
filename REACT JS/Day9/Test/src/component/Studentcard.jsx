const Studentcard = ({ names, ages, courses }) => {
  return (
    <div className="border p-5 rounded bg-green-200">
      <h2>Name : {names}</h2>
      <h2>Age : {ages}</h2>
      <h2>Course : {courses}</h2>
    </div>
  );
};

export default Studentcard;