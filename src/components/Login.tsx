import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import { useState } from "react";
import { auth, login } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export interface User {
  email: string;
  password: string;
}

const LoginUser = async (loginCredential: User) => {
  if (Object.keys(loginCredential).length !== 0) {
    await login(auth, loginCredential.email, loginCredential.password);
  }
};

const Login = () => {
  const navigate = useNavigate();

  return (
    <Box height={"100vh"} width={"100vw"} bg={"gray.600"}>
      <VStack justifyContent={"center"} width={"100%"} height={"100%"}>
        <Box height={"600px"} width={"500px"} bg={"white"} borderRadius={10}>
          <VStack
            height={"full"}
            width={"full"}
            justifyContent={"space-evenly"}
          >
            <Box>
              <Heading textAlign={"center"}>Login</Heading>
              <Text fontSize={"xl"}>Your space to be social.</Text>
            </Box>
            <LoginForm
              onSubmit={(data) => {
                LoginUser(data)
                  .then(() => {
                    navigate("/");
                  })
                  .catch((error) => {});
              }}
            />
            <Box>
              <Text>Don't have an account yet? Register here</Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Login;
