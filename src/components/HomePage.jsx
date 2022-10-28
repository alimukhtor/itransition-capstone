import { Alert, Container, Row } from "react-bootstrap";
import Collections from "./Admin/collections/Collections";
import { MdCancel } from "react-icons/md";
import { ImSad } from "react-icons/im";
export const HomePage = ({
  setUserNotAllowed,
  userNotAllowed,
  userPermission,
  ToastContainer,
  collections,
  setCollections,
  searchQueryNotFound,
}) => {
  return (
    <Container fluid>
      <Row>
        {searchQueryNotFound ? (
          <Alert variant="danger" className="rounded-pill mb-5">
            <MdCancel /> Item not not found <ImSad />
          </Alert>
        ) : (
          <Collections
            setUserNotAllowed={setUserNotAllowed}
            userNotAllowed={userNotAllowed}
            userPermission={userPermission}
            ToastContainer={ToastContainer}
            setCollections={setCollections}
            collections={collections}
          />
        )}
      </Row>
    </Container>
  );
};
