import {
  FormControl,
  Input,
  FormErrorMessage,
  FormLabel,
  VStack,
  Box,
  Text,
  Divider,
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
  const [field, meta, helpers] = useField(props as any);
  const [list, setList] = useState([]);
  const [disSuggest, setDisSuggest] = useState(false);

  const setFieldValue = (email: string) => () => {
    helpers.setValue(email);
    setDisSuggest(false);
  };

  useEffect(() => {
    // @ts-ignore
    setList(selectArr.filter((item) => item.includes(field.value)));
    setDisSuggest(true);
  }, [field.value]);

  return (
    // @ts-ignore
    <FormControl isInvalid={!!meta.touched && !!meta.error}>
      <FormLabel>{label}</FormLabel>
      <Input as={Field} {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>

      {disSuggest && list.length < selectArr.length && (
        <VStack gap={2} mt={2} justify="start" maxH="200px" overflowY="auto">
          {list.map((item: string, i) => (
            <Box w="90%" key={item}>
              <Text
                w="full"
                pl="4"
                cursor="pointer"
                _hover={{ color: "teal" }}
                onClick={setFieldValue(item)}
              >
                {item}
              </Text>
              <Divider />
            </Box>
          ))}
        </VStack>
      )}
    </FormControl>
  );
}
