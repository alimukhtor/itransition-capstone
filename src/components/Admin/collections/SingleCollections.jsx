import "../../../App.css";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";
import { FiPlusCircle } from "react-icons/fi";
import { CreateItem } from "../items/CreateItem";
import CollectionElement from "./CollectionElement";
export const customFields = [];
const SingleCollection = ({
  userNotAllowed,
  setUserNotAllowed,
  userPermission,
  ToastContainer,
  isUserLoggedIn,
  customFields,
  translate,
}) => {
  const [items, setItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [itemNotFound, setItemNotFound] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const { collectionId } = useParams();

  useEffect(() => {
    fetchSingleCollection();
  }, []);

  // fetches single collection by id
  const fetchSingleCollection = async () => {
    const response = await fetch(
      `${window.remote_url}/collections/${collectionId}`
    );
    const data = await response.json();
    setItems(data.items);
    if (data.items.length === 0) {
      setItemNotFound(true);
    }
  };

  return (
    <Container fluid>
      {userNotAllowed ? <ToastContainer /> : null}
      <Row className="p-3">
        {isUserLoggedIn ? (
          <Button
            onClick={() => setModalShow(true)}
            variant="success"
            className="ml-auto rounded-pill"
          >
            <FiPlusCircle style={{ fontSize: "25px" }} />{" "}
            {translate("ItemModal.Title")}
          </Button>
        ) : null}
      </Row>
      <strong>
        <h1 className="text-info">{translate("ItemSectionTitle")}</h1>
      </strong>
      <Row className="p-5 justify-content-center text-center">
        {itemNotFound ? (
          <h1 className="text-info d-flex">
            <AiFillWarning className="text-danger mt-2" />
            {translate("NoItem")}
          </h1>
        ) : (
          <>
            {items.map((item) => (
              <Col xs={12} md={4} lg={2} key={item._id}>
                <CollectionElement
                  items={items}
                  setItems={setItems}
                  setUserNotAllowed={setUserNotAllowed}
                  item={item}
                  fetchSingleCollection={fetchSingleCollection}
                  userNotAllowed={userNotAllowed}
                  userPermission={userPermission}
                  translate={translate}
                />
              </Col>
            ))}
          </>
        )}
        <CreateItem
          show={modalShow}
          onHide={() => setModalShow(false)}
          collectionId={collectionId}
          setModalShow={setModalShow}
          items={items}
          setItems={setItems}
          fetchSingleCollection={fetchSingleCollection}
          setInputTag={setTags}
          inputTag={tags}
          customFields={customFields}
          translate={translate}
        />
      </Row>
    </Container>
  );
};
export default SingleCollection;
