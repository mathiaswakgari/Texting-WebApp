import { Avatar, Box, HStack, Text } from "@chakra-ui/react";

const MessageCardTwo = () => {
  return (
    <HStack w={"full"} minH={"70px"} marginY={3} justifyContent={"end"}>
      <Box
        bg={"white"}
        minH={"50px"}
        maxW={"96"}
        borderRadius={"10px 0px 10px 10px"}
        ml={2}
        w={"full"}
      >
        <Text>message.messa message.messagee</Text>
      </Box>
      <Box pl={1}>
        <Avatar src="" name="Mathias Wakgari"></Avatar>
      </Box>
    </HStack>
  );
};

export default MessageCardTwo;
