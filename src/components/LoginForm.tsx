import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import { z } from "zod";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

// const schema = z.object({
//     username:z.string().min(3, {message: "Username must be atleast 3 characters long"}).max(15, {message})
// })

const LoginForm = () => {
  return (
    <form>
      <VStack>
        <Box>
          <FormLabel>Username</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineUser />
            </InputLeftElement>
            <Input type="text" placeholder="Enter your username" />
          </InputGroup>
        </Box>
        <Box>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineLock />
            </InputLeftElement>
            <Input type="password" placeholder="Enter your password here" />
          </InputGroup>
        </Box>
        <Box>
          <Button colorScheme="blue">Login</Button>
        </Box>
      </VStack>
    </form>
  );
};

export default LoginForm;
