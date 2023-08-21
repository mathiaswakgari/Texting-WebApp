import { Avatar, Box, HStack, VStack, Text } from "@chakra-ui/react";

const UserCard = () => {
  return (
    <HStack w={"96"}>
      <Box pl={1}>
        <Avatar src="" name="Mathias Wakgari"></Avatar>
      </Box>
      <VStack ml={2}>
        <Text textAlign={"start"}>Tyler</Text>
        <Text textAlign={"start"}>message.</Text>
      </VStack>
    </HStack>
  );
};

export default UserCard;
