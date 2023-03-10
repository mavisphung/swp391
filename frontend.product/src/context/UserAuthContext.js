import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

import api from "./AppApi";
import {
  connectError,
  loginSucess,
  noNetwork,
  wrongEmail,
  wrongPassword,
} from "~/system/Constants/ToastMessage";
import {
  invalidPassword,
  networkError,
  requestFailed500,
  userNotFound,
} from "~/system/Constants/ErrorMessage";

const userAuthContext = createContext();

export const useUserAuth = () => {
  return useContext(userAuthContext);
};

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  async function loginWithEmail(email, password, saveLogin) {
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
        setUser(response.data);
        if (saveLogin) {
          localStorage.setItem("USER", JSON.stringify(response.data));
        }
        toast.success(loginSucess);
        return response.data;
      }
    } catch (error) {
      if (error.message === requestFailed500) {
        toast.error(noNetwork);
      }
      if (error.message === networkError) {
        toast.error(connectError);
      } else {
        const errData = error.response.data;
        if (errData.message === invalidPassword) {
          toast.error(wrongPassword);
        } else if (errData.message === userNotFound) {
          toast.error(wrongEmail);
        }
      }
    }
  }

  function logOut() {
    setUser();
    localStorage.removeItem("USER");
  }

  function getUser() {
    const localUser = JSON.parse(localStorage.getItem("USER"));
    return localUser ?? user;
  }

  return (
    <userAuthContext.Provider value={{ logOut, loginWithEmail, getUser }}>
      {children}
    </userAuthContext.Provider>
  );
};
