import { Avatar, Box, HStack, VStack, Text } from "@chakra-ui/react";

const UserCard = () => {
  return (
    <HStack w={"96"} h={"70px"}>
      <Box pl={1}>
        <Avatar src="" name="Mathias Wakgari"></Avatar>
      </Box>
      <VStack ml={2} w={"full"} alignItems={"start"}>
        <Text>Tyler</Text>
        <Text>message.</Text>
      </VStack>
    </HStack>
  );
};

export default UserCard;
