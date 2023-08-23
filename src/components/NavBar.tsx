import { Avatar, Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

const NavBar = () => {
  return (
    <Box height={"50px"}>
      <HStack justifyContent={"space-between"} alignContent={"space-between"}>
        <Heading fontSize={"2xl"}>Texting</Heading>
        <HStack>
          <HStack>
            <Avatar size={"sm"} name="Mathias Wakgari" src={""}></Avatar>
            <Text>Mathias Wakgari</Text>
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
