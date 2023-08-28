import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import { Message } from "./ChatPanel";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

interface Props {
  message: Message;
}

const MessageCardTwo = ({ message }: Props) => {
  const currentUser = useContext(AuthContext);
  return (
    <HStack w={"full"} minH={"70px"} marginY={3} justifyContent={"end"}>
      <Box
        bg={"white"}
        minH={"50px"}
        maxW={"96"}
        borderRadius={"10px 0px 10px 10px"}
        ml={2}
        w={"full"}
      >
        <Text>{message.text}</Text>
      </Box>
      <Box pl={1}>
        <Avatar
          src={currentUser.photoURL!}
          name={currentUser.displayName!}
        ></Avatar>
      </Box>
    </HStack>
  );
};

export default MessageCardTwo;
