import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between">
      <h2 className="font-bold">React Tasks</h2>

      <div className="flex gap-5">
        <Link to="/">Home</Link>
        <Link to="/Employee">Employee</Link>
      </div>
    </div>
  );
};

export default NavBar;