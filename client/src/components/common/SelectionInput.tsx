import {
  FormControl,
  Input,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useField, Field } from "formik";
import { useState, useRef, useEffect } from "react";

export default function SelectionInput({
  selectArr,
  label,
  ...props
}: {
  selectArr: any[];
  label: string;
}) {
  const [field, meta] = useField(props as any);
  const [list, setList] = useState(selectArr);
  console.log(selectArr);

  useEffect(() => {
    setList((list) => list.filter((item) => item.includes(field.value)));
    console.log(list);
  }, [field.value]);

  return (
    // @ts-ignore
    <FormControl isInvalid={!!meta.touched && !!meta.error}>
      <FormLabel>{label}</FormLabel>
      <Input as={Field} {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
