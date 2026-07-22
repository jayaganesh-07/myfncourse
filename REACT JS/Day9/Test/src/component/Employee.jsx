const Employee = ({ detail }) => {
  return (
    <div className="border p-5 rounded bg-yellow-200">
      <h2>Name : {detail.name}</h2>
      <h2>Email : {detail.email}</h2>
      <h2>Department : {detail.dept}</h2>
    </div>
  );
};

export default Employee;