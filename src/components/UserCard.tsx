import { Avatar, Box, HStack, VStack, Text } from "@chakra-ui/react";
import { ChatInfo } from "./ChatList";
import { User } from "./SideBar";

interface Props {
  data: ChatInfo;
  onClick: (user: User) => void;
}

const UserCard = ({ data, onClick }: Props) => {
  const { date, userInfo } = data;
  return (
    <HStack w={"96"} h={"70px"} onClick={() => onClick(userInfo)}>
      <Box pl={1}>
        <Avatar src={userInfo.photoURL} name={userInfo.fullName}></Avatar>
      </Box>
      <VStack ml={2} w={"full"} alignItems={"start"}>
        <Text>{userInfo.fullName}</Text>
        <Text>{userInfo.lastMessage && userInfo.lastMessage}</Text>
      </VStack>
    </HStack>
  );
};

export default UserCard;
