import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const CustomFields = ({ fields, handleAddCustomFieldValue }) => {
  const [inputValues, setInputValues] = useState({
    textarea: "",
    text: "",
    number: "",
    checked: false,
    date: "",
  });
  // i should save the values of your custom inputs here
  // i should save them in an array
  //

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
          {field.type === "textarea" ? (
            <>
              <Form.Label>{field.title}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type={field.type}
                value={inputValues.textarea}
                onChange={(e) => {handleInput("textarea", e.target.value)}}
              />
            </>
          ) : field.type === "checkbox" ? (
            <>
              <Form.Label>{field.title}</Form.Label>
              <Form.Control
                type={field.type}
                className="rounded-pill"
                checked={inputValues.checked}
                onChange={(e) => {handleInput("checked", e.target.checked)}}
              />
            </>
          ) : field.type === "date" ? (
            <>
              <Form.Label>{field.title}</Form.Label>
              <Form.Control
                type={field.type}
                className="rounded-pill"
                value={inputValues.date}
                onChange={(e) => {handleInput("date", e.target.value)}}
              />
            </>
          ) : field.type === "number" ? (
            <>
              <Form.Label>{field.title}</Form.Label>
              <Form.Control
                type={field.type}
                className="rounded-pill"
                value={inputValues.number}
                onChange={(e) => {handleInput("number", e.target.value)}}
              />
            </>
          ) : (
            <>
              <Form.Label>{field.title}</Form.Label>
              <Form.Control
                type={field.type}
                className="rounded-pill"
                value={inputValues.text}
                onChange={(e) => {handleInput("text", e.target.value)}}
              />
            </>
          )}
        </Form.Group>
      ))}
      <Button onClick={() => handleAddCustomFieldValue(inputValues, setInputValues)}>
        Add
      </Button>
    </>
  );
};
