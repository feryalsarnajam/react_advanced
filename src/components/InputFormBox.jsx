import { Box, Input, Text } from "@chakra-ui/react";
import React from "react";

export const InputFormBox = ({ value, onChange, caption, type, name }) => {
  return (
    <>
      <Box
        backgroundColor={"red.50"}
        margin={"5"}
        padding={"5"}
        borderBottom={"1px"}
        borderColor={"gray.400"}
        borderRadius={"md"}>
        <Text mb='8px' textTransform={"capitalize"}>
          {caption}
        </Text>
        <Input
          isRequired
          type={type}
          backgroundColor={"gray.50"}
          borderRadius={"md"}
          border={"1px"}
          borderColor={"gray.200"}
          value={value}
          name={name}
          id={name}
          onChange={onChange}
          size='sm'
        />
      </Box>
    </>
  );
};
