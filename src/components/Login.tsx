import { Box, Heading, VStack } from "@chakra-ui/react";

const Login = () => {
  return (
    <Box height={"100vh"} width={"100vw"} bg={"gray.600"}>
      <VStack
        justifyContent={"center"}
        alignItems={"center"}
        alignContent={"center"}
        width={"100%"}
        height={"100%"}
      >
        <Box height={"700px"} width={"500px"} bg={"whiteAlpha.300"}>
          <VStack>
            <Heading>Login</Heading>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Login;
