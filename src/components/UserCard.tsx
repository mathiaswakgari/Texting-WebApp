import { Avatar, Box, HStack, VStack, Text } from "@chakra-ui/react";
import { ChatInfo } from "./ChatList";
import { User } from "./SideBar";

interface Props {
  data: ChatInfo;
  onClick: (user: User) => void;
}

const UserCard = ({ data, onClick }: Props) => {
  const { date, userInfo, lastMessage } = data;

  return (
    <HStack w={"96"} h={"70px"} onClick={() => onClick(userInfo)}>
      <Box pl={1}>
        <Avatar src={userInfo.photoURL} name={userInfo.fullName}></Avatar>
      </Box>
      <VStack ml={2} w={"full"} alignItems={"start"} spacing={0}>
        <Text fontSize={"lg"} color={"gray.100"}>
          {userInfo.fullName}
        </Text>
        <Text fontSize={"sm"} color={"gray.300"}>
          {lastMessage?.message && lastMessage.message}
        </Text>
      </VStack>
    </HStack>
  );
};

export default UserCard;
