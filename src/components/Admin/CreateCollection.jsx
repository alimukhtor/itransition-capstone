import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { AddCustomFields } from "./AddCustomFields";
import { TiTick } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";
import { BiBookAdd } from "react-icons/bi";
import { CustomFields } from "./CustomFields";

const CreateCollection = (props) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [image, setImage] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [isCollectionCreated, setIsCollectionCreated] = useState(false);
  const [requestData, setRequestData] = useState({
    name: "",
    topic: "",
    description: "",
    owner: userId,
    customFields: [
      {
        title: "",
        type: "",
      },
    ],
  });

  const handleInput = (fieldName, value) => {
    setRequestData({
      ...requestData,
      [fieldName]: value,
    });
  };

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
      setCustomFieldValues('')
    }
  };
  const createCollection = async () => {
    const response = await fetch(
      "https://itransition-capstone.herokuapp.com/collections",
      {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.ok) {
      try {
        setIsCollectionCreated(true);
        const data = await response.json();
        if (image) {
          const fd = new FormData();
          fd.append("image", image);
          await fetch(
            `https://itransition-capstone.herokuapp.com/collections/${data._id}`,
            {
              method: "POST",
              body: fd,
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          alert("Image uploaded");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleResetForm = (e) => {
    e.preventDefault();
    e.target.reset();
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
          Create Collection
        </Modal.Title>
        <ImCancelCircle
          onClick={props.onHide}
          className="ml-auto text-danger mt-2"
          style={{ fontSize: "25px" }}
        />
      </Modal.Header>
      <Modal.Body>
        <Form>
          {isCollectionCreated ? (
            <Alert variant="success">
              <TiTick />
              Collection successfully created
            </Alert>
          ) : null}
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
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
              placeholder="description"
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
              placeholder="topic"
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
              alt="file-upload"
              value={requestData.image}
              onChange={(event) => {
                setImage(event.target.files[0]);
              }}
            />
          </Form.Group>
          {isSelected ? (
            <CustomFields fields={requestData.customFields} />
          ) : null}

          <AddCustomFields handleAddCustomField={handleAddCustomField} fields={requestData.customFields}/>
          <Button
            variant="success"
            type="submit"
            className="mt-3 rounded-pill text-center"
            onClick={createCollection}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

CreateCollection.prototype = {};

export default CreateCollection;
