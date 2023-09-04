import { Avatar, Box, HStack, Text, Image } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { PiSignOut } from "react-icons/pi";
import logo from "../assets/logo.png";

const NavBar = () => {
  const currentUser = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  return (
    <Box height={"50px"}>
      <HStack
        justifyContent={"space-between"}
        alignContent={"center"}
        alignItems={"center"}
        height={"full"}
      >
        <Image
          boxSize={{ base: "10", md: "20" }}
          src={logo}
          alt={logo}
          cursor={"pointer"}
        />
        <HStack>
          <HStack mr={"10px"}>
            <Avatar
              size={{ base: "xs", md: "sm" }}
              name={currentUser?.displayName!}
              src={currentUser?.photoURL!}
            ></Avatar>
            <Text
              noOfLines={1}
              fontSize={{ base: "xs", md: "md" }}
              color={"whiteAlpha.800"}
            >
              {currentUser.displayName}
            </Text>
          </HStack>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={{ base: "20px", md: "30px" }}
            height={{ base: "20px", md: "30px" }}
            borderRadius={"full"}
            cursor="pointer"
            _hover={{
              bg: "whiteAlpha.300",
              transitionDuration: "400ms",
            }}
          >
            <PiSignOut
              onClick={() => {
                dispatch({ type: "RESET", payload: {} });
                signOut(auth);
              }}
              fontSize={{ base: "15px", md: "25px" }}
              color="white"
            />
          </Box>
        </HStack>
      </HStack>
      <hr></hr>
    </Box>
  );
};

export default NavBar;
