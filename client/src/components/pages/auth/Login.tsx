import {
  VStack,
  Input,
  FormControl,
  FormLabel,
  Button,
  ButtonGroup,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function Login() {
  return (
    <VStack
      as="form"
      w={{ base: "90%", md: "500px" }}
      mx="auto"
      justify="center"
      spacing="1rem"
      h="100vh"
    >
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input name="username" placeholder="Enter username" size="lg" />
        <FormErrorMessage>Invalid username</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input name="password" placeholder="Enter password" size="lg" />
        <FormErrorMessage>Invalid password</FormErrorMessage>
      </FormControl>
      <ButtonGroup>
        <Button colorScheme="teal" type="submit">
          Log In
        </Button>
        <Button>Create an Account</Button>
      </ButtonGroup>
    </VStack>
  );
}
