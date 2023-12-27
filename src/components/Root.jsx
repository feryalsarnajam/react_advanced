import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Container } from "@chakra-ui/react";
import { EventContext } from "./Contexts";
import { useEffect, useState } from "react";

//tijd omzetten naar andere formatie
export const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export const URL = "http://localhost:3000";

export const Root = () => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${URL}/users`);
      const json = await response.json();
      setUsers(json);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${URL}/categories`);
      const json = await response.json();
      setCategories(json);
    };
    fetchCategories();
  }, []);
  return (
    <>
      <EventContext.Provider
        value={{
          data_options: DATE_OPTIONS,
          users: users,
          categories: categories,
        }}>
        <Container padding={0} maxW='full' backgroundColor={"red.50"}>
          <Navigation />
          <Outlet />
        </Container>
      </EventContext.Provider>
    </>
  );
};
