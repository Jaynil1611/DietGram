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
import LoginImage from "../../assets/Login.svg";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  linkHoverProps,
  focusProps,
  loginBoxProps,
  primaryButtonStyleProps,
  getFormValues,
  validateForm,
} from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectToken } from "./currentUserSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = getFormValues(e, "login");
    if (validateForm({ email, password })) {
      dispatch(loginUser({ email, password })).then(() => {
        if (token) navigate("/");
      });
    }
  };

  const fillGuestCredentials = (e) => {
    e.target.form[0].value = "test@gmail.com";
    e.target.form[1].value = "123456g";
  };

  return (
    <>
      <SimpleGrid
        columns={[1, 2]}
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        my={8}
        minHeight={"80vh"}
      >
        <Flex justify={"center"} align={"center"}>
          <Image
            loading={"lazy"}
            src={LoginImage}
            alt="Login"
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
          <Box {...loginBoxProps}>
            <Box textAlign="center">
              <Heading>Login</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={(e) => handleFormSubmit(e)}>
                <FormControl isRequired>
                  <FormLabel> Email </FormLabel>
                  <Input {...focusProps} type="email" name="email" />
                </FormControl>
                <FormControl mt={6} isRequired>
                  <FormLabel> Password </FormLabel>
                  <Input {...focusProps} type="password" name="password" />
                  <FormHelperText>
                    Password should be of 6 characters (including one letter &
                    number)
                  </FormHelperText>
                </FormControl>
                <Flex justify="center">
                  <Button
                    {...primaryButtonStyleProps}
                    maxW="max-content"
                    mt={8}
                    onClick={fillGuestCredentials}
                  >
                    Fill Guest Credentials
                  </Button>
                </Flex>
                <Button
                  {...primaryButtonStyleProps}
                  width="full"
                  mt={8}
                  type="submit"
                >
                  Sign In
                </Button>
              </form>
              <Box mt={8} textAlign={"center"}>
                New to Dietgram?
                <Link as={RouterLink} {...linkHoverProps} to="/signup">
                  Join now
                </Link>
              </Box>
            </Box>
          </Box>
        </Flex>
      </SimpleGrid>
    </>
  );
}

export default Login;
