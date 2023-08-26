import { Box, VStack, Text, HStack, Spinner } from "@chakra-ui/react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import MessageCard from "./MessageCard";
import MessageCardTwo from "./MessageCardTwo";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../services/firebase";

const ChatPanel = () => {
  const {
    data: {
      chatId,
      userInfo: { fullName, photoURL, uid },
    },
  } = useContext(ChatContext);

  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    if (chatId) {
      onSnapshot(doc(firestore, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages as []);
      });
    }
  }, [chatId]);

  return (
    <VStack bg={"gray.700"}>
      <HStack
        justifyContent={"space-between"}
        bg={"gray.400"}
        h={"50px"}
        w={"full"}
      >
        <Text>{fullName}</Text>
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
        {messages ? (
          <Spinner></Spinner>
        ) : (
          messages.map((message: any) => (
            <MessageCard key={message.id} message={message} />
          ))
        )}
      </Box>
      <Box w={"full"} h={"full"} bg={"red"}>
        <ChatInput />
      </Box>
    </VStack>
  );
};

export default ChatPanel;
