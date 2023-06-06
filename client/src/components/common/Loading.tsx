import React from "react";
import "./Loading.css";
import { useColorMode } from "@chakra-ui/react";

export default function Loading() {
  const { colorMode } = useColorMode();
  return colorMode == "dark" ? (
    <div className="spinner-container">
      <div className="loading-spinner-dark"></div>
    </div>
  ) : (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}
