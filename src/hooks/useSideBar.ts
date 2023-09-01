import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { startsWithHelper } from "../helper/helper";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../services/firebase";

export interface User {
  fullName: string;
  email: string;
  uid: string;
  photoURL: string;
  lastMessage?: string;
}
const useSideBar = () => {
  const [searchLabel, setSearchLabel] = useState("");
  const [searchResult, setSearchResult] = useState<Array<User>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useContext(AuthContext);

  useEffect(() => {
    const controller = new AbortController();
    const handleSearch = async () => {
      const endCode = startsWithHelper(searchLabel);

      const q = query(
        collection(firestore, "users"),
        where("fullName", ">=", searchLabel),
        where("fullName", "<", endCode)
        // where("uid", "!=", currentUser.uid)
      );
      setIsLoading(true);
      await getDocs(q)
        .then((q) => {
          q.forEach((doc) => {
            setSearchResult([doc.data() as User]);
          });
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
          setIsLoading(false);
        });
    };
    handleSearch();
    return () => controller.abort();
  }, [searchLabel]);

  const handleSearchCardClick = async (user: User) => {
    const combinedId =
      currentUser.uid > user.uid
        ? `${currentUser.uid}_${user.uid}`
        : `${user.uid}_${currentUser.uid}`;
    try {
      const res = await getDoc(doc(firestore, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(firestore, "chats", combinedId), { messages: [] });

        await updateDoc(doc(firestore, "userChats", currentUser.uid), {
          [`${combinedId}.userInfo`]: {
            uid: user.uid,
            fullName: user.fullName,
            photoURL: user.photoURL,
          },
          [`${combinedId}.date`]: serverTimestamp(),
        });

        await updateDoc(doc(firestore, "userChats", user.uid), {
          [`${combinedId}.userInfo`]: {
            uid: currentUser.uid,
            fullName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [`${combinedId}.date`]: serverTimestamp(),
        });
      }
      setSearchLabel("");
    } catch (e) {}
  };
  return {
    handleSearchCardClick,
    setSearchLabel,
    setSearchResult,
    searchResult,
    isLoading,
  };
};
export default useSideBar;
