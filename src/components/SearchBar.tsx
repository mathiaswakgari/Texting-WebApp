import { Box, Input } from "@chakra-ui/react";

interface Props {
  onChange: (label: string) => void;
}

const SearchBar = ({ onChange }: Props) => {
  return (
    <Box w={"full"}>
      <Input
        border={"none"}
        borderRadius={0}
        borderBottom={"1px solid white"}
        type="text"
        placeholder="Search here..."
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </Box>
  );
};

export default SearchBar;
