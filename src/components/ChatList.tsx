import { Spinner, VStack } from "@chakra-ui/react";
import UserCard from "./UserCard";
import { User } from "./SideBar";
import useChatList, { ChatInfo } from "../hooks/useChatList";

const ChatList = () => {
  const { dispatch, chats } = useChatList();

  const handleSelect = (user: User) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <VStack
      width={"full"}
      height={"calc(100vh - 50px - 90px)"}
      overflowY={"scroll"}
    >
      {!chats ? (
        <Spinner size={"lg"}></Spinner>
      ) : (
        Object.entries(chats)
          .sort((a, b) => b[1]["date"] - a[1]["date"])
          .map((chat) => (
            <UserCard
              onClick={handleSelect}
              data={chat[1] as ChatInfo}
              key={chat[0]}
            ></UserCard>
          ))
      )}
    </VStack>
  );
};

export default ChatList;
