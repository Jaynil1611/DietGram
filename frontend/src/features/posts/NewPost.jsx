import React, { useRef, useState } from "react";
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
import { intialState } from "../../database/fakeData";
import { primaryButtonStyleProps } from "../../utils";
import { MdAddCircle } from "react-icons/all";

function NewPost() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const initialRef = useRef();
  const {
    userId: { profile_image_url },
  } = intialState.posts[0];
  const [form, setForm] = useState({});
  
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
              <Button maxW={"15%"} {...primaryButtonStyleProps} p={3}>
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
