import {
  Avatar,
  Box,
  Flex,
  Heading,
  Text,
  Card,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { FaComments, FaShare } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import React from "react";
import Image from "next/image";
import { useUser } from "@supabase/auth-helpers-react";

export default function CardPost({ data }: any) {
  const user = useUser();
  const cdnPost: string = `https://dojkpsqarrtcdhxhsery.supabase.co/storage/v1/object/public/imagepost/${data.user_id}/`;

  return (
    <Card
      border={"1px"}
      borderColor={"blackAlpha.200"}
      shadow={"2xl"}
      overflow={"hidden"}
    >
      <Flex flexDirection={"column"}>
        <Flex justifyContent={"space-between"} w={"full"} p={5}>
          <Flex alignItems={"center"} gap={3}>
            <Avatar name={data.user_avatar} src={data.user_avatar} />
            <Box>
              <Heading size="md">{data.user_name}</Heading>
            </Box>
          </Flex>
          {user?.id === data.user_id ? (
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<HiDotsVertical />}
            />
          ) : (
            ""
          )}
        </Flex>
        <Box p={5}>
          <Heading size={"sm"}>{data.title}</Heading>
          <Text>{data.description}</Text>
        </Box>
        <Box className="relative h-96">
          <Image
            src={cdnPost + data.image}
            alt={data.image}
            loading="lazy"
            fill
            className="object-cover"
          />
        </Box>
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
          <Button flex="1" variant="ghost" leftIcon={<FaShare />}>
            Share
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
