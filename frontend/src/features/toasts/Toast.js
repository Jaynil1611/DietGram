import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast();

export const showToast = (description, status) => {
  toast({
    description,
    status,
    duration: 3000,
    isClosable: true,
    position: "top-right",
    variant: "left-accent",
  });
};
