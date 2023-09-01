import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";

const Register = () => {
  const { error, isRegistering, registerUser } = useRegister();

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
