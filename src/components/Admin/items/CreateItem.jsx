import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { TiTick } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";
import { BiBookAdd } from "react-icons/bi";
import { AddCustomFields } from "../customfields/AddCustomFields";
import { CustomFields } from "../customfields/CustomFields";
import { TagsInput } from "./TagsInput";

export const CreateItem = (props) => {
  const [image, setImage] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [isItemCreated, setIsItemCreated] = useState(false);
  const token = window.localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [requestData, setRequestData] = useState({
    name: "",
    topic: "",
    description: "",
    collections: props.collectionId,
    owner: userId,
    customFields: [],
  });

  // handles controlled inputs and sets object keys and values
  const handleInput = (fieldName, value) => {
    setRequestData({
      ...requestData,
      [fieldName]: value,
    });
  };

  // adds custom fields with specific title and type of inputs form
  const handleAddCustomField = (newFields, setCustomFieldValues) => {
    const { customFields } = requestData;
    const newCustomFields = [...customFields];
    newCustomFields.push(newFields);
    if (newCustomFields) {
      setIsSelected(true);
      setRequestData({
        ...requestData,
        customFields: newCustomFields,
      });
      setCustomFieldValues("");
    }
  };

  // creates item for specific collection
  const createItem = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${window.remote_url}/items`, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        setIsItemCreated(true);
        setTimeout(() => {
          props.setModalShow(false);
          setIsItemCreated(false);
        }, 2000);
        setRequestData("");
        const newItem = await response.json();
        console.log("newItem", newItem);
        if (image) {
          const fd = new FormData();
          fd.append("image", image);
          await fetch(`${window.remote_url}/items/${newItem._id}`, {
            method: "POST",
            body: fd,
            headers: {
              Authorization: "Bearer " + token,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" className="text-center">
          <BiBookAdd className="mb-1 text-info" />
          Create Item
        </Modal.Title>
        <ImCancelCircle
          onClick={props.onHide}
          className="ml-auto text-danger mt-2"
          style={{ fontSize: "25px" }}
        />
      </Modal.Header>
      <Modal.Body>
        <Form>
          {isItemCreated ? (
            <Alert variant="success">
              <TiTick />
              Item successfully created
            </Alert>
          ) : null}
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              className="rounded-pill"
              placeholder="Name"
              value={requestData.name}
              onChange={(e) => {
                handleInput("name", e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="textarea"
              className="rounded-pill"
              placeholder="Description"
              value={requestData.description}
              onChange={(e) => {
                handleInput("description", e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Topic</Form.Label>
            <Form.Control
              type="text"
              className="rounded-pill"
              placeholder="Topic"
              value={requestData.topic}
              onChange={(e) => {
                handleInput("topic", e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Upload an image</Form.Label>
            <Form.Control
              type="file"
              className="rounded-pill"
              alt="file-upload"
              value={requestData.image}
              onChange={(event) => {
                setImage(event.target.files[0]);
              }}
            />
          </Form.Group>
          <Form.Label className="mt-2">Enter tag</Form.Label>
          <TagsInput items={props.items} />
          {isSelected ? (
            <CustomFields fields={requestData.customFields} />
          ) : null}
          <AddCustomFields
            handleAddCustomField={handleAddCustomField}
            fields={requestData.customFields}
          />
          <Button
            variant="success"
            type="submit"
            className="mt-3 rounded-pill text-center"
            onClick={createItem}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
