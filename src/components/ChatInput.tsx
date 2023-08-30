import {
  Button,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
} from "@chakra-ui/react";

import { BiImage } from "react-icons/bi";
import { BsFillSendFill } from "react-icons/bs";

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
      <InputGroup borderRadius={"3xl"}>
        <Textarea
          marginTop={1}
          placeholder="message..."
          borderRadius={"3xl"}
          maxW={"calc(100% - 150px)"}
          focusBorderColor="lime"
          bg={"white"}
          size={"sm"}
          border={"none"}
          height={"40px"}
          resize={"none"}
          cols={1}
          rows={4}
          onChange={(e) => onMessageChange(e.currentTarget.value)}
        />
        <InputRightElement w={"150px"}>
          <HStack
            h={"full"}
            w={"full"}
            color={"white"}
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
              borderRadius={"lg"}
              mr={2}
              size={"sm"}
              onClick={onSend}
              rightIcon={<BsFillSendFill />}
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
