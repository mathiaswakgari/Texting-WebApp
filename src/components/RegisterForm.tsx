import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Text,
  HStack,
} from "@chakra-ui/react";
import { z } from "zod";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineFileImage,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "../hooks/useRegister";
import { useState } from "react";

interface Props {
  onSubmit: (data: User) => void;
  isRegistering: boolean;
}

const schema = z.object({
  fullname: z
    .string()
    .min(3, { message: "Name must be atleast 3 characters long." })
    .max(30, { message: "Name must be atmost 30 characters long." }),
  email: z.string().email({ message: "Enter a valid email." }),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters long.",
  }),
  file: z.any().refine((files) => files, "Profile picture is required."),
});

type FormData = z.infer<typeof schema>;

const RegisterForm = ({ onSubmit, isRegistering }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [registerForm, setRegisterForm] = useState<User>({} as User);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <Box maxW={{ md: "96" }}>
          <FormLabel
            fontSize={{
              base: "sm",
              md: "md",
            }}
            htmlFor="fullname"
          >
            Fullname
          </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineUser />
            </InputLeftElement>
            <Input
              {...register("fullname")}
              id="fullname"
              type="text"
              placeholder="Enter your name here"
              onChange={(e) => {
                setRegisterForm({
                  ...registerForm,
                  fullname: e.currentTarget.value,
                });
              }}
              fontSize={{
                base: "xs",
                md: "md",
              }}
              _placeholder={{
                color: "whiteAlpha.600",
              }}
            />
          </InputGroup>
          {errors?.fullname && (
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
                {errors.fullname.message}
              </Text>
            </VStack>
          )}
        </Box>
        <Box w={{ md: "96" }}>
          <FormLabel
            fontSize={{
              base: "sm",
              md: "md",
            }}
            htmlFor="email"
          >
            Email
          </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineMail />
            </InputLeftElement>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Enter your email here"
              onChange={(e) =>
                setRegisterForm({
                  ...registerForm,
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
            fontSize={{
              base: "sm",
              md: "md",
            }}
            htmlFor="password"
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
                setRegisterForm({
                  ...registerForm,
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
        <Box alignSelf={{ base: "center", md: "start" }} w={{ md: "96" }}>
          <FormLabel
            fontSize={{
              base: "sm",
              md: "md",
            }}
            htmlFor="file"
            cursor={"pointer"}
          >
            <HStack>
              <AiOutlineFileImage fontSize={"30px"} />
              <Text fontWeight={"medium"}>Choose a Profile Picture</Text>
            </HStack>
          </FormLabel>
          <Input
            {...register("file")}
            display={"none"}
            type="file"
            id="file"
            onClick={(e) => {
              setRegisterForm({
                ...registerForm,
                file: e.currentTarget.files,
              });
            }}
          />
          {errors?.file && (
            <Text color={"tomato"}>{errors?.file?.message?.toString()}</Text>
          )}
        </Box>
        <Box mt={5}>
          <Button
            type="submit"
            colorScheme="green"
            w={{ md: "96" }}
            fontSize={{
              base: "sm",
              md: "md",
            }}
            isLoading={isRegistering}
          >
            Register
          </Button>
        </Box>
      </VStack>
    </form>
  );
};

export default RegisterForm;
