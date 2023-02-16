import { createContext, useContext, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import api from '../api/api';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  async function loginEmailAndPassword(email, password) {
    try {
      const response = await api.post('/auth/sign-en', {
        email,
        password,
      });
      console.log('Response', response);
      // const response = {
      //   type: 'get',
      //   data: {
      //     id: 'U0001',
      //     name: 'Bảo Khang',
      //     email: 'admin@chytech.com.vn',
      //     password: 'admin123',
      //     roleId: '1',
      //     status: '1',
      //   },
      // };
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.log('Error', error);
      return 0;
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
