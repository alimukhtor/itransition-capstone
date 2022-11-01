import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { CgPushChevronUpR } from "react-icons/cg";
import { TiTick } from "react-icons/ti";
export const CustomFields = ({
  fields,
  handleAddCustomFieldValue,
  isSelected,
}) => {
  const [inputValues, setInputValues] = useState({
    textarea: "",
    text: "",
    number: "",
    checked: false,
    date: "",
  });

  // handles controlled inputs and sets object keys and values
  const handleInput = (fieldName, value) => {
    setInputValues({
      ...inputValues,
      [fieldName]: value,
    });
  };
  console.log("FIELDS", fields);
  return (
    <>
      {fields?.map((field, i) => (
        <Form.Group key={i}>
          {(() => {
            switch (field.type) {
              case "textarea":
                return (
                  <>
                    <Form.Label>{field.title}</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type={field.type}
                      value={inputValues.textarea}
                      onChange={(e) => {
                        handleInput("textarea", e.target.value);
                      }}
                    />
                  </>
                );
              case "checkbox":
                return (
                  <>
                    <Form.Label>{field.title}</Form.Label>
                    <Form.Control
                      type={field.type}
                      className="rounded-pill"
                      checked={inputValues.checked}
                      onChange={(e) => {
                        handleInput("checked", e.target.checked);
                      }}
                    />
                  </>
                );
              case "date":
                return (
                  <>
                    <Form.Label>{field.title}</Form.Label>
                    <Form.Control
                      type={field.type}
                      className="rounded-pill"
                      value={inputValues.date}
                      onChange={(e) => {
                        handleInput("date", e.target.value);
                      }}
                    />
                  </>
                );
              case "number":
                return (
                  <>
                    <Form.Label>{field.title}</Form.Label>
                    <Form.Control
                      type={field.type}
                      className="rounded-pill"
                      value={inputValues.number}
                      onChange={(e) => {
                        handleInput("number", e.target.value);
                      }}
                    />
                  </>
                );
              default:
                return (
                  <>
                    <Form.Label>{field.title}</Form.Label>
                    <Form.Control
                      type={field.type}
                      className="rounded-pill"
                      value={inputValues.text}
                      onChange={(e) => {
                        handleInput("text", e.target.value);
                      }}
                    />
                  </>
                );
            }
          })()}
        </Form.Group>
      ))}
      {isSelected ? <Alert variant="success"><TiTick/> Successfully pushed</Alert> : null}
      <Button
        variant="info"
        className="rounded-pill mt-2"
        onClick={() => handleAddCustomFieldValue(inputValues, setInputValues)}
      >
        <CgPushChevronUpR /> Push custom fields
      </Button>
    </>
  );
};
