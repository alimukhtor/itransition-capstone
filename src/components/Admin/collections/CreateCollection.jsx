import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { AddCustomFields } from "../customfields/AddCustomFields";
import { TiTick } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";
import { BiBookAdd } from "react-icons/bi";
import { CustomFields } from "../customfields/CustomFields";

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
    customFieldsDescription: [
      // {
      //   title:"",
      //   type:""
      // }
    ],
    customFields: [
      //   {
      //   label: 'License Plate',
      //   value: 'FX123GX'
      // }
    ],
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
    console.log("asd", newFields);
    const { customFieldsDescription } = requestData;
    const newCustomFields = [...customFieldsDescription];
    newCustomFields.push(newFields);
    if (newCustomFields) {
      setIsSelected(true);
      setRequestData({
        ...requestData,
        customFieldsDescription: newCustomFields,
      });
      setCustomFieldValues("");
    }
  };

  // adds custom field values with specific title and type of inputs form
  const handleAddCustomFieldValue = (fieldsValue, setInputValues) => {
    console.log("fieldsValue", fieldsValue);
    // const { customFields } = requestData;
    // const newCustomFieldsValue = [...customFields];
    // newCustomFieldsValue.push(fieldsValue);
    // if (newCustomFieldsValue) {
    //   setIsSelected(true);
    //   setRequestData({
    //     ...requestData,
    //     customFields: newCustomFieldsValue,
    //   });
    //   setInputValues("");
    // }
  };

  // creates collection with uploading img and custom fields
  const createCollection = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${window.remote_url}/collections`, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        setIsCollectionCreated(true);
        setTimeout(() => {
          props.setModalShow(false);
          setIsCollectionCreated(false);
        }, 2000);
        setRequestData("");
        const data = await response.json();
        console.log("NEW COL", data);
        if (image) {
          const fd = new FormData();
          fd.append("image", image);
          await fetch(`${window.remote_url}/collections/${data._id}`, {
            method: "POST",
            body: fd,
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          props.fetchAllCollections();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // resets form input values after submit
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
        <Form onSubmit={handleResetForm}>
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
          {isSelected ? (
            <CustomFields
              fields={requestData.customFieldsDescription}
              handleAddCustomFieldValue={handleAddCustomFieldValue}
            />
          ) : null}
          <AddCustomFields
            handleAddCustomField={handleAddCustomField}
            fields={requestData.customFields}
          />
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

export default CreateCollection;
