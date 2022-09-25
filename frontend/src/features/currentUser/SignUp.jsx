import { Image } from "@chakra-ui/image";
import {
  Flex,
  SimpleGrid,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Heading,
  Link,
} from "@chakra-ui/react";
import SignUpImage from "../../assets/SignUp.svg";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  linkHoverProps,
  focusProps,
  loginBoxProps,
  primaryButtonStyleProps,
  getFormValues,
  validateForm,
} from "../../utils";
import { useDispatch } from "react-redux";
import { signUpUser } from "./currentUserSlice";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, ...rest } = getFormValues(
      e,
      "signup"
    );
    if (validateForm({ email, password, confirmPassword })) {
      return dispatch(signUpUser({ email, password, ...rest })).then(() =>
        navigate("/login")
      );
    }
  };

  return (
    <>
      <SimpleGrid
        columns={[1, 2]}
        mt={6}
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      >
        <Flex justify={"center"} align={"center"}>
          <Image
            loading={"lazy"}
            src={SignUpImage}
            alt="SignUp"
            width={"100%"}
            maxH={"70vh"}
          />
        </Flex>
        <Flex
          width="full"
          direction={"column"}
          justify={"center"}
          align={"center"}
        >
          <Box {...loginBoxProps} px={6} py={2}>
            <Box textAlign="center">
              <Heading>Sign Up</Heading>
            </Box>
            <Box textAlign="left">
              <form onSubmit={(e) => handleFormSubmit(e)}>
                <FormControl isRequired>
                  <FormLabel> User Name </FormLabel>
                  <Input {...focusProps} type="text" name="username" />
                </FormControl>
                <FormControl mt={1} isRequired>
                  <FormLabel> First Name </FormLabel>
                  <Input {...focusProps} type="text" name="firstname" />
                </FormControl>
                <FormControl mt={1} isRequired>
                  <FormLabel> Last Name </FormLabel>
                  <Input {...focusProps} type="text" name="lastname" />
                </FormControl>
                <FormControl mt={1} isRequired>
                  <FormLabel> Email </FormLabel>
                  <Input {...focusProps} type="email" name="email" />
                </FormControl>
                <FormControl mt={1} isRequired>
                  <FormLabel> Password </FormLabel>
                  <Input {...focusProps} type="password" name="password" />
                  <FormHelperText fontSize={"0.8rem"}>
                    Password should be of 6 characters (including one letter &
                    number)
                  </FormHelperText>
                </FormControl>
                <FormControl mt={1} isRequired>
                  <FormLabel> Confirm Password </FormLabel>
                  <Input
                    {...focusProps}
                    type="password"
                    name="confirmPassword"
                  />
                </FormControl>
                <Button
                  {...primaryButtonStyleProps}
                  width="full"
                  mt={5}
                  type="submit"
                >
                  Sign Up
                </Button>
              </form>
              <Box textAlign={"center"} my={2}>
                Already have an account?
                <Link as={RouterLink} {...linkHoverProps} to="/login">
                  Sign in
                </Link>
              </Box>
            </Box>
          </Box>
        </Flex>
      </SimpleGrid>
    </>
  );
}

export default SignUp;
