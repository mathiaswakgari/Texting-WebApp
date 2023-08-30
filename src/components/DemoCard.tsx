import { Avatar, Box, HStack, VStack, Text } from "@chakra-ui/react";

const DemoCard = () => {
  return (
    <HStack
      w={"full"}
      h={"70px"}
      _hover={{
        bg: "blackAlpha.700",
        transitionDuration: "400ms",
      }}
      paddingLeft={2}
      cursor="pointer"
    >
      <Box pl={1}>
        <Avatar src={"userInfo.photoURL"} name={"userInfo.fullName"}></Avatar>
      </Box>
      <VStack ml={2} w={"full"} alignItems={"start"} spacing={0}>
        <Text fontSize={"lg"} color={"gray.100"}>
          {"userInfo.fullName"}
        </Text>
        <Text fontSize={"sm"} color={"gray.300"}>
          {"lastMessage?.message && lastMessage.message"}
        </Text>
      </VStack>
    </HStack>
  );
};

export default DemoCard;
