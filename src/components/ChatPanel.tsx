import { Box, VStack, Text, HStack, Spinner, Image } from "@chakra-ui/react";
import {
  AiOutlineVideoCameraAdd,
  AiOutlineArrowLeft,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import ChatInput from "./ChatInput";
import MessageCard from "./MessageCard";
import MessageCardTwo from "./MessageCardTwo";
import ImageMessageCard from "./ImageMessageCard";
import ImageMessageCardTwo from "./ImageMessageCardTwo";
import useChatPanel, { Message } from "../hooks/useChatPanel";

const ChatPanel = () => {
  const {
    dispatch,
    handleSend,
    messages,
    selectedFile,
    fullName,
    setMessages,
    currentUser,
    chatId,
    setFile,
    setSelectedFile,
    setMessage,
  } = useChatPanel();

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
            <Box
              borderRadius={"full"}
              width={"25px"}
              height={"25px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              _hover={{
                bg: "whiteAlpha.300",
              }}
              cursor="pointer"
              transitionDuration={"400ms"}
            >
              <AiOutlineArrowLeft
                onClick={() => {
                  setMessages([]);
                  dispatch({ type: "RESET", payload: {} });
                }}
              />
            </Box>

            <Text>{fullName}</Text>
            <HStack>
              <Box
                borderRadius={"full"}
                width={"25px"}
                height={"25px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                _hover={{
                  bg: "whiteAlpha.300",
                }}
                cursor="pointer"
                transitionDuration={"400ms"}
              >
                <AiOutlineVideoCameraAdd />
              </Box>
              <Box
                borderRadius={"full"}
                width={"25px"}
                height={"25px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                _hover={{
                  bg: "whiteAlpha.300",
                }}
                cursor="pointer"
                transitionDuration={"400ms"}
              >
                <BsThreeDots />
              </Box>
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
