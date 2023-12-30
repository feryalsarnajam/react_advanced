import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  Select,
  Textarea,
  Heading,
  Button,
} from "@chakra-ui/react";

import { CategoriesFilter } from "./CategoriesFilter";
import { InputFormBox } from "./InputFormBox";
import { useContext, useEffect, useState } from "react";
import { EventContext } from "./Contexts";

export const Form = ({ event, handelSubmit, action, handleCancel }) => {
  const { users, categories } = useContext(EventContext);
  const [value, setValue] = useState(-1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdBy: Number,
    location: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
  });
  useEffect(() => {
    if (event) {
      setFormData(event);
      setValue(event.createdBy);
    }
  }, []);
  const submit = (e) => {
    e.preventDefault();
    handelSubmit(formData);
  };

  const handleChange = (event) => {
    if (event.target.name === "categorie") {
      let id = parseInt(event.target.id);
      if (!formData.categoryIds.includes(id)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          ["categoryIds"]: [...prevFormData.categoryIds, id],
        }));
      } else {
        let filtered = formData.categoryIds.filter((e) => e != id);
        setFormData((prevFormData) => ({
          ...prevFormData,
          ["categoryIds"]: filtered,
        }));
      }
    } else {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      setValue(formData.createdBy);
    }
  };

  return (
    <>
      <Flex
        justifyContent={"center"}
        backgroundColor={"red.200"}
        borderTopRadius={"md"}
        padding={"4"}>
        <Heading>
          {action} {formData?.title}
        </Heading>
      </Flex>
      <form onSubmit={submit}>
        <SimpleGrid columns={1} spacingX='40px'>
          <InputFormBox
            value={formData?.title}
            onChange={handleChange}
            caption={"title"}
            type={"text"}
            name={"title"}
          />

          <InputFormBox
            value={formData?.location}
            onChange={handleChange}
            caption={"location"}
            type={"text"}
            name={"location"}
          />

          <InputFormBox
            value={formData?.image}
            onChange={handleChange}
            caption={"image"}
            type={"url"}
            name={"image"}
          />

          <SimpleGrid columns={2} minChildWidth='120px'>
            <InputFormBox
              value={formData?.startTime}
              onChange={handleChange}
              caption={"start time"}
              type={"datetime-local"}
              name={"startTime"}
            />

            <InputFormBox
              value={formData?.endTime}
              onChange={handleChange}
              caption={"end time"}
              type={"datetime-local"}
              name={"endTime"}
            />
          </SimpleGrid>
          <Box
            backgroundColor={"red.50"}
            padding={"5"}
            margin={"5"}
            borderBottom={"1px"}
            borderColor={"gray.400"}
            borderRadius={"6px"}>
            <Text mb='8px'>User: </Text>
            <Select
              onChange={handleChange}
              value={value}
              name='createdBy'
              backgroundColor={"gray.50"}
              borderRadius={"md"}
              border={"1px"}
              borderColor={"gray.200"}
              size='sm'>
              <option key={-1}>Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </Box>

          <Box
            backgroundColor={"red.50"}
            padding={"5"}
            margin={"5"}
            borderBottom={"1px"}
            borderColor={"gray.400"}
            borderRadius={"6px"}>
            <Text mb='8px'>Categorie: </Text>
            <CategoriesFilter
              categories={categories}
              handleSelect={handleChange}
              selectedCategories={formData?.categoryIds}
            />
          </Box>

          <Box
            backgroundColor={"red.50"}
            padding={"5"}
            margin={"5"}
            borderBottom={"1px"}
            borderColor={"gray.400"}
            borderRadius={"6px"}>
            <Text mb='8px'>Description: </Text>
            <Textarea
              type='text'
              resize='none'
              backgroundColor={"gray.50"}
              border={"1px"}
              borderColor={"gray.200"}
              value={formData?.description}
              name='description'
              onChange={handleChange}
            />
          </Box>
        </SimpleGrid>
        <Flex
          gap={2}
          display={"flex"}
          justifyContent={"flex-end"}
          padding={"2"}>
          <Box>
            <Button
              _hover={{
                background: "blue.400",
                color: "white",
              }}
              type='submit'
              backgroundColor={"blue.200"}
              textTransform={"capitalize"}>
              {action} Event
            </Button>
          </Box>
          <Box>
            <Button
              onClick={handleCancel}
              _hover={{
                background: "orange.400",
                color: "white",
              }}
              backgroundColor={"orange.300"}
              textTransform={"capitalize"}>
              Cancel
            </Button>
          </Box>
        </Flex>
      </form>
    </>
  );
};
