import { Box, Input, VStack } from "@chakra-ui/react";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";
import { useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../services/firebase";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import SearchCard from "./SearchCard";

export interface User {
  fullName: string;
  email: string;
  uid: string;
  photoURL: string;
}

const startsWithHelper = (text: string) => {
  var strlength = text.length;
  var strFrontCode = text.slice(0, strlength - 1);
  var strEndCode = text.slice(strlength - 1, text.length);
  var endcode =
    strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
  return endcode;
};

const SideBar = () => {
  const [searchLabel, setSearchLabel] = useState("");
  const [searchResult, setSearchResult] = useState<Array<User>>([]);
  const currentUser = useContext(AuthContext);

  const handelSearch = async () => {
    const endCode = startsWithHelper(searchLabel);

    const q = query(
      collection(firestore, "users"),
      where("fullName", ">=", searchLabel),
      where("fullName", "<", endCode)
      // where("uid", "!=", currentUser.uid)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSearchResult([doc.data() as User]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box minHeight={"calc(100vh - 50px )"} bg={"gray.600"}>
      <VStack w="full" alignItems={"start"}>
        <SearchBar
          onChange={(label) => {
            setSearchLabel(label);
            handelSearch();
          }}
        />
        <Box w={"full"}>
          {searchResult &&
            searchResult.map((user) => <SearchCard user={user} />)}
          <hr></hr>
        </Box>
        <VStack>
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </VStack>
      </VStack>
    </Box>
  );
};

export default SideBar;
