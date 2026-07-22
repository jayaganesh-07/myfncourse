import Studentcard from "./Studentcard";
import Employee from "./Employee";
import Product from "./Product";
import Movie from "./Movie";
import Student_list from "./Student_list";

const Home = () => {
  const name = "Ganesh";
  const age = 22;
  const course = "FS";

  const emp = {
    name: "Ganesh",
    email: "jaya07ganesh@gmail.com",
    dept: "BE-CSE",
  };

  const proname = "Laptop";
  const price = 40000;
  const status = "Available";

  const arr = ["Vijay", "Ajith", "Suriya"];

  const obj = [
    { id: 1, name: "jaii", course: "FS Java" },
    { id: 2, name: "Rahul", course: "FS Python" },
    { id: 3, name: "Gokul", course: "FS MERN" },
    { id: 4, name: "Arun", course: "FS .NET" },
  ];

  return (
    <div className="p-5 space-y-5">
      <Studentcard names={name} ages={age} courses={course} />

      <Employee detail={emp} />

      <Product
        prosname={proname}
        prosprice={price}
        prostatus={status}
      />

      <Movie actor={arr} />

      <Student_list list={obj} />
    </div>
  );
};

export default Home;