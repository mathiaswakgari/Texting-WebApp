import { Avatar, Box, HStack, VStack, Text } from "@chakra-ui/react";
import { User } from "./Register";

interface Props {
  user: User;
}

const SearchCard = ({ user }: Props) => {
  return (
    <HStack w={"96"} h={"70px"}>
      <Box pl={1}>
        <Avatar src="" name="Mathias Wakgari"></Avatar>
      </Box>
      <VStack ml={2} w={"full"} alignItems={"start"}>
        <Text>Tyler</Text>
      </VStack>
    </HStack>
  );
};

export default SearchCard;
