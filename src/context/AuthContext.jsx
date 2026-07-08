import { createContext, useContext, useEffect, useState } from "react";

import {
  getToken,
  saveToken,
  removeToken,
} from "../utils/tokenStorage";

import {
  fetchCurrentUser,
} from "../features/auth/services/loginService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState(getToken());

useEffect(() => {

  async function restoreSession() {

    if (!token) {

      setUser(null);

      setLoading(false);

      return;

    }

    const result =
      await fetchCurrentUser();

    if (result.success) {

      setUser(result.data);

    } else {

      removeToken();

      setToken(null);

      setUser(null);

    }

    setLoading(false);

  }

  restoreSession();

}, [token]);

async function login(token) {
  saveToken(token);

  setToken(token);

  const result = await fetchCurrentUser();

  if (result.success) {

    setUser(result.data);

    return true;

  }

  removeToken();

  setToken(null);

  setUser(null);

  return false;

}
  function logout() {

    removeToken();

    setToken(null);

    setUser(null);

  }

  return (

    <AuthContext.Provider

      value={{

        token,

        user,

        loading,

        login,

        logout,

        setUser,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  return useContext(AuthContext);

}