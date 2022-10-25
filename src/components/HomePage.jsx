import { Container } from "react-bootstrap";
import Collections from "./Admin/collections/Collections";

export const HomePage = ({
  setUserNotAllowed,
  userNotAllowed,
  userPermission,
  ToastContainer,
  collections, 
  setCollections
}) => {
  return (
    <Container fluid>
      <Collections
        setUserNotAllowed={setUserNotAllowed}
        userNotAllowed={userNotAllowed}
        userPermission={userPermission}
        ToastContainer={ToastContainer}
        setCollections={setCollections}
        collections={collections}
      />
    </Container>
  );
};
