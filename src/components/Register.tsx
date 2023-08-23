import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";
import { createUser, auth, storage, firestore } from "../services/firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export interface User {
  fullname: string;
  email: string;
  password: string;
  file?: any;
}

const registerUser = async (registerInfo: User) => {
  if (Object.keys(registerInfo).length !== 0) {
    const res = await createUser(
      auth,
      registerInfo.email,
      registerInfo.password
    );

    const storageRef = ref(storage, registerInfo.fullname);
    const uploadTask = uploadBytesResumable(storageRef, registerInfo.file[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
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
          await setDoc(doc(firestore, "chats", res.user.uid), {});
        });
      }
    );
  }
};

const Register = () => {
  const [registerInfo, setRegisterInfo] = useState<User>({} as User);
  const navigate = useNavigate();

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
                setRegisterInfo(data);
                registerUser(registerInfo).then(() => navigate("/"));
              }}
            />
            <Box>
              <Text>Already have an account? Login.</Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Register;
