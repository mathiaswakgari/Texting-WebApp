import { Box, VStack, Text, HStack, Spinner } from "@chakra-ui/react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import MessageCard from "./MessageCard";
import MessageCardTwo from "./MessageCardTwo";
import { v4 } from "uuid";
import { ChatContext } from "../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../services/firebase";
import { AuthContext } from "../context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const ChatPanel = () => {
  const {
    data: {
      chatId,
      userInfo: { fullName, photoURL, uid },
    },
  } = useContext(ChatContext);
  const currentUser = useContext(AuthContext);

  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File>();

  const handleSend = async () => {
    if (file) {
      const storageRef = ref(storage, v4());
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(firestore, "chats", chatId), {
              messages: arrayUnion({
                id: v4(),
                text: message,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                file: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(firestore, "chats", chatId), {
        messages: arrayUnion({
          id: v4(),
          text: message,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
  };

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
        <ChatInput
          onMessageChange={(text) => setMessage(text)}
          onFileChange={(file) => setFile(file)}
          onSend={handleSend}
        />
      </Box>
    </VStack>
  );
};

export default ChatPanel;
