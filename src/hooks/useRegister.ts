import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, createUser, firestore, storage } from "../services/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export interface User {
  fullname: string;
  email: string;
  password: string;
  file?: any;
}

const useRegister = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  const registerUser = async (registerInfo: User) => {
    if (Object.keys(registerInfo).length !== 0) {
      setIsRegistering(true);
      await createUser(auth, registerInfo.email, registerInfo.password)
        .then(async (res) => {
          setIsRegistering(true);
          if (Object.keys(registerInfo.file).length !== 0) {
            const storageRef = ref(storage, res.user.uid);
            const uploadTask = uploadBytesResumable(
              storageRef,
              registerInfo.file[0]
            );
            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (error) => {
                setIsRegistering(false);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                  async (downloadURL) => {
                    await updateProfile(res.user, {
                      displayName: registerInfo.fullname,
                      photoURL: downloadURL,
                    });
                    await setDoc(doc(firestore, "users", res.user.uid), {
                      fullName: registerInfo.fullname,
                      email: registerInfo.email,
                      photoURL: downloadURL,
                      uid: res.user.uid,
                    });
                    await setDoc(doc(firestore, "userChats", res.user.uid), {});
                  }
                );
              }
            );
          } else {
            await updateProfile(res.user, {
              displayName: registerInfo.fullname,
            });
            await setDoc(doc(firestore, "users", res.user.uid), {
              fullName: registerInfo.fullname,
              email: registerInfo.email,
              photoURL: "",
              uid: res.user.uid,
            });
            await setDoc(doc(firestore, "userChats", res.user.uid), {});
          }
          setIsRegistering(false);
          navigate("/login");
        })
        .catch((e: FirebaseError) => {
          setIsRegistering(false);
          setError("An unknown error occured. Try again");
        });
    }
  };
  return {
    error,
    isRegistering,
    registerUser,
  };
};
export default useRegister;
