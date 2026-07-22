import React, { useState } from "react";

const LoginStatus = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = () => {
    setIsLogin(true);
  };

  return (

      <>
        <h1 className="text-3xl p-3">Task-3</h1>
      <h1 className="text-3xl font-bold mb-5">
        {isLogin ? "Welcome User" : "Please Login"}
      </h1>

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
  
      
      </>
  );
};

export default LoginStatus;