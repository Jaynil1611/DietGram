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
import { getProfileImage, primaryButtonStyleProps } from "../../utils";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserStatus, selectCurrentUser, Loader } from "../index";
import { addPost } from "./postsSlice";
import { showToast } from "../toasts/Toast";

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
    fullname,
  } = useSelector(selectCurrentUser);

  const postSubmit = (e) => {
    e.preventDefault();
    const content = initialRef.current.value;
    if (content) {
      dispatch(
        addPost({
          post: { content, userId, username },
        })
      );
      return onClose();
    }
    showToast("Post content cannot be empty!", "error");
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
              <Avatar src={getProfileImage(profile_image_url, fullname)} />
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
                    isRequired={true}
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
