import { Navigate } from "react-router-dom";

const Protected = (Child) => {
  const isLoggedIn = localStorage.getItem("authenticated");
  console.log("ISLOGGEDIN: ", isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }
  return <Child />;
};

export default Protected;
