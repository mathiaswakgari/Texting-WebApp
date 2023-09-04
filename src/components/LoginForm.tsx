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
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "../hooks/useLogin";
import { useState } from "react";

const schema = z.object({
  email: z.string().email({ message: "Invalid Email type." }),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters long",
  }),
});

interface Props {
  onSubmit: (data: User) => void;
  isLogging: boolean;
}

type FormData = z.infer<typeof schema>;

const LoginForm = ({ onSubmit, isLogging }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [loginCredential, setLoginCredential] = useState<User>({} as User);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <Box w={{ md: "96" }}>
          <FormLabel
            htmlFor="email"
            fontSize={{
              base: "sm",
              md: "md",
            }}
          >
            Email
          </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineUser />
            </InputLeftElement>
            <Input
              {...register("email")}
              id="email"
              type="text"
              placeholder="Enter your email"
              onChange={(e) =>
                setLoginCredential({
                  ...loginCredential,
                  email: e.currentTarget.value,
                })
              }
              fontSize={{
                base: "xs",
                md: "md",
              }}
              _placeholder={{
                color: "whiteAlpha.600",
              }}
            />
          </InputGroup>
          {errors?.email && (
            <VStack>
              <Text
                w={{
                  base: "60",
                  md: "96",
                }}
                fontSize={{
                  base: "sm",
                  md: "md",
                }}
                color={"tomato"}
              >
                {errors.email.message}
              </Text>
            </VStack>
          )}
        </Box>
        <Box w={{ md: "96" }}>
          <FormLabel
            htmlFor="password"
            fontSize={{
              base: "sm",
              md: "md",
            }}
          >
            Password
          </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineLock />
            </InputLeftElement>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="Enter your password here"
              onChange={(e) =>
                setLoginCredential({
                  ...loginCredential,
                  password: e.currentTarget.value,
                })
              }
              fontSize={{
                base: "xs",
                md: "md",
              }}
              _placeholder={{
                color: "whiteAlpha.600",
              }}
            />
          </InputGroup>
          {errors?.password && (
            <VStack>
              <Text
                w={{
                  base: "60",
                  md: "96",
                }}
                fontSize={{
                  base: "sm",
                  md: "md",
                }}
                color={"tomato"}
              >
                {errors.password.message}
              </Text>
            </VStack>
          )}
        </Box>
        <Box mt={5}>
          <Button
            isLoading={isLogging}
            type="submit"
            colorScheme="green"
            w={{ md: "96" }}
            fontSize={{
              base: "sm",
              md: "md",
            }}
          >
            Login
          </Button>
        </Box>
      </VStack>
    </form>
  );
};

export default LoginForm;
