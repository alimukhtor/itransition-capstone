import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { AiFillWarning } from "react-icons/ai";
import "../../../App.css";

const LIMIT_CUSTOM_FIELDS = 3;

export const AddCustomFields = ({ handleAddCustomField, fields }) => {
  const [showFormInputs, setShowFormInputs] = useState(false);
  const [customInputTypeLimit, setCustomInputTypeLimit] = useState(false);
  const [inputType, setInputType] = useState("");
  const [customFieldValues, setCustomFieldValues] = useState({
    title: "",
    type: "",
  });

  // handles controlled inputs and sets object keys and values
  const handleCustomInputFields = (fieldName, value) => {
    setCustomFieldValues({
      ...customFieldValues,
      [fieldName]: value,
    });
  };

  // finds repeted input types and sets validation
  const handleChangeInputType = (e) => {
    const key = e.target.value;
    handleCustomInputFields("type", e.target.value);
    const filtersByType = fields.filter((field) => field.type === key);
    setCustomInputTypeLimit(false);
    if (filtersByType.length >= LIMIT_CUSTOM_FIELDS) {
      setCustomInputTypeLimit(true);
      setInputType(key);
    }
  };

  return (
    <div>
      <Button
        variant="info"
        className="btn mt-2"
        onClick={() => {
          setShowFormInputs(true);
        }}
      >
        +
      </Button>
      {showFormInputs && (
        <Form>
          {customInputTypeLimit ? (
            <Alert variant="danger" className="rounded-pill">
              You are not allowed to create same {inputType} input more than 3
              times <AiFillWarning />
            </Alert>
          ) : null}
          <h3>Create your own custom inputs:</h3>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            className="rounded-pill"
            placeholder="title"
            value={customFieldValues.title}
            onChange={(e) => handleCustomInputFields("title", e.target.value)}
          />
          <Form.Label>Choose input type</Form.Label>
          <Form.Control
            as="select"
            className="mb-3 rounded-pill"
            value={customFieldValues.type}
            onChange={(e) => handleChangeInputType(e)}
          >
            <option>text</option>
            <option>textarea</option>
            <option>number</option>
            <option>date</option>
            <option>checkbox</option>
          </Form.Control>
          <Button
            variant="info"
            className="rounded-pill"
            disabled={customInputTypeLimit ? true : false}
            onClick={() => {
              handleAddCustomField(customFieldValues, setCustomFieldValues);
              setShowFormInputs(false);
            }}
          >
            Confirm
          </Button>
        </Form>
      )}
    </div>
  );
};
