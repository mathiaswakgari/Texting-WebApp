import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import { Message } from "../hooks/useChatPanel";
import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";

interface Props {
  message: Message;
}

const MessageCard = ({ message }: Props) => {
  const ref = useRef<null | HTMLDivElement>(null);
  const {
    data: {
      userInfo: { fullName, photoURL },
    },
  } = useContext(ChatContext);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <HStack ref={ref} w={"full"} minH={"70px"} marginY={0}>
      <Box pl={1}>
        <Avatar src={photoURL} name={fullName} size={"sm"}></Avatar>
      </Box>
      <Box
        bg={"whiteAlpha.300"}
        color={"white"}
        minH={"30px"}
        maxW={{ md: "96", base: "52" }}
        borderRadius={"0 10px 10px 10px"}
        ml={{ base: 0, md: 2 }}
        maxWidth={"full"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Text fontWeight={"normal"} px={2} fontSize={{ md: "sm", base: "xs" }}>
          {message.text}
        </Text>
      </Box>
    </HStack>
  );
};

export default MessageCard;
