import { Container } from "react-bootstrap";
import Collections from "./Admin/collections/Collections";

export const HomePage = ({ setUserNotAllowed, userNotAllowed }) => {
  return (
    <Container fluid>
      <Collections
        setUserNotAllowed={setUserNotAllowed}
        userNotAllowed={userNotAllowed}
      />
    </Container>
  );
};
