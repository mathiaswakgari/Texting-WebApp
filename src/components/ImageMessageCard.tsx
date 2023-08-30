import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { Avatar, Box, HStack, Text, Image, Spinner } from "@chakra-ui/react";
import { Message } from "./ChatPanel";

interface Props {
  message: Message;
}

const ImageMessageCard = ({ message }: Props) => {
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const currentUser = useContext(AuthContext);
  return (
    <HStack
      ref={ref}
      w={"full"}
      minH={"70px"}
      marginY={3}
      justifyContent={"end"}
    >
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

export default ImageMessageCard;
