import {
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { BsDoorOpen } from "react-icons/bs";
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
        {/* <Heading fontSize={"2xl"} color={"black"}>
          Z
        </Heading> */}

        <Image boxSize={"20"} src={logo} alt={logo} />
        <HStack>
          <HStack mr={"20px"}>
            <Avatar
              size={"sm"}
              name={currentUser?.displayName!}
              src={currentUser?.photoURL!}
            ></Avatar>
            <Text color={"whiteAlpha.800"}>{currentUser.displayName}</Text>
          </HStack>
          <BsDoorOpen
            onClick={() => {
              dispatch({ type: "RESET", payload: {} });
              signOut(auth);
            }}
            fontSize="25px"
            color="whiteAlpha.800"
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default NavBar;
