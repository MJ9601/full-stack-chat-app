import {
  VStack,
  Input,
  FormControl,
  FormLabel,
  Button,
  Heading,
  ButtonGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import constants from "../../../constants";

export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("username is required!").email(),
      password: Yup.string()
        .required("password is required!")
        .min(8, "Password too short!")
        .max(32, "Password too long!"),
    }),
    onSubmit: async (values, actions) => {
      const vals = { ...values };
      // alert(JSON.stringify(values, null, 2));
      actions.resetForm();
      try {
        // console.log(config.get("apiUrl"));
        const response = await (
          await fetch(`${constants.apiUrl}/sessions`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(vals),
          })
        ).json();
        return response;
      } catch (err: any) {
        alert(err);
        return err.message;
      }
    },
  });
  return (
    <>
      {/* @ts-ignore */}
      <VStack
        as="form"
        w={{ base: "90%", md: "500px" }}
        mx="auto"
        justify="center"
        spacing="1rem"
        h="100vh"
        onSubmit={formik.handleSubmit as any}
      >
        <Heading>Log in</Heading>
        <FormControl
          isInvalid={!!formik.errors.username && formik.touched.username}
        >
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            placeholder="Enter username"
            size="lg"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={!!formik.errors.password && formik.touched.password}
        >
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Enter password"
            size="lg"
            type="password"
            {...formik.getFieldProps("password")}
          />
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="submit">
            Log In
          </Button>
          <Button onClick={() => navigate("/register")}>
            Create an Account
          </Button>
        </ButtonGroup>
      </VStack>
    </>
  );
}
