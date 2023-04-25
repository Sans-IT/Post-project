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
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Router, { useRouter } from "next/router";
import React, { FormEvent, Provider, useEffect, useState } from "react";

export default function Login() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const bgMode = useColorModeValue("gray.100", "gray.700");
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [status, setStatus] = useState<
    undefined | String | React.ReactElement
  >();
  const [Login, setLogin] = useState<boolean>(false);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  // Form Submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (Login) {
      case false:
        signUpEmail();
        break;
      case true:
        logInEmail();
        break;
    }
  };

  const passwordFormValidation = () => {
    setStatus(
      <Text color="red.300" textAlign="center">
        Password minimal 6 huruf/kata
      </Text>
    );
  };

  const loginValidation = (data: {
    user: object | null;
    session: object | null;
  }) => {
    if (data.user !== null) {
      return router.push("/");
    }
  };

  // Login Function
  async function signUpEmail() {
    //email sent
    if (passwordValue.length < 6) {
      return passwordFormValidation();
    }
    const { data, error } = await supabase.auth.signUp({
      email: emailValue,
      password: passwordValue,
    });
    if (data) {
      setStatus(
        <Text color="green.500" textAlign="center">
          Email terkirim cek email anda!{" "}
        </Text>
      );
    }
    if (error)
      setStatus(
        <Text color="red.300" textAlign="center">
          Email gagal terkirim!
        </Text>
      );
  }

  async function logInEmail() {
    // email login
    if (passwordValue.length < 6) {
      return passwordFormValidation();
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailValue,
      password: passwordValue,
    });

    if (error)
      setStatus(
        <Text color="red.300">
          email tidak terdaftar atau password <br />
          salah!, silahkan signin terlebih dahulu
        </Text>
      );

    loginValidation(data);
  }

  const logInGoogle = async () => {
    // google login
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  useEffect(() => {
    setStatus("");
  }, [emailValue, passwordValue]);

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
            Login
          </Text>
          {/* Email Input */}
          <Input
            variant="outline"
            _hover={{ border: "1px" }}
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
              variant="outline"
              _hover={{ border: "1px" }}
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
            {status}
            <Button
              colorScheme="blue"
              type="submit"
              onClick={() => void setLogin(true)}
            >
              Login
            </Button>
            <Text textAlign={"center"}>Tidak mempunyai akun?</Text>
            <Button
              colorScheme="blue"
              type="submit"
              onClick={() => void setLogin(false)}
            >
              Sign In
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
