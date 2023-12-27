import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box
      backgroundColor={"gray.400"}
      paddingLeft={"50"}
      paddingBottom={"5"}
      paddingTop={"5"}
      fontSize={"large"}
      fontWeight={"bold"}
      color={"red.50"}
      _hover={{
        color: "red.400",
      }}>
      <Link to='/'>Home</Link>
    </Box>
  );
};
