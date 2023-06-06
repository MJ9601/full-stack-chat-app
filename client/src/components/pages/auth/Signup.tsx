import { VStack, Button, ButtonGroup, Heading, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";
import * as yup from "yup";
import TextField from "../../common/TextField";
import { useNavigate } from "react-router-dom";
// import config from "config";
import constants from "../../../constants";
import axios from "axios";
import { useState } from "react";
import theme from "../../../theme";

export default function Signup() {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
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
        actions.resetForm();
        try {
          const response = await axios.post(
            `${constants.apiUrl}/users`,
            JSON.stringify(vals),
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          // await (
          //   await fetch(`${constants.apiUrl}/users`, {
          //     method: "POST",
          //     credentials: "include",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify(vals),
          //   })
          // ).json();

          navigate("/login");
          if (response.status >= 400) setErr(response.data);
          return response;
        } catch (err: any) {
          console.log(err.response.data);
          setErr(err.response.data);
          return err.message;
        }
      }}
    >
      {({ isSubmitting }) => (
        // @ts-ignore
        <VStack
          as={Form}
          w={{ base: "90%", md: "500px" }}
          mx="auto"
          justify="center"
          spacing="1rem"
          h="100vh"
        >
          <Heading>Sign Up</Heading>
          {err && (
            <Text pt={3} color={"red.400"}>
              {err}
            </Text>
          )}
          <TextField
            // @ts-ignore
            name="username"
            type="email"
            label="Username"
            placeholder="Enter username"
            autoComplete="off"
          />
          <TextField
            // @ts-ignore
            name="password"
            type="password"
            label="Password"
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
      )}
    </Formik>
  );
}
