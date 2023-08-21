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

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long." })
    .max(15, { message: "Username must be atmost 15 characters long." }),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters long",
  }),
});

type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FieldValues) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <Box w={"96"}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineUser />
            </InputLeftElement>
            <Input
              {...register("username")}
              id="username"
              type="text"
              placeholder="Enter your username"
            />
          </InputGroup>
          {errors?.username && (
            <Text color={"tomato"}>{errors.username.message}</Text>
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
