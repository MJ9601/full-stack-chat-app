import "./Loading.css";
import { Text, useColorMode } from "@chakra-ui/react";

export default function Loading({ msg }: { msg?: string }) {
  const { colorMode } = useColorMode();
  return colorMode == "dark" ? (
    <div className="spinner-container">
      <div className="loading-spinner-dark"></div>
      {msg && (
        <Text mt={"10"} color={"red.500"}>
          Too Many Request!! Please try again after {msg}s.
        </Text>
      )}
    </div>
  ) : (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      {msg && (
        <Text mt={"10"} color={"red.500"}>
          Too Many Request!! Please try again after {msg}s.
        </Text>
      )}
    </div>
  );
}
