import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import { Message } from "./ChatPanel";
import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";

interface Props {
  message: Message;
}

const MessageCard = ({ message }: Props) => {
  const ref = useRef<null | HTMLDivElement>(null);
  const {
    data: {
      userInfo: { fullName, photoURL, uid },
    },
  } = useContext(ChatContext);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <HStack ref={ref} w={"full"} minH={"70px"} marginY={3}>
      <Box pl={1}>
        <Avatar src={photoURL} name={fullName}></Avatar>
      </Box>
      <Box
        bg={"white"}
        minH={"30px"}
        maxW={"96"}
        borderRadius={"0 10px 10px 10px"}
        ml={2}
        maxWidth={"full"}
      >
        <Text px={2}>{message.text}</Text>
      </Box>
    </HStack>
  );
};

export default MessageCard;
