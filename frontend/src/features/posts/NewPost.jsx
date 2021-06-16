import React, { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Avatar,
  Box,
  Flex,
  Textarea,
  Divider,
} from "@chakra-ui/react";
import { primaryButtonStyleProps } from "../../utils";
import { MdAddCircle } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserStatus, selectCurrentUser, Loader } from "../index";
import { addPost } from "./postsSlice";

function NewPost() {
  const status = useSelector(getCurrentUserStatus);
  return (
    <>
      {status === "loading" && <Loader />}
      {status === "fulfilled" && <NewPostModal />}
    </>
  );
}

function NewPostModal() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const initialRef = useRef();
  const dispatch = useDispatch();
  const {
    id: userId,
    username,
    profile_image_url,
  } = useSelector(selectCurrentUser);

  const postSubmit = () => {
    dispatch(
      addPost({ post: { content: initialRef.current.value, userId, username } })
    );
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<MdAddCircle size={"1.8rem"} />}
        {...primaryButtonStyleProps}
      >
        Add Post
      </Button>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"2xl"}
      >
        <ModalOverlay />
        <ModalContent borderRadius="1rem" width={"600px"}>
          <ModalCloseButton
            top="0.5rem"
            left="1rem"
            size="lg"
            color={"accent.400"}
          />
          <ModalBody
            pb={1}
            mt="3.5rem"
            borderTop="1px solid"
            borderColor="gray.300"
          >
            <Flex mt={2}>
              <Avatar src={profile_image_url} />
              <Box w={"100%"}>
                <FormControl>
                  <Textarea
                    ref={initialRef}
                    height={"8rem"}
                    resize={"none"}
                    border={"0px"}
                    _focus={{
                      border: "0px",
                    }}
                    placeholder="What's happening?"
                    fontSize={"1.2rem"}
                    _placeholder={{
                      color: "gray.600",
                    }}
                    isRequired
                  ></Textarea>
                </FormControl>
                <Divider orientation="horizontal" bgColor="gray.300" />
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex w={"100%"} justify={"flex-end"}>
              <Button
                onClick={postSubmit}
                maxW={"15%"}
                {...primaryButtonStyleProps}
                p={3}
              >
                Post
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewPost;