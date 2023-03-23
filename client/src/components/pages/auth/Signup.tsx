import { VStack, Button, ButtonGroup, Heading } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Formik } from "formik";
import * as yup from "yup";
import TextField from "../../common/TextField";
import { useNavigate } from "react-router-dom";
// import config from "config";
import constants from "../../../constants";

export default function Signup() {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ username: "", password: "", confirmedPassword: "" }}
      validationSchema={yup.object({
        username: yup.string().required("username is required!").email(),
        password: yup
          .string()
          .required()
          .min(8, "Password too short!")
          .max(32, "Password too long!"),
        confirmedPassword: yup
          .string()
          .oneOf([yup.ref("password")], "Password don't match!")
          .required(),
      })}
      onSubmit={async (values, actions) => {
        const vals = { ...values };
        alert(JSON.stringify(values, null, 2));
        actions.resetForm();
        try {
          const response = await (
            await fetch(`${constants.apiUrl}/users`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(vals),
            })
          ).json();

          console.log(response);
          return response;
        } catch (err: any) {
          return err.message;
        }
      }}
    >
      <VStack
        as="form"
        w={{ base: "90%", md: "500px" }}
        mx="auto"
        justify="center"
        spacing="1rem"
        h="100vh"
      >
        <Heading>Sign Up</Heading>
        <TextField
          // @ts-ignore
          name="username"
          type="email"
          label="username"
          placeholder="Enter username"
          autoComplete="off"
        />
        <TextField
          // @ts-ignore
          name="password"
          type="password"
          label="password"
          placeholder="Enter password"
          autoComplete="off"
        />
        <TextField
          // @ts-ignore
          name="confirmedPassword"
          type="password"
          label="Confirmed Password"
          placeholder="Enter password"
          autoComplete="off"
        />
        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="submit">
            Sign Up
          </Button>
          <Button
            onClick={() => navigate("/login")}
            leftIcon={<ArrowBackIcon />}
          >
            back
          </Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
}
