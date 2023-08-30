import { useContext, useEffect, useRef } from "react";

import { Avatar, Box, HStack, Image, Spinner, Text } from "@chakra-ui/react";
import { Message } from "./ChatPanel";
import { ChatContext } from "../context/ChatContext";

interface Props {
  message: Message;
}

const ImageMessageCardTwo = ({ message }: Props) => {
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
        <Avatar size={"sm"} src={photoURL!} name={fullName!}></Avatar>
      </Box>
      <Box bg={"white"} w={"96"} borderRadius={"lg"} ml={2}>
        <Image
          fallback={
            <Box
              borderRadius={"lg"}
              display={"flex"}
              bg={"gray.100"}
              h={"100px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Spinner></Spinner>
            </Box>
          }
          src={message.fileLink}
          objectFit={"cover"}
          alt={message.text}
          borderRadius={"lg"}
        />
        {message.text && <Text px={2}>{message.text}</Text>}
      </Box>
    </HStack>
  );
};

export default ImageMessageCardTwo;
