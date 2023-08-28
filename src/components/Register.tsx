import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";
import { createUser, auth, storage, firestore } from "../services/firebase";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

export interface User {
  fullname: string;
  email: string;
  password: string;
  file?: any;
}

const Register = () => {
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

  return (
    <Box height={"100vh"} width={"100vw"} bg={"gray.600"}>
      <VStack justifyContent={"center"} width={"100%"} height={"100%"}>
        <Box minHeight={"600px"} width={"500px"} bg={"white"} borderRadius={10}>
          <VStack
            height={"full"}
            width={"full"}
            justifyContent={"space-evenly"}
          >
            <Box>
              <Heading textAlign={"center"}>Register</Heading>
              <Text fontSize={"xl"}>Your space to be social.</Text>
            </Box>
            <RegisterForm
              onSubmit={(data) => {
                registerUser(data);
              }}
              isRegistering={isRegistering}
            />
            {error && (
              <Box borderRadius={3} bg={"tomato"} w={"96"} textAlign={"center"}>
                <Text color={"white"}>{error}</Text>
              </Box>
            )}
            <Box>
              <Text>
                Already have an account?{" "}
                <Link to="/login">
                  <Text fontWeight={"semibold"} as={"u"}>
                    Login
                  </Text>
                </Link>
              </Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Register;
