import { Box, HStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { EventContext } from "./Contexts";

export function CategoryElement({ event }) {
  const { categories } = useContext(EventContext);

  //categoryIds to catogorie.name
  function categoryArray(event) {
    return event.categoryIds.map((id) =>
      categories.find((cat) => cat.id === id)
    );
  }

  const findColor = (id) => {
    if (id === 1) {
      return "green.200";
    } else if (id === 2) {
      return "orange.200";
    } else {
      return "yellow.200";
    }
  };
  return (
    <>
      <HStack spacing={2} margin={"3"} justifyContent={"flex-end"}>
        {categoryArray(event).map((item, index) => (
          <Box
            key={index}
            fontWeight={"semibold"}
            fontSize={"small"}
            bg={findColor(item?.id)}
            padding={"2"}
            borderRadius={"md"}
            textTransform={"capitalize"}>
            {item?.name}
          </Box>
        ))}
      </HStack>
    </>
  );
}
