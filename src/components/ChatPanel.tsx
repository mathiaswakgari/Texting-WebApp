import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

import ChatInput from "./ChatInput";
const ChatPanel = () => {
  return (
    <VStack>
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
      <Box></Box>
      <Box w={"full"}>
        <ChatInput />
      </Box>
    </VStack>
  );
};

export default ChatPanel;
