import { Avatar, Box, HStack, VStack, Text } from "@chakra-ui/react";
import { User } from "../hooks/useSideBar";

interface Props {
  user: User;
  onClick: (user: User) => void;
}

const SearchCard = ({ user, onClick }: Props) => {
  return (
    <HStack
      cursor="pointer"
      w={"full"}
      paddingLeft={2}
      _hover={{
        bg: "blackAlpha.700",
        transitionDuration: "400ms",
      }}
      color={"white"}
      h={"70px"}
      onClick={() => onClick(user)}
    >
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
