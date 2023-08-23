import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Text,
} from "@chakra-ui/react";
import { z } from "zod";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "./Login";

const schema = z.object({
  email: z.string().email({ message: "Invalid Email type." }),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters long",
  }),
});

interface Props {
  onChange: (data: User) => void;
  onSubmit: (data: User) => void;
}

type FormData = z.infer<typeof schema>;

const LoginForm = ({ onSubmit, onChange }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={handleSubmit(onChange)}>
      <VStack>
        <Box w={"96"}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineUser />
            </InputLeftElement>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </InputGroup>
          {errors?.email && (
            <Text color={"tomato"}>{errors.email.message}</Text>
          )}
        </Box>
        <Box w={"96"}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineLock />
            </InputLeftElement>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="Enter your password here"
            />
          </InputGroup>
          {errors?.password && (
            <Text color={"tomato"}>{errors.password.message}</Text>
          )}
        </Box>
        <Box mt={5}>
          <Button type="submit" colorScheme="green" w={"96"}>
            Login
          </Button>
        </Box>
      </VStack>
    </form>
  );
};

export default LoginForm;
