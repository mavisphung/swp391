import { createContext, useContext, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import api from '../api/api';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  async function loginEmailAndPassword(email, password) {
    try {
      // const response = await api.post('/auth/sign-in', {
      //   email,
      //   password,
      // });
      const response = {
        type: 'get',
        data: {
          name: 'Bao Khang',
          email: 'admin@chytech.com.vn',
          password: 'admin123',
          roleId: 'admin',
          statusId: 'active',
        },
      };
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  function logOut() {
    setCurrentUser('');
    localStorage.removeItem('user');
    return signOut(auth);
  }

  function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  return (
    <userAuthContext.Provider
      value={{ currentUser, logOut, loginEmailAndPassword, getCurrentUser }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
