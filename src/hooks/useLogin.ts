import { FirebaseError } from "firebase/app";
import { auth, login } from "../services/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface User {
  email: string;
  password: string;
}

const useLogin = () => {
  const navigate = useNavigate();
  const [isLogging, setIsLogging] = useState(false);
  const [error, setError] = useState("");

  const loginUser = async (loginCredential: User) => {
    setIsLogging(true);
    if (Object.keys(loginCredential).length !== 0) {
      await login(auth, loginCredential.email, loginCredential.password)
        .then(() => {
          navigate("/");
          setIsLogging(false);
        })
        .catch((error: FirebaseError) => {
          console.log(error.code);
          if (error.code == "auth/wrong-password")
            setError("Incorrect email or password. Try again");
          else if (error.code == "auth/too-many-requests")
            setError("Some error occurred. Please try again.");
          else {
            setError("An unkown error occurred. Try again");
          }
          setIsLogging(false);
        });
    }
  };
  return {
    isLogging,
    error,
    loginUser,
  };
};

export default useLogin;
