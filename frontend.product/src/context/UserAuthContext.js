import { createContext, useContext } from "react";
import api from "./AppApi";

const userAuthContext = createContext();

export const useUserAuth = () => {
  return useContext(userAuthContext);
};

export const UserAuthContextProvider = ({ children }) => {
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
      if (response.status === 201) {
        localStorage.setItem("USER", JSON.stringify(response.data));
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  function logOut() {
    localStorage.removeItem("USER");
  }

  function getUser() {
    return JSON.parse(localStorage.getItem("USER"));
  }

  return (
    <userAuthContext.Provider value={{ logOut, loginWithEmail, getUser }}>
      {children}
    </userAuthContext.Provider>
  );
};
