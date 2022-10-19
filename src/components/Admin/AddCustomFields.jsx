import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { MdAdd } from "react-icons/md";
import "../../App.css";
// add validation for

export const AddCustomFields = ({ handleAddCustomField, fields }) => {
  const [showFormInputs, setShowFormInputs] = useState(false);
  // const [counter, setCounter] = useState()
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
  const handleChangeInputType =(e)=> {
    handleCustomInputFields("type", e.target.value)
    let counter = {};
    for (var i = 0; i < fields.length; i++) {
      counter[fields[i].type] = (counter[fields[i].type] || 0) + 1;
    }
    for (var key in counter) {
      if (counter[key] >= 3) {
        setCustomInputTypeLimit(true);
        setInputType(key);
        return;
      }
    }
  }
  return (
    <div>
      <span
        className="btn"
        onClick={() => {
          setShowFormInputs(true);
          // shows empty inputs for providing new data
        }}
      >
        <MdAdd style={{ fontSize: "25px" }} />
      </span>

      {showFormInputs && (
        <Form>
          {customInputTypeLimit ? (
            <Alert variant="danger">
              You are not allowed to create same {inputType} input more than 3
              times!{" "}
            </Alert>
          ) : null}
          <h3>Create your own custom inputs:</h3>
          <Form.Control
            type="text"
            placeholder="title"
            value={customFieldValues.title}
            onChange={(e) => handleCustomInputFields("title", e.target.value)}
          />
          <Form.Control
            as="select"
            className="my-3"
            defaultValue="Choose input type"
            value={customFieldValues.type}
            onChange={(e)=> handleChangeInputType(e)}
          >
            <option>Choose input type</option>
            <option>text</option>
            <option>textarea</option>
            <option>number</option>
            <option>date</option>
            <option>checkbox</option>
          </Form.Control>
          <Button
            className="mr-auto"
            type="button"
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
