import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Text,
} from "@chakra-ui/react";
import { z } from "zod";
import { AiOutlineUser, AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  fullname: z
    .string()
    .min(3, { message: "Name must be atleast 3 characters long." })
    .max(30, { message: "Name must be atmost 30 characters long." }),
  email: z.string().email({ message: "Enter a valid email." }),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters long",
  }),
});

type FormData = z.infer<typeof schema>;

const RegisterForm = () => {
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
          <FormLabel htmlFor="fullname">Fullname</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineUser />
            </InputLeftElement>
            <Input
              {...register("fullname")}
              id="fullname"
              type="text"
              placeholder="Enter your name here"
            />
          </InputGroup>
          {errors?.fullname && (
            <Text color={"tomato"}>{errors.fullname.message}</Text>
          )}
        </Box>
        <Box w={"96"}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineMail />
            </InputLeftElement>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Enter your email here"
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
            Register
          </Button>
        </Box>
      </VStack>
    </form>
  );
};

export default RegisterForm;
