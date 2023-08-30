import { Avatar, Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { BsDoorOpen } from "react-icons/bs";

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
        <Heading fontSize={"2xl"} color={"black"}>
          Z
        </Heading>
        <HStack>
          <HStack>
            <Avatar
              size={"sm"}
              name={currentUser?.displayName!}
              src={currentUser?.photoURL!}
            ></Avatar>
            <Text>{currentUser.displayName}</Text>
          </HStack>
          <Button
            onClick={() => {
              dispatch({ type: "RESET", payload: {} });
              signOut(auth);
            }}
            size={"sm"}
            borderRadius={"lg"}
            colorScheme="green"
            rightIcon={<BsDoorOpen />}
          >
            Signout
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default NavBar;
