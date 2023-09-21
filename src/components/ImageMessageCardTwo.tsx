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
      userInfo: { fullName, photoURL },
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
        w={{ base: "24", sm: "36", md: "52", lg: "72", xl: "96" }}
        borderRadius={"lg"}
        ml={{ base: 0, md: 2 }}
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
          <Text px={2} fontSize={{ base: "xs", md: "sm" }}>
            {message.text}
          </Text>
        )}
      </Box>
    </HStack>
  );
};

export default ImageMessageCardTwo;
