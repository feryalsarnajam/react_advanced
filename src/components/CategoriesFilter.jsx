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
          spacing={[1, 5]}
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
