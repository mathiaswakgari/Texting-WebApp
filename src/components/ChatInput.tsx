import {
  Button,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
  Text,
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
      <InputGroup borderRadius={{ base: "lg", md: "3xl" }}>
        <Textarea
          marginTop={1}
          placeholder="message..."
          borderRadius={{ base: "2xl", md: "3xl" }}
          w={{ base: "40", sm: "calc(100% - 150px)" }}
          focusBorderColor="none"
          bg={"whiteAlpha.800"}
          fontSize={{
            base: "xs",
            md: "md",
          }}
          size={{ base: "xs", md: "sm" }}
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
                fontSize={{ md: "30px", base: "20px" }}
                style={{
                  marginTop: "7px",
                }}
                cursor="pointer"
              />
            </FormLabel>
            <Button
              colorScheme={"green"}
              borderRadius="lg"
              mr={{ md: 2, base: 1 }}
              size={{ base: "xs", md: "sm" }}
              onClick={onSend}
              rightIcon={<BsFillSendFill />}
            >
              <Text
                fontSize={{
                  base: "xs",
                  md: "sm",
                }}
                display={{
                  base: "none",
                  sm: "block",
                }}
              >
                Send
              </Text>
            </Button>
          </HStack>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default ChatInput;
