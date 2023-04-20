import { ChevronDownIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
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
import React from "react";

export default function Navbar() {
  const user = useUser();
  const supabase = useSupabaseClient();

  const { colorMode, toggleColorMode } = useColorMode();
  const bgMode = useColorModeValue("gray.100", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logInGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
  };
  return (
    <Box position={"fixed"} width={"100%"} bg={bgMode}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        px={3}
        py={2}
      >
        <Link className="text-sky-500 font-bold text-3xl" href="/">
          SANS<span className="font-normal">Media</span>
        </Link>

        <Flex alignItems={"center"}>
          <Button onClick={toggleColorMode} mr={2} colorScheme="gray">
            {colorMode == "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>

          {user ? (
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
                <MenuItem isDisabled>{user?.email}</MenuItem>
                <Divider />
                <MenuItem onClick={onOpen} color={"red.500"}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button onClick={() => void logInGoogle()}>Login</Button>
          )}
        </Flex>
      </Flex>

      {/* Modal Popup when user Logout */}
      <Modal isOpen={isOpen} onClose={onClose}>
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
