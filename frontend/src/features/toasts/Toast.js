import { createStandaloneToast } from "@chakra-ui/react";
import { theme } from "../../utils";

const toast = createStandaloneToast({ theme });

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
