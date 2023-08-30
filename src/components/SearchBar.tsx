import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
interface Props {
  onChange: (label: string) => void;
}

const SearchBar = ({ onChange }: Props) => {
  return (
    <Box
      px={1}
      w={"96"}
      bg={"whiteAlpha.200"}
      borderRadius={"3xl"}
      marginTop={2}
    >
      <InputGroup>
        <InputRightElement marginTop={"5px"} marginRight={3}>
          <BsSearch color="white" fontSize="20px" />
        </InputRightElement>
        <Input
          border={"none"}
          type="text"
          height={"50px"}
          borderRadius={"3xl"}
          placeholder="Search here..."
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
