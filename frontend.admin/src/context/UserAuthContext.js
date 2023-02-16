import { createContext, useContext, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import api from '../api/api';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  async function loginEmailAndPassword(email, password) {
    let payload = {
      email,
      password,
    };

    try {
      // const response = await api.post('/auth/sign-en', payload, {
      //   headers: { signUpMethod: 'local' },
      // });
      // console.log('Response: ', response.data);
      const response = {
        data: {
          id: '1',
          fullname: 'Admin Chystore',
          email: 'admin@chystore.vn',
          password: '123456',
          roleId: 1,
          status: true,
        },
      };
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
