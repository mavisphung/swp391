import { createContext, useContext, useState } from "react";
import api from "./AppApi";

const userAuthContext = createContext();

export const useUserAuth = () => {
  return useContext(userAuthContext);
};

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  async function loginWithEmail(email, password) {
    try {
      const response = await api.post(
        "/auth/sign-en",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            signUpMethod: "local",
          },
        }
      );

      //   localStorage.setItem('user', JSON.stringify(response.data))
      console.log("RES", response);
      console.log("RES.DATA", response.data);
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error);
    }
  }

  function logOut() {
    setUser();
    // localStorage.removeItem('user');
  }

  function getUser() {
    return user;
    // return JSON.parse(localStorage.getItem("user"));
  }

  return (
    <userAuthContext.Provider value={{ user, logOut, loginWithEmail, getUser }}>
      {children}
    </userAuthContext.Provider>
  );
};
