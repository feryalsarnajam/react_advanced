import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const AddEventButton = () => {
  return (
    <>
      <Flex display={"flex"} justifyContent={"flex-end"} padding={"2"}>
        <Box>
          <Link to='/addEvent'>
            <Button
              _hover={{
                background: "blue.300",
                color: "white",
              }}
              backgroundColor={"blue.200"}>
              <AddIcon /> &nbsp; Add Event
            </Button>
          </Link>
        </Box>
      </Flex>
    </>
  );
};
