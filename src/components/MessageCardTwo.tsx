import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import { Message } from "../hooks/useChatPanel";
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
        minH={"30px"}
        maxW={"96"}
        bg={"whiteAlpha.300"}
        color={"white"}
        borderRadius={"10px 0px 10px 10px"}
        ml={2}
        maxWidth={"full"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Text fontWeight={"normal"} px={2} fontSize={"sm"}>
          {message.text}
        </Text>
      </Box>
      <Box pr={1}>
        <Avatar
          size={"sm"}
          src={currentUser.photoURL!}
          name={currentUser.displayName!}
        ></Avatar>
      </Box>
    </HStack>
  );
};

export default MessageCardTwo;
