import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Navbar() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [logOutChange, setOutLogChange] = useState<boolean | null>(false);

  const { colorMode, toggleColorMode } = useColorMode();
  const bgMode = useColorModeValue("gray.100", "gray.700");
  const buttonMode = useColorModeValue("blackAlpha.100", "blackAlpha.500");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logInGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!logOutChange) {
      router.push("/login");
    } else {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
    }
  };

  return (
    <Box
      position={"fixed"}
      width={"100%"}
      bg={bgMode}
      zIndex={1000}
      shadow={"lg"}
      borderBottom={"1px"}
      borderColor={"whiteAlpha.300"}
    >
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        px={3}
        py={2}
      >
        <Link className="text-sky-500 font-bold text-3xl" href="/">
          SANS<span className="font-normal">Media</span>
        </Link>

        <Flex alignItems={"center"} gap={3}>
          <Button onClick={toggleColorMode} bg={buttonMode}>
            {colorMode == "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>

          {user ? (
            <>
              <Menu closeOnSelect={false}>
                <MenuButton>
                  <Avatar
                    src={user?.user_metadata?.picture}
                    size={"md"}
                    name={user?.email}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Profilku</MenuItem>
                  <MenuItem
                    onClick={() => {
                      onOpen();
                      setOutLogChange(true);
                    }}
                    color={"coral"}
                  >
                    Ganti Akun
                  </MenuItem>
                  <MenuItem isDisabled>{user?.email}</MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      onOpen();
                      setOutLogChange(false);
                    }}
                    color={"red.500"}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Button onClick={() => void logInGoogle()} bg={buttonMode}>
              Login
            </Button>
          )}
        </Flex>
      </Flex>

      {/* Modal Popup when user Logout */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Logout <span className="text-sky-500 font-bold">SANSMedia</span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>Yakin ingin Logout?</ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => {
                onClose();
              }}
              mr={3}
            >
              Tidak
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                logOut();
                onClose();
              }}
            >
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
