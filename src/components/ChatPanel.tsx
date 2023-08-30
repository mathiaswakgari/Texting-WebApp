import { Box, VStack, Text, HStack, Spinner, Image } from "@chakra-ui/react";
import {
  AiOutlineVideoCameraAdd,
  AiOutlineArrowLeft,
  AiOutlineCloseCircle,
} from "react-icons/ai";
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
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../services/firebase";
import { AuthContext } from "../context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ImageMessageCard from "./ImageMessageCard";
import ImageMessageCardTwo from "./ImageMessageCardTwo";

export interface Message {
  date: Timestamp;
  text: string;
  senderId: string;
  id: string;
  fileLink?: string;
}

const ChatPanel = () => {
  const { dispatch } = useContext(ChatContext);

  const {
    data: {
      chatId,
      userInfo: { fullName, photoURL, uid },
    },
  } = useContext(ChatContext);
  const currentUser = useContext(AuthContext);

  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>();
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
                fileLink: downloadURL,
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
    await updateDoc(doc(firestore, "userChats", currentUser.uid), {
      [`${chatId}.lastMessage`]: {
        message,
      },
      [`${chatId}.date`]: serverTimestamp(),
    });
    await updateDoc(doc(firestore, "userChats", uid), {
      [`${chatId}.lastMessage`]: {
        message,
      },
      [`${chatId}.date`]: serverTimestamp(),
    });
  };

  useEffect(() => {
    if (chatId) {
      onSnapshot(doc(firestore, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages as []);
      });
    }
  }, [chatId]);

  return (
    <VStack bg={"blackAlpha.500"}>
      {!chatId ? (
        <Box w={"full"} height={"100vh"}>
          <Box h={"50px"} w={"full"}></Box>
          <VStack h={"calc(100vh - 50px)"} justifyContent={"center"}>
            <Text fontSize={"xl"} color={"white"}>
              Select a chat.
            </Text>
          </VStack>
        </Box>
      ) : (
        <>
          <HStack
            justifyContent={"space-between"}
            px={2}
            h={"50px"}
            w={"full"}
            bg={"whiteAlpha.100"}
            color={"whiteAlpha.900"}
          >
            <AiOutlineArrowLeft
              onClick={() => {
                setMessages([]);
                dispatch({ type: "RESET", payload: {} });
              }}
            />
            <Text>{fullName}</Text>
            <HStack>
              <AiOutlineVideoCameraAdd />
              <BsThreeDots />
            </HStack>
          </HStack>

          <Box
            overflow={"auto"}
            height={
              selectedFile
                ? "calc(100vh - 64px - 50px - 200px)"
                : "calc(100vh - 64px - 50px)"
            }
            width={"full"}
          >
            {messages === undefined ? (
              <Spinner></Spinner>
            ) : (
              messages.map((message: Message) => {
                if (currentUser.uid !== message.senderId) {
                  if (message.fileLink)
                    return (
                      <ImageMessageCardTwo key={message.id} message={message} />
                    );
                  return <MessageCard key={message.id} message={message} />;
                } else {
                  if (message.fileLink)
                    return (
                      <ImageMessageCard key={message.id} message={message} />
                    );
                  return <MessageCardTwo key={message.id} message={message} />;
                }
              })
            )}
          </Box>

          <Box w={"full"} h={"full"} display={"flex"} flexDirection={"column"}>
            {selectedFile && (
              <Box
                w={"full"}
                maxH={"250px"}
                bg={"rgba(255,255,255,0.11)"}
                display={"flex"}
                flexDirection={"row"}
              >
                <Box>
                  <AiOutlineCloseCircle
                    color="white"
                    fontSize="30px"
                    cursor="pointer"
                    onClick={() => {
                      setFile(undefined);
                      setSelectedFile(undefined);
                    }}
                  />
                </Box>
                <Image
                  w={"full"}
                  objectFit={"scale-down"}
                  height={"200px"}
                  src={selectedFile}
                />
              </Box>
            )}
            <Box>
              <ChatInput
                onMessageChange={(text) => setMessage(text)}
                onFileChange={(file) => setFile(file)}
                onFileSelect={(e: any) =>
                  setSelectedFile(
                    URL.createObjectURL(e.currentTarget.files![0])
                  )
                }
                onSend={handleSend}
              />
            </Box>
          </Box>
        </>
      )}
    </VStack>
  );
};

export default ChatPanel;
