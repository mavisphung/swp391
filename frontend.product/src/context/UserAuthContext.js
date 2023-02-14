import { createContext, useContext, useState } from "react";

const userAuthContext = createContext();

export const useUserAuth = () => {
  return useContext(userAuthContext);
};

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  async function loginWithEmail(email, password) {
    try {
      // const response = await api.post('/auth/sign-in', {
      //     email,password,
      // });
      const response = {
        type: "get",
        data: {
          name: "admin",
          email: "admin@gmail.com",
          password: "admin123",
          roleId: "admin",
          statusId: "active",
        },
      };
      //   localStorage.setItem('user', JSON.stringify(response.data))
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  function logOut() {
    setUser();
    // localStorage.removeItem('user');
  }

  function getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  return (
    <userAuthContext.Provider value={{ user, logOut, loginWithEmail, getUser }}>
      {children}
    </userAuthContext.Provider>
  );
};
