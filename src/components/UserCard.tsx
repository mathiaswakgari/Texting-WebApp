import { Avatar, Box, HStack, VStack, Text } from "@chakra-ui/react";
import { ChatInfo } from "../hooks/useChatList";
import { User } from "../hooks/useSideBar";

interface Props {
  data: ChatInfo;
  onClick: (user: User) => void;
}

const UserCard = ({ data, onClick }: Props) => {
  const { date, userInfo, lastMessage } = data;

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
      onClick={() => onClick(userInfo)}
    >
      <Box pl={1}>
        <Avatar
          size={{
            base: "sm",
            md: "md",
          }}
          src={userInfo.photoURL}
          name={userInfo.fullName}
        ></Avatar>
      </Box>
      <VStack ml={2} w={"full"} alignItems={"start"} spacing={0}>
        <Text fontSize={{ base: "sm", md: "lg" }} color={"gray.100"}>
          {userInfo.fullName}
        </Text>
        <Text fontSize={{ base: "xs", md: "sm" }} color={"gray.300"}>
          {lastMessage?.message && lastMessage.message}
        </Text>
      </VStack>
    </HStack>
  );
};

export default UserCard;
