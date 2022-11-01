import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { TiTick } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";
import { BiBookAdd } from "react-icons/bi";
import { CustomFields } from "../customfields/CustomFields";
import { TagsInput } from "./TagsInput";

export const CreateItem = (props) => {
  const [image, setImage] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [isItemCreated, setIsItemCreated] = useState(false);
  const token = window.localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [newItemData, setNewItemData] = useState({
    name: "",
    topic: "",
    description: "",
    collections: props.collectionId,
    owner: userId,
    tags: [props.tags],
    customFields: [],
  });

  // handles controlled inputs and sets object keys and values
  const handleInput = (fieldName, value) => {
    setNewItemData({
      ...newItemData,
      [fieldName]: value,
    });
  };

  // adds custom field values with specific title and type of inputs form
  const handleAddCustomFieldValue = (inputValues, setInputValues) => {
    const { customFields } = newItemData;
    const newCustomFieldsValue = [...customFields];
    newCustomFieldsValue.push(inputValues);
    if (newCustomFieldsValue) {
      setIsSelected(true);
      setNewItemData({
        ...newItemData,
        customFields: newCustomFieldsValue,
      });
      setInputValues("");
    }
  };

  // creates item for specific collection
  const createItem = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${window.remote_url}/items`, {
        method: "POST",
        body: JSON.stringify(newItemData),
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
        setNewItemData("");
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
          props.fetchSingleCollection();
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
          {props.translate("ItemModal.Title")}
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
              {props.translate("ItemModal.SuccessMsg")}
            </Alert>
          ) : null}
          <Form.Group>
            <Form.Label>{props.translate("ItemModal.Name")}</Form.Label>
            <Form.Control
              type="text"
              className="rounded-pill"
              value={newItemData.name}
              onChange={(e) => {
                handleInput("name", e.target.value);
              }}
            />
          </Form.Group>
          <Form.Label className="mb-n5 mt-1">{props.translate("ItemModal.EnterTag")}</Form.Label>
          <TagsInput
            items={props.items}
            setInputTag={props.setInputTag}
            inputTag={props.inputTag}
            requestData={newItemData}
            setRequestData={setNewItemData}
          />
          <Form.Group>
            <Form.Label>{props.translate("ItemModal.UploadImg")}</Form.Label>
            <Form.Control
              type="file"
              className="rounded-pill"
              alt="file-upload"
              value={newItemData.image}
              onChange={(event) => {
                setImage(event.target.files[0]);
              }}
            />
          </Form.Group>
          <div className="d-flex flex-column">
            {props.customFields.length !== 0  ? (
              <CustomFields
                fields={props.customFields}
                handleAddCustomFieldValue={handleAddCustomFieldValue}
                isSelected={isSelected}
              />
            ) : null}
            <Button
              variant="success"
              type="submit"
              className="mt-3 rounded-pill text-center"
              onClick={createItem}
            >
              {props.translate("ItemModal.Create")}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
