import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Form } from "../components/Form";

export const AddEvent = () => {
  const navigate = useNavigate();
  const toast = useToast();

  //Cancel Add data
  const handleCancel = () => {
    navigate(-1);
  };

  //Save after submit
  const handleSubmit = (formData) => {
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
    } else if (response.status !== 201) {
      toast({
        title: "Failed to create an event.",
        description: "Failed to create an event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    let id = (await response.json()).id;
    navigate(`/event/${id}`);
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
            handelSubmit={handleSubmit}
            handleCancel={handleCancel}
            action={"Add"}
          />
        </Card>
      </Container>
    </>
  );
};
