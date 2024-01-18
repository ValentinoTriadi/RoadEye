"use client";

import React, { createContext, useContext } from "react";

const LoginContext = createContext({
  login: false,
  type: "public",
  loginStatus: () => {},
  loginType: ({ type }: { type: string }) => {},
});

export const useLoginContext = () => {
  return useContext(LoginContext);
};

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [login, setLogin] = React.useState(false);
  const [type, setType] = React.useState("public");

  const loginStatus = () => {
    setLogin((prevLogin) => !prevLogin);
  };

  const loginType = ({ type }: { type: string }) => {
    setType(type);
  };

  const value = {
    login,
    type,
    loginStatus,
    loginType,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
