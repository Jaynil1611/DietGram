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
import { getFormValues, primaryButtonStyleProps } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUserId,
  Loader,
  getUsersStatus,
  selectUserById,
  updateUser,
} from "../index";

function EditProfile() {
  const status = useSelector(getUsersStatus);
  const currentUserId = useSelector(selectCurrentUserId);
  const currentUser = useSelector((state) =>
    selectUserById(state, currentUserId)
  );
  const { isOpen, onClose, onOpen } = useDisclosure();
  const initialRef = useRef();

  return (
    <>
      {status === "loading" && <Loader />}
      <Button
        bgColor="gray.50"
        p={6}
        onClick={onOpen}
        borderRadius="2rem"
        leftIcon={<EditIcon />}
      >
        Edit Profile
      </Button>
      {status === "fulfilled" && (
        <EditProfileModal
          isOpen={isOpen}
          initialRef={initialRef}
          onClose={onClose}
          {...currentUser}
        />
      )}
    </>
  );
}

const EditProfileModal = ({
  isOpen,
  initialRef,
  onClose,
  fullname,
  bio,
  location,
  url,
  profile_image_url,
  cover_image_url,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updates = getFormValues(e, "profile");
    dispatch(updateUser({ updates }));
    onClose();
  };

  return (
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
              form="profileForm"
              type="submit"
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
            <form
              id="profileForm"
              onSubmit={(e) => handleSubmit(e)}
              style={{ width: "100%" }}
            >
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  defaultValue={fullname}
                  ref={initialRef}
                  isRequired
                  name="name"
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  defaultValue={bio}
                  name="bio"
                  resize="none"
                  height="4rem"
                ></Textarea>
              </FormControl>
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  defaultValue={location}
                  name="location"
                  type="text"
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Website</FormLabel>
                <Input defaultValue={url} name="url" type="url"></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Profile Image URL</FormLabel>
                <Input
                  defaultValue={profile_image_url}
                  name="profile_image_url"
                  type="url"
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Cover Image URL</FormLabel>
                <Input
                  defaultValue={cover_image_url}
                  name="cover_image_url"
                  type="url"
                ></Input>
              </FormControl>
            </form>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;
