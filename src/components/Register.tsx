import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import bgImage from "../assets/background.jpg";

const Register = () => {
  const { error, isRegistering, registerUser } = useRegister();

  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      bgImage={bgImage}
      backgroundSize={"cover"}
    >
      <VStack justifyContent={"center"} width={"100%"} height={"100%"}>
        <Box
          width={{ base: "350px", md: "500px" }}
          bg={"blackAlpha.900"}
          paddingY={5}
          borderRadius={10}
          color={"whiteAlpha.800"}
        >
          <VStack
            height={"full"}
            width={"full"}
            justifyContent={"space-evenly"}
          >
            <Box>
              <Heading
                textAlign={"center"}
                fontSize={{
                  base: "2xl",
                  md: "3xl",
                }}
              >
                Register
              </Heading>
              <Text fontSize={{ base: "md", md: "xl" }}>
                Your space to be social.
              </Text>
            </Box>
            <Box></Box>
            <RegisterForm
              onSubmit={(data) => {
                registerUser(data);
                if (Object.keys(data.file).length !== 0) {
                }
              }}
              isRegistering={isRegistering}
            />
            {error && (
              <Box
                borderRadius={3}
                bg={"tomato"}
                w={{ md: "96" }}
                textAlign={"center"}
              >
                <Text color={"white"}>{error}</Text>
              </Box>
            )}
            <Box>
              <Text
                fontSize={{
                  base: "sm",
                  md: "md",
                }}
              >
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
