import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";

const Register = () => {
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
            <RegisterForm />
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
