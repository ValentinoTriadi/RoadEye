"use client";

import React, { createContext, useContext } from "react";

const LoginContext = createContext({
  login: false,
  type: "public",
  loginStatus: () => {},
  loginType: () => {},
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

  const loginType = () => {
    setType((prevType) => {
      if (prevType === "public") {
        return "admin";
      } else {
        return "public";
      }
    });
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
