import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { MdAdd } from "react-icons/md";
import "../../App.css";
// add validation for

export const AddCustomFields = ({ handleAddCustomField, fields }) => {
  const [show, setShow] = useState(false);
  const [customInputTypeLimit, setCustomInputTypeLimit] = useState(false);
  const [objKey, setObjKey] = useState("");
  const [customFieldValues, setCustomFieldValues] = useState({
    title: "",
    type: "",
  });

  const handleCustomInputFields = (fieldName, value) => {
    setCustomFieldValues({
      ...customFieldValues,
      [fieldName]: value,
    });
  };

  let counter = {};
  for (var i = 0; i < fields.length; i += 1) {
    counter[fields[i].type] = (counter[fields[i].type] || 0) + 1;
  }
  for (var key in counter) {
    if (counter[key] > 3) {
      console.log(
        `You are not allowed to create same ${key} type more than 3 times!`
      );
      // setCustomInputTypeLimit(true);
      // setObjKey(key);
    }
  }
  return (
    <div>
      <span
        className="btn"
        onClick={() => {
          setShow(true);
          // show empty inputs for providing new data
        }}
      >
        <MdAdd style={{ fontSize: "25px" }} />
      </span>

      {show && (
        <Form>
          {/* {customInputTypeLimit ? (
            <Alert variant="danger">You are not allowed to create same {objKey} type more than 3 times! </Alert>
          ) : null} */}
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
            onChange={(e) => handleCustomInputFields("type", e.target.value)}
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
            onClick={() => {
              handleAddCustomField(customFieldValues, setCustomFieldValues);
              setShow(false);
            }}
          >
            Confirm
          </Button>
        </Form>
      )}
    </div>
  );
};
