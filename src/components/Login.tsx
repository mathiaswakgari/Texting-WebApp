import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const { error, isLogging, loginUser } = useLogin();
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
                loginUser(data);
              }}
              isLogging={isLogging}
            />
            {error && (
              <Box borderRadius={3} bg={"tomato"} w={"96"} textAlign={"center"}>
                <Text color={"white"}>{error}</Text>
              </Box>
            )}
            <Box>
              <Text>
                Don't have an account yet?{" "}
                <Link to={"/register"}>
                  <Text as={"u"} fontWeight={"semibold"}>
                    Register here
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

export default Login;
