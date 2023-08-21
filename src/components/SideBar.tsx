import { Box, Input, VStack } from "@chakra-ui/react";
import UserCard from "./UserCard";

const SideBar = () => {
  return (
    <Box height={"calc(100vh - 50px )"}>
      <VStack w="full" alignItems={"start"}>
        <Box w={"96"}>
          <Input
            border={"none"}
            borderRadius={0}
            borderBottom={"1px solid white"}
            type="text"
            placeholder="Search here..."
          />
        </Box>
        <VStack>
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
