import { User } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<User>({} as User);
export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>({} as User);

  useEffect(() => {
    const controller = new AbortController();
    auth.onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser);
    });

    return () => controller.abort();
  }, []);

  return (
    <AuthContext.Provider value={currentUser!}>{children}</AuthContext.Provider>
  );
};
