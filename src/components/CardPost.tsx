import {
  Avatar,
  Box,
  Flex,
  Heading,
  Text,
  Card,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FaComments, FaShare } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import React from "react";
import Image from "next/image";
import { useUser } from "@supabase/auth-helpers-react";
import { POSTNAMETABLE, POSTIMAGE, supabase } from "@/utils/supabase";

export default function CardPost({ data }: any) {
  const user = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cdnPost: string = `https://dojkpsqarrtcdhxhsery.supabase.co/storage/v1/object/public/imagepost/`;

  const handleDelete = async () => {
    if (user?.id === data.user_id) {
      const { data: deletelog } = await supabase
        .from(POSTNAMETABLE)
        .delete()
        .eq("id", data.id);

      const { data: storage } = await supabase.storage
        .from(POSTIMAGE)
        .remove([`${data.image}`]);
    }
  };

  return (
    <Card
      border={"1px"}
      borderColor={"blackAlpha.200"}
      shadow={"xl"}
      overflow={"hidden"}
    >
      <Flex flexDirection={"column"}>
        {/* Header */}
        <Flex justifyContent={"space-between"} w={"full"} p={5}>
          <Flex alignItems={"center"} gap={3}>
            <Avatar
              name={data.user_name === "" ? data.email : data.user_name}
              src={data.user_avatar}
            />
            <Box>
              <Heading size="md">
                {data.user_name === "" ? data.email : data.user_name}
              </Heading>
            </Box>
          </Flex>

          {/* Three dot icon for option */}
          {user?.email === data.email ? (
            <>
              <Menu>
                <MenuButton>
                  <IconButton
                    as={Button}
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="See menu"
                    icon={<HiDotsVertical />}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Edit</MenuItem>
                  <Divider />
                  <MenuItem color={"red.500"} onClick={onOpen}>
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            ""
          )}
        </Flex>

        {/* Image Section */}
        <Box p={5}>
          <Heading size={"sm"} mb={2}>
            {data.title}
          </Heading>
          <Text>{data.description}</Text>
        </Box>
        {data.image !== "" ? (
          <div className="relative overflow-hidden h-auto w-full">
            <Image
              src={cdnPost + data.image}
              alt={data.image}
              fill
              className="blur-sm brightness-50 filter"
            />
            <Image
              src={cdnPost + data.image}
              alt={data.image}
              loading="lazy"
              width={350}
              height={500}
              className="object-contain m-auto z-10 relative"
            />
          </div>
        ) : (
          ""
        )}

        {/* Footer */}
        <Flex
          justify="space-between"
          flexWrap="wrap"
          p="5"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button flex="1" variant="ghost" leftIcon={<AiFillLike />}>
            Like
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<FaComments />}>
            Comment
          </Button>
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<FaShare />}
            onClick={() => {
              console.log(
                navigator.clipboard.writeText(window.location.href + data.image)
              );
              navigator.clipboard.writeText(window.location.href + data.image);
            }}
          >
            Share
          </Button>
        </Flex>
      </Flex>

      {/* Modal Delete and Edit */}
      {user?.email === data.email ? (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Delete <span className="text-sky-500 font-bold">Postingan</span>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Yakin menghapus Postingan &ldquo;{data.title}&ldquo;?
            </ModalBody>

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
                  onClose();
                  handleDelete();
                }}
              >
                Ya
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        ""
      )}
    </Card>
  );
}
