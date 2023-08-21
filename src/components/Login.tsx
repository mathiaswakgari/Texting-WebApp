import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import LoginForm from "./LoginForm";

const Login = () => {
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
            <LoginForm />
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
