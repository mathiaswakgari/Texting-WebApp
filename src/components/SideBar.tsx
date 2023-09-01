import { Box, Spinner, VStack } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import SearchCard from "./SearchCard";
import ChatList from "./ChatList";
import useSideBar from "../hooks/useSideBar";

const SideBar = () => {
  const {
    setSearchLabel,
    setSearchResult,
    searchResult,
    isLoading,
    handleSearchCardClick,
  } = useSideBar();

  return (
    <Box height={"calc(100vh - 50px )"}>
      <VStack w="full" alignItems={"center"}>
        <SearchBar
          onChange={(label) => {
            setSearchLabel(label);
            setSearchResult([]);
          }}
        />
        {isLoading && <Spinner speed="0.8s" color="white" />}
        {searchResult && (
          <Box w={"full"}>
            {searchResult.map((user) => (
              <SearchCard
                key={user.uid}
                user={user}
                onClick={(user) => handleSearchCardClick(user)}
              />
            ))}
            {searchResult.length !== 0 && <hr></hr>}
          </Box>
        )}
        <ChatList />
      </VStack>
    </Box>
  );
};

export default SideBar;
