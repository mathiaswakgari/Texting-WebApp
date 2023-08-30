import { Spinner, VStack, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import UserCard from "./UserCard";
import { AuthContext } from "../context/AuthContext";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../services/firebase";
import { User } from "./SideBar";
import { ChatContext } from "../context/ChatContext";

export interface ChatInfo {
  date: Timestamp;
  userInfo: User;
  lastMessage?: {
    message: string;
  };
}

const ChatList = () => {
  const currentUser = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState<any>();

  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (user: User) => {
    dispatch({ type: "CHANGE_USER", payload: user });
    setSelectedChat(user);
  };

  useEffect(() => {
    setIsLoading(true);
    if (currentUser.uid) {
      onSnapshot(doc(firestore, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        setIsLoading(false);
      });
    }
    setIsLoading(false);
  }, [currentUser.uid]);

  return (
    <VStack justifyContent={"center"} width={"full"}>
      {!chats ? (
        <Spinner size={"lg"}></Spinner>
      ) : (
        Object.entries(chats)
          .sort((a, b) => a[1]["date"] - b[1]["date"])
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
