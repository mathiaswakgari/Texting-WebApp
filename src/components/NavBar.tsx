import { Avatar, Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const currentUser = useContext(AuthContext);

  return (
    <Box height={"50px"}>
      <HStack
        justifyContent={"space-between"}
        alignContent={"center"}
        alignItems={"center"}
        height={"full"}
      >
        <Heading fontSize={"2xl"} color={"black"}>
          ChatApp
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
            onClick={() => signOut(auth)}
            size={"xs"}
            borderRadius={0}
            colorScheme="green"
          >
            Signout
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default NavBar;
