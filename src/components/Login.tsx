import {
  Avatar,
  Button,
  Flex,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { FormEvent, useState } from "react";

export default function Login() {
  const supabase = useSupabaseClient();
  const bgMode = useColorModeValue("gray.100", "gray.700");
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpEmail();
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  // Signin Provider
  const logInGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  async function signUpEmail() {
    const { data, error } = await supabase.auth.signUp({
      email: emailValue,
      password: passwordValue,
    });
  }

  async function signInEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailValue,
      password: passwordValue,
    });
  }

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      height={"100vh"}
      position={"absolute"}
      top={0}
      left={0}
      zIndex={-10}
    >
      <Flex bg={bgMode} p={12} rounded={8}>
        <form onSubmit={handleSubmit}>
          <Text
            textAlign={"center"}
            fontSize={"4xl"}
            mb={3}
            className="font-bold"
          >
            Sign in
          </Text>
          {/* Email Input */}
          <Input
            variant="filled"
            placeholder="youremail@example.com"
            type="email"
            isRequired
            mb={3}
            id="email"
            onChange={(event) => setEmailValue(event.target.value)}
          />
          <InputGroup>
            {/* Password Input */}
            <Input
              variant="filled"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              isRequired
              mb={5}
              id="password"
              onChange={(event) => setPasswordValue(event.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>

          {/* SigIn Wrapper */}
          <Flex justifyContent={"center"} flexDirection={"column"} gap={3}>
            <Button colorScheme="blue" type="submit">
              Sign In
            </Button>
            <Button colorScheme="blue" type="submit">
              Login
            </Button>
            <Button
              color={"white"}
              bg={"#222"}
              _hover={{ background: "#111" }}
              type="button"
              onClick={() => void logInGoogle()}
            >
              <Avatar src="/google.png" name="google" size={"xs"} me={2} />
              Login With Google
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
}
