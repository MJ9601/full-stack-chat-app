import { Text, CircularProgress, Grid } from "@chakra-ui/react";

export default function Loading({ msg }: { msg?: string }) {
  return (
    <Grid placeItems="center" alignContent="center" h="100vh">
      <CircularProgress
        isIndeterminate
        color="teal"
        size={"100px"}
        trackColor="gray.700"
      />
      {msg && (
        <Text mt={"10"} color={"red.500"}>
          Too Many Request!! Please try again after {msg}s.
        </Text>
      )}
    </Grid>
  );
}
