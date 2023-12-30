import {
  CardHeader,
  Box,
  Image,
  Card,
  CardBody,
  Container,
  CardFooter,
  Spacer,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { DeleteModal } from "../components/DeleteModal";
import { useNavigate } from "react-router-dom";
import { Form } from "../components/Form";
import { EventContext } from "../components/Contexts";
import { CategoryElement } from "../components/CategoryElement";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  return {
    event: await event.json(),
  };
};

export const EventPage = () => {
  const toast = useToast();
  const { event } = useLoaderData();
  const [edit, setEdit] = useState(false);
  const { data_options, users } = useContext(EventContext);
  const [user, setUser] = useState(null);

  //CreatedBy to user name & image
  useEffect(() => {
    const fetchUser = () => {
      const userArray = users.filter((u) => u.id === event.createdBy);
      setUser(userArray[0]);
    };
    fetchUser();
  }, []);

  //delete button function
  const navigate = useNavigate();
  const deleteEvent = async () => {
    await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
    navigate(`/`);
  };

  //edit button function
  const editEvent = () => {
    setEdit(true);
  };

  const handleSubmit = (formData) => {
    updateEvent(formData);
  };

  const updateEvent = async (event) => {
    const response = await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PUT",
      body: JSON.stringify(event),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });

    if (response.status === 200) {
      toast({
        title: "Event is updated.",
        description: "Even has been edit.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else if (response.status !== 200) {
      toast({
        title: "Failed to create an event.",
        description: "Failed to edit an event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setEdit(false);
    navigate(`/event/${event.id}`);
  };

  //cancel button disable form only
  const handleCancel = () => {
    setEdit(false);
  };

  return (
    <>
      {!edit && (
        <Container maxW='full' height='container.lg'>
          <Card
            key={event.id}
            className='eventsPage'
            backgroundColor={"gray.50"}
            width={"60%"}
            left={"20%"}
            categories={"3"}>
            <CardHeader padding={0}>
              {/* CategoryIds to catogorie.name */}

              <CategoryElement event={event} />
              <Box
                padding={"5"}
                fontSize={"xx-large"}
                fontWeight={"bold"}
                backgroundColor={"gray.100"}>
                {event.title}
              </Box>

              {/* CreatedBy to user name & image "*/}
              {user && (
                <Flex alignItems={"center"} padding={"5"}>
                  <Box overflow={"hidden"}>
                    <Image
                      height={"100px"}
                      borderRadius={"50%"}
                      src={user.image}
                    />
                  </Box>

                  <Box
                    fontWeight={"semibold"}
                    fontSize={"medium"}
                    padding={"5"}>
                    {user?.name}
                  </Box>
                </Flex>
              )}

              <Flex backgroundColor={"linkedin.100"}>
                <Box
                  color={"gray.500"}
                  padding={"5"}
                  fontSize={"small"}
                  fontWeight={"medium"}>
                  {new Date(event.startTime).toLocaleDateString(
                    "en-US",
                    data_options
                  )}{" "}
                  -{" "}
                  {new Date(event.endTime).toLocaleDateString(
                    "en-US",
                    data_options
                  )}
                </Box>
                <Spacer />
                <Box
                  color={"gray.500"}
                  padding={"5"}
                  fontSize={"small"}
                  fontWeight={"medium"}>
                  {event.location}
                </Box>
              </Flex>

              <Box width={"100%"} height={"200px"} overflow={"hidden"}>
                <Image
                  objectFit={"cover"}
                  objectPosition={"center"}
                  width={"100%"}
                  height={"100%"}
                  src={event.image}
                />
              </Box>
            </CardHeader>
            <CardBody>
              <Box
                fontSize={"larger"}
                marginBottom={"3"}
                justifyContent={"center"}>
                {event.description}
              </Box>
            </CardBody>

            <CardFooter justifyContent={"flex-end"}>
              <Flex
                display={"flex"}
                justifyContent={"flex-end"}
                padding={"2"}
                gap={2}>
                <Box>
                  <Button
                    onClick={editEvent}
                    backgroundColor={"green.300"}
                    _hover={{
                      background: "green.500",
                      color: "white",
                    }}>
                    Edit
                  </Button>
                </Box>
                <Box>
                  <DeleteModal title={event.title} deleteEvent={deleteEvent} />
                </Box>
              </Flex>
            </CardFooter>
          </Card>
        </Container>
      )}
      {edit && (
        <Container maxW='full' height='container.lg'>
          <Card
            key={event.id}
            className='eventsPage'
            backgroundColor={"gray.300"}
            width={"60%"}
            left={"20%"}
            margin={"3"}>
            <Form
              event={event}
              action={"Edit"}
              handelSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
          </Card>
        </Container>
      )}
    </>
  );
};
