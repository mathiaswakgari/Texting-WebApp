import {
  Button,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { BiImage } from "react-icons/bi";

const ChatInput = () => {
  return (
    <InputGroup size={"lg"} bg={"white"}>
      <Input
        type="text"
        placeholder="message..."
        borderRadius={0}
        w={"calc(100% - 150px)"}
        border={"none"}
      />
      <InputRightElement w={"150px"}>
        <HStack
          h={"full"}
          w={"full"}
          justifyContent={"end"}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Input type="file" id="file" display={"none"}></Input>
          <FormLabel htmlFor="file">
            <BiImage
              fontSize={"30px"}
              style={{
                marginTop: "7px",
              }}
            />
          </FormLabel>
          <Button colorScheme={"green"} borderRadius={0} mr={2} size={"sm"}>
            Send
          </Button>
        </HStack>
      </InputRightElement>
    </InputGroup>
  );
};

export default ChatInput;
