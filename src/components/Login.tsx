import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import bgImage from "../assets/background.jpg";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const { error, isLogging, loginUser } = useLogin();
  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      bgImage={bgImage}
      backgroundSize={"cover"}
    >
      <VStack justifyContent={"center"} width={"100%"} height={"100%"}>
        <Box
          paddingY={5}
          width={{ base: "275px", sm: "350px", md: "500px" }}
          bg={"blackAlpha.900"}
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
                Login
              </Heading>
              <Text fontSize={{ base: "md", md: "xl" }}>
                Your space to be social.
              </Text>
            </Box>
            <LoginForm
              onSubmit={(data) => {
                loginUser(data);
              }}
              isLogging={isLogging}
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
