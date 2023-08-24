import { Avatar, Box, HStack, VStack, Text } from "@chakra-ui/react";
import { ChatInfo } from "./ChatList";

interface Props {
  data: ChatInfo;
}

const UserCard = ({ data }: Props) => {
  console.log(data);
  const {
    date,
    userInfo: { fullName, photoURL, lastMessage },
  } = data;
  return (
    <HStack w={"96"} h={"70px"}>
      <Box pl={1}>
        <Avatar src={photoURL} name={fullName}></Avatar>
      </Box>
      <VStack ml={2} w={"full"} alignItems={"start"}>
        <Text>{fullName}</Text>
        <Text>{lastMessage && lastMessage}</Text>
      </VStack>
    </HStack>
  );
};

export default UserCard;
