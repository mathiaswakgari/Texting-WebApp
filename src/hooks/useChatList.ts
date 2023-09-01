import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { User } from "./useRegister";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { firestore } from "../services/firebase";

export interface ChatInfo {
  date: Timestamp;
  userInfo: User;
  lastMessage?: {
    message: string;
  };
}

const useChatList = () => {
  const currentUser = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState<any>();
  useEffect(() => {
    if (currentUser.uid) {
      onSnapshot(doc(firestore, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
    }
  }, [currentUser.uid]);

  return {
    dispatch,
    chats,
  };
};
export default useChatList;
