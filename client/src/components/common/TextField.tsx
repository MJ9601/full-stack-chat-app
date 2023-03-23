import {
  FormControl,
  Input,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useField, Field } from "formik";

export default function TextField({ label, ...props }: { label: string }) {
  const [field, meta] = useField(props as any);
  return (
    <FormControl isInvalid={!!meta.touched && !!meta.error}>
      <FormLabel>{label}</FormLabel>
      <Input as={Field} {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
