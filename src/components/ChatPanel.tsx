import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

import ChatInput from "./ChatInput";
import MessageCard from "./MessageCard";
import MessageCardTwo from "./MessageCardTwo";
const ChatPanel = () => {
  return (
    <VStack bg={"gray.700"}>
      <HStack
        justifyContent={"space-between"}
        bg={"gray.400"}
        h={"50px"}
        w={"full"}
      >
        <Text>Tyler</Text>
        <HStack>
          <AiOutlineVideoCameraAdd />
          <BsThreeDots />
        </HStack>
      </HStack>
      <Box
        overflow={"auto"}
        height={"calc(100vh - 64px - 50px)"}
        width={"full"}
      >
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCardTwo />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
      </Box>
      <Box w={"full"} h={"full"} bg={"red"}>
        <ChatInput />
      </Box>
    </VStack>
  );
};

export default ChatPanel;
