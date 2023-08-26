import { Avatar, Box, HStack, Text } from "@chakra-ui/react";

interface Props {
  message: any;
}

const MessageCard = ({ message }: Props) => {
  return (
    <HStack w={"full"} minH={"70px"} marginY={3}>
      <Box pl={1}>
        <Avatar src="" name="Mathias Wakgari"></Avatar>
      </Box>
      <Box
        bg={"white"}
        minH={"50px"}
        maxW={"96"}
        borderRadius={"0 10px 10px 10px"}
        ml={2}
        w={"full"}
        alignItems={"start"}
      >
        <Text>message.messa message.messagee</Text>
      </Box>
    </HStack>
  );
};

export default MessageCard;
