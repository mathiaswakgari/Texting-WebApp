import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
interface Props {
  onChange: (label: string) => void;
}

const SearchBar = ({ onChange }: Props) => {
  return (
    <Box color={"white"} px={1} w={"full"} borderRadius={"3xl"} marginTop={5}>
      <InputGroup>
        <InputRightElement marginTop={"5px"} marginRight={3}>
          <BsSearch color="white" fontSize="20px" />
        </InputRightElement>
        <Input
          bg={"whiteAlpha.200"}
          border={"none"}
          type="text"
          height={"50px"}
          borderRadius={"3xl"}
          placeholder="Search here..."
          _placeholder={{
            color: "whiteAlpha.700",
          }}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
