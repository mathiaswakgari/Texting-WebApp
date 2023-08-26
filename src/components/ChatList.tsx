import { Spinner, VStack } from "@chakra-ui/react";
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
}

const ChatList = () => {
  const currentUser = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState<any>();

  const handleSelect = (user: User) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  useEffect(() => {
    if (currentUser.uid) {
      onSnapshot(doc(firestore, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
    }
  }, [currentUser.uid]);

  return (
    <VStack>
      {!chats ? (
        <Spinner></Spinner>
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
