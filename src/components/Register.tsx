import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";
import { createUser, auth, storage } from "../services/firebase";
import { useEffect, useState } from "react";
import {
  UploadTaskSnapshot,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { UserCredential, updateProfile } from "firebase/auth";

export interface User {
  fullname: string;
  email: string;
  password: string;
  file?: File;
}

interface Credential {
  displayName: string | null;
  photoURL: string | null;
}

const Register = () => {
  const [registerInfo, setRegisterInfo] = useState<User>({} as User);

  useEffect(() => {
    const controller = new AbortController();

    const res = createUser(auth, registerInfo.email, registerInfo.password);

    const storageRef = ref(storage, registerInfo.fullname);
    const uploadTask = uploadBytesResumable(storageRef, registerInfo.file!);

    uploadTask.on(
      "state_changed",

      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          res.then((data) => {
            updateProfile(data.user, {
              displayName: registerInfo.fullname,
              photoURL: downloadURL,
            });
          });
        });
      }
    );

    return () => controller.abort();
  }, [registerInfo]);
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
