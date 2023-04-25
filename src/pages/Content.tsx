import {
  Button,
  Container,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import CardPost from "../components/CardPost";
import { FiRefreshCcw } from "react-icons/fi";
import { AddIcon } from "@chakra-ui/icons";
import { POSTNAMETABLE, POSTIMAGE, supabase } from "@/utils/supabase";
import { useUser } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from "uuid";

export default function Content() {
  const ref = useRef<HTMLButtonElement>(null);
  const user = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [toggleRefresh, setToggleRefresh] = useState<boolean>(false);
  const [posts, setPosts] = useState<any>([]);

  const [title, setTitle] = useState<string | null>();
  const [desc, setDesc] = useState<string | null>();
  const [file, setFile] = useState<File | null>();

  const handlePost = async () => {
    const RandomName: string = `${uuidv4()}`;

    if (ref.current) {
      ref.current.setAttribute("disabled", "disabled");
    }

    const { data: postmedia } = await supabase.from(POSTNAMETABLE).insert({
      user_id: user?.id,
      email: user?.email,
      user_name: user?.user_metadata.full_name,
      user_avatar: user?.user_metadata.avatar_url,
      title: title,
      description: desc,
      image: `${user?.id}/${RandomName}`,
    });

    const { data } = await supabase.storage
      .from(POSTIMAGE)
      .upload(`${user?.id}/${RandomName}`, file as File);

    onClose();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from(POSTNAMETABLE)
        .select()
        .order("id", { ascending: false });
      setPosts(data);
    };

    fetchPosts();
  }, [toggleRefresh]);

  return (
    <Container width={"full"} flexDirection={"column"}>
      <Flex alignItems={"center"} mb={5} gap={3}>
        <Button leftIcon={<AddIcon />} colorScheme="linkedin" onClick={onOpen}>
          Buat Postingan
        </Button>
        <Button onClick={() => void setToggleRefresh(!toggleRefresh)}>
          <FiRefreshCcw />
        </Button>
      </Flex>
      <Divider mb={5} />
      <Flex flexDirection={"column"} gap={8} mb="10">
        {posts
          ? posts.map((post: any) => {
              return <CardPost data={post} key={post.id} />;
            })
          : ""}
      </Flex>

      {/* Post Modal */}
      <Modal isOpen={isOpen} onClose={onClose} returnFocusOnClose={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buat Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection={"column"} gap={5}>
              <input
                type="file"
                accept="image/*"
                name="filepost"
                onChange={handleFileChange}
              />
              <Input
                placeholder="Judul"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
              <Textarea
                placeholder="Deskripsi"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDesc(e.target.value)
                }
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                handlePost();
              }}
              ref={ref}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
