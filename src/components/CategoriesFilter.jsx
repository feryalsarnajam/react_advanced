import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import React from "react";

export const CategoriesFilter = ({
  categories,
  handleSelect,
  selectedCategories,
}) => {
  return (
    <>
      <CheckboxGroup colorScheme='gray' borderRadius={"md"}>
        <Stack
          direction={["column", "row"]}
          borderRadius={"md"}
          backgroundColor={"gray.50"}
          padding={"2"}
          border={"1px"}
          borderColor={"gray.200"}
          size='sm'>
          {categories.map((categorie) => (
            <Checkbox
              type='checkbox'
              // _checked={{
              //   background: "blue.300",
              // }}
              isChecked={selectedCategories.includes(categorie.id)}
              id={categorie.id}
              key={categorie.id}
              name='categorie'
              onChange={handleSelect}
              textTransform={"capitalize"}>
              {categorie.name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </>
  );
};
