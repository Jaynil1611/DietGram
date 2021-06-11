import React, { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Flex,
  Textarea,
  Input,
  FormLabel,
  VStack,
  Text,
  ModalHeader,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { intialState } from "../../database/fakeData";
import { primaryButtonStyleProps } from "../../utils";

function EditProfile() {
  const {
    id,
    userId: { firstname, lastname, username, profile_image_url },
    content,
    createdAt,
    likes: { count, reactors },
  } = intialState.posts[0];
  const { isOpen, onClose, onOpen } = useDisclosure();
  const initialRef = useRef();

  return (
    <>
      <Button
        bgColor="gray.50"
        p={6}
        onClick={onOpen}
        borderRadius="2rem"
        leftIcon={<EditIcon />}
      >
        Edit Profile
      </Button>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
        p={{ base: "1rem" }}
      >
        <ModalOverlay />
        <ModalContent
          borderRadius="1rem"
          width={"600px"}
          mb={3}
          height="80vh"
          overflow="auto"
        >
          <ModalHeader ml="3rem" position="sticky" zIndex={10}>
            <Flex justify="space-between">
              <Text>Edit Profile</Text>
              <Button
                onClick={onClose}
                {...primaryButtonStyleProps}
                maxW="80px"
              >
                Save
              </Button>
            </Flex>
          </ModalHeader>
          <ModalCloseButton
            top="0.7rem"
            left="1rem"
            size="lg"
            color={"accent.400"}
          />
          <ModalBody pb={1} borderTop="1px solid" borderColor="gray.300">
            <VStack mt={2} w="100%" spacing={3} mb="2rem">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type="text" ref={initialRef}></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Bio</FormLabel>
                <Textarea resize="none" height="4rem"></Textarea>
              </FormControl>
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input type="text"></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Website</FormLabel>
                <Input type="url"></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Profile Image URL</FormLabel>
                <Input type="url"></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Cover Image URL</FormLabel>
                <Input type="url"></Input>
              </FormControl>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProfile;
