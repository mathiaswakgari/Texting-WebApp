import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import React from "react";

type Props = {
  children: ReactNode;
};

export const AuthContext = React.createContext<User | null>(null);
export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    auth.onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser);
    });

    return () => controller.abort();
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
