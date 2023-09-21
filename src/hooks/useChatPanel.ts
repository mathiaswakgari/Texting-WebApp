import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { firestore, storage } from "../services/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

export interface Message {
  date: Timestamp;
  text: string;
  senderId: string;
  id: string;
  fileLink?: string;
}

const useChatPanel = () => {
  const { dispatch } = useContext(ChatContext);

  const {
    data: {
      chatId,
      userInfo: { fullName, photoURL, uid },
    },
  } = useContext(ChatContext);
  const currentUser = useContext(AuthContext);

  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>();
  const [file, setFile] = useState<File>();

  useEffect(() => {
    const controller = new AbortController();
    if (chatId) {
      onSnapshot(doc(firestore, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages as []);
      });
    }
    return () => controller.abort();
  }, [chatId]);

  const handleSend = async () => {
    if (file) {
      const storageRef = ref(storage, v4());
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {},
        () => {},

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(firestore, "chats", chatId), {
              messages: arrayUnion({
                id: v4(),
                text: message,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                fileLink: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(firestore, "chats", chatId), {
        messages: arrayUnion({
          id: v4(),
          text: message,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(firestore, "userChats", currentUser.uid), {
      [`${chatId}.lastMessage`]: {
        message,
      },
      [`${chatId}.date`]: serverTimestamp(),
    });
    await updateDoc(doc(firestore, "userChats", uid), {
      [`${chatId}.lastMessage`]: {
        message,
      },
      [`${chatId}.date`]: serverTimestamp(),
    });
  };
  return {
    dispatch,
    handleSend,
    message,
    messages,
    selectedFile,
    file,
    fullName,
    photoURL,
    uid,
    setMessages,
    currentUser,
    chatId,
    setFile,
    setSelectedFile,
    setMessage,
  };
};
export default useChatPanel;
