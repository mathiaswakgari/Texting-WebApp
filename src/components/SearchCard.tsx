import { Avatar, Box, HStack, VStack, Text } from "@chakra-ui/react";
import { User } from "./SideBar";

interface Props {
  user: User;
}

const SearchCard = ({ user }: Props) => {
  return (
    <HStack w={"96"} h={"70px"}>
      <Box pl={1}>
        <Avatar src={user.photoURL} name={user.fullName}></Avatar>
      </Box>
      <VStack ml={2} w={"full"} alignItems={"start"}>
        <Text>{user.fullName}</Text>
      </VStack>
    </HStack>
  );
};

export default SearchCard;
