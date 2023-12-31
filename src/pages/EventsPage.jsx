import {
  Box,
  Heading,
  Input,
  SimpleGrid,
  Card,
  Image,
  CardHeader,
  CardFooter,
  CardBody,
  Flex,
} from "@chakra-ui/react";
import { DATE_OPTIONS } from "../components/Root";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CategoriesFilter } from "../components/CategoriesFilter";
import { AddEventButton } from "../components/AddEventButton";
import { EventContext } from "../components/Contexts";
import { CategoryElement } from "../components/CategoryElement";

export const EventsPage = () => {
  const { categories } = useContext(EventContext);
  const [events, setEvents] = useState([]);

  //search field state
  const [searchField, setSearchField] = useState("");

  //search categorie state
  const [selectedCategories, setSelectedCategories] = useState([]);

  //Search field
  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  //Selected category Search field
  const handleSelect = (event) => {
    let id = parseInt(event.target.id);
    if (selectedCategories.includes(id)) {
      setSelectedCategories(
        selectedCategories.filter((element) => element !== id)
      );
    } else {
      // add selected id to the selected categories
      setSelectedCategories((oldArray) => [...oldArray, id]);
    }
  };

  //Filter bij text zoekt term in title
  //Filter category id
  const matchedEvents = events
    .filter((event) =>
      event.title.toLowerCase().includes(searchField.toLowerCase())
    )
    .filter(
      (event) =>
        selectedCategories.length === 0 ||
        event.categoryIds.some((cat) => selectedCategories.includes(cat))
    );

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:3000/events");
      const json = await response.json();
      setEvents(json);
    };
    fetchEvents();
  }, []);

  const shortDescription = (description) => {
    return description.slice(0, 25) + (description.length > 25 ? "..." : "");
  };

  return (
    <>
      <AddEventButton />
      <Heading
        fontStyle={"italic"}
        fontWeight={"bold"}
        padding={"5"}
        align='center'
        color={"gray.500"}>
        {matchedEvents.length} Events
      </Heading>
      {matchedEvents.length > 0 && (
        <Flex
          backgroundColor={"gray.200"}
          columns={2}
          padding={"4"}
          gap={4}
          alignItems={"center"}
          justifyContent={"center"}>
          {/* Search field */}
          <Box width={"25%"}>
            <Input
              onChange={handleChange}
              backgroundColor='gray.50'
              placeholder='Search events'
              focusBorderColor='blue.400'
              _placeholder={{ color: "gray.300" }}></Input>
          </Box>

          {/* Category Search field */}
          <Box width={"25%"}>
            <CategoriesFilter
              categories={categories}
              handleSelect={handleSelect}
              selectedCategories={selectedCategories}
            />
          </Box>
        </Flex>
      )}
      <SimpleGrid padding={"5"} columns={[2, null, 3]} spacing={2}>
        {matchedEvents.map((event) => (
          <Box key={event.id}>
            <Card
              className='eventsPage'
              backgroundColor={"gray.50"}
              margin={"5"}
              listStyleType={"none"}>
              <Link to={`/event/${event.id}`}>
                <CardHeader>
                  <Box color={"gray.400"}>
                    {new Date(event.startTime).toLocaleDateString(
                      "en-US",
                      DATE_OPTIONS
                    )}{" "}
                    -{" "}
                    {new Date(event.endTime).toLocaleDateString(
                      "en-US",
                      DATE_OPTIONS
                    )}
                  </Box>

                  <Box
                    marginBottom={"5"}
                    marginTop={"5"}
                    fontSize={"x-large"}
                    fontWeight={"bold"}>
                    {event.title}
                  </Box>
                </CardHeader>

                <CardBody>
                  <Box fontSize={"md"} marginBottom={"3"}>
                    {shortDescription(event.description)}
                  </Box>

                  <CategoryElement event={event} />
                </CardBody>

                <CardFooter padding={0}>
                  <Box width={"100%"} height={"250px"} overflow={"hidden"}>
                    <Image
                      objectFit='cover'
                      objectPosition={"center"}
                      height={"100%"}
                      width={"100%"}
                      bottom={0}
                      src={event.image}
                      alt='Image'
                      borderBottomLeftRadius='md'
                      borderBottomRightRadius='md'
                    />
                  </Box>
                </CardFooter>
              </Link>
            </Card>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};
