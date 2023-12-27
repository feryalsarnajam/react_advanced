import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Form } from "../components/Form";

export const AddEvent = () => {
  const navigate = useNavigate();
  const toast = useToast();

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

  //Add Data
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
    }
  };

  //Cancel Add data
  const handleCancel = () => {
    navigate(-1);
  };

  //Save after submit
  const handleSubmit = (event) => {
    event.preventDefault();
    createEvent(formData);
  };

  //create a new event
  const createEvent = async (event) => {
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(event),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });

    if (response.status === 201) {
      toast({
        title: "Event is created.",
        description: "Even has been created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else if (response.status != 201) {
      toast({
        title: "Failed to create an event.",
        description: "Failed to create an event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    //let id = (await response.json()).id;
    navigate(`/`);
  };

  return (
    <>
      <Container maxW='full' height='container.xl' padding={0}>
        <Card
          width={"60%"}
          left={"20%"}
          margin={"3"}
          backgroundColor={"gray.300"}>
          <Form
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            action={"Add"}
          />
        </Card>
      </Container>
    </>
  );
};
