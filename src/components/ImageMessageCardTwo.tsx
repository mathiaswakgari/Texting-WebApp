import { useContext, useEffect, useRef } from "react";

import { Avatar, Box, HStack, Image, Spinner, Text } from "@chakra-ui/react";
import { Message } from "../hooks/useChatPanel";
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
      <Box
        bg={"whiteAlpha.300"}
        color={"white"}
        w={"96"}
        borderRadius={"lg"}
        ml={2}
      >
        <Image
          fallback={
            <Box
              borderRadius={"lg"}
              display={"flex"}
              bg={"whiteAlpha.300"}
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
          borderRadius={"10px 10px 0 0px"}
        />
        {message.text && (
          <Text px={2} fontSize={"sm"}>
            {message.text}
          </Text>
        )}
      </Box>
    </HStack>
  );
};

export default ImageMessageCardTwo;
