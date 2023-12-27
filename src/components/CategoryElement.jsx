import { Box, HStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { EventContext } from "./Contexts";

export function CategoryElement({ event }) {
  const { categories } = useContext(EventContext);

  //categoryIds to catogorie.name
  function categoryArray(event) {
    let result = event.categoryIds.map((id) =>
      categories.find((cat) => cat.id === id)
    );
    return result;
  }

  const findColor = (id) => {
    if (id === 1) {
      return "red.200";
    } else if (id === 2) {
      return "blue.200";
    } else {
      return "yellow.200";
    }
  };
  return (
    <>
      <HStack width={"100%"} spacing={2} margin={"3"}>
        {categoryArray(event).map((item) => (
          <Box
            key={item.id}
            fontWeight={"semibold"}
            fontSize={"small"}
            bg={findColor(item.id)}
            padding={"2"}
            borderRadius={"md"}
            textTransform={"capitalize"}>
            {item.name}
          </Box>
        ))}
      </HStack>
    </>
  );
}