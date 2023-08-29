import {
  Button,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Image,
} from "@chakra-ui/react";

import { BiImage } from "react-icons/bi";

interface Props {
  onFileChange: (file: File) => void;
  onMessageChange: (message: string) => void;
  onSend: () => void;
  onFileSelect: (file: any) => void;
}

const ChatInput = ({
  onFileChange,
  onMessageChange,
  onSend,
  onFileSelect,
}: Props) => {
  return (
    <>
      <InputGroup size={"lg"} bg={"white"}>
        <Input
          type="text"
          placeholder="message..."
          borderRadius={0}
          w={"calc(100% - 150px)"}
          border={"none"}
          onChange={(e) => onMessageChange(e.currentTarget.value)}
        />
        <InputRightElement w={"150px"}>
          <HStack
            h={"full"}
            w={"full"}
            justifyContent={"end"}
            alignContent={"center"}
            alignItems={"center"}
          >
            <Input
              type="file"
              id="file"
              display={"none"}
              onChange={(e) => {
                onFileChange(e.currentTarget.files![0]);
                onFileSelect(e);
              }}
            ></Input>

            <FormLabel htmlFor="file">
              <BiImage
                fontSize={"30px"}
                style={{
                  marginTop: "7px",
                }}
                cursor="pointer"
              />
            </FormLabel>
            <Button
              colorScheme={"green"}
              borderRadius={0}
              mr={2}
              size={"sm"}
              onClick={onSend}
            >
              Send
            </Button>
          </HStack>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default ChatInput;
