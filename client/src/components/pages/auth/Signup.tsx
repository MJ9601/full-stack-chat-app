import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

export default function Signup() {
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

      <FormControl>
        <FormLabel>Comfirmed Password</FormLabel>
        <Input
          name="comfirmedPassword"
          placeholder="Enter password"
          size="lg"
        />
        <FormErrorMessage>Invalid password</FormErrorMessage>
      </FormControl>

      <ButtonGroup>
        <Button colorScheme="teal" type="submit">
          Sign Up
        </Button>
        <Button>Log In</Button>
      </ButtonGroup>
    </VStack>
  );
}
