import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const CustomFields = ({ fields, handleAddCustomFieldValue }) => {
  const [inputValues, setInputValues] = useState({
    label:"",
    value:"",
  })
  // i should save the values of your custom inputs here
  // i should save them in an array
  // 
  console.log("FIELDS",fields );
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
                value={inputValues.value}
                onChange={(e)=> setInputValues('value', e.target.value)}
              />
            </>
          ) : (
            <>
              <Form.Label>{field.title}</Form.Label>
              <Form.Control 
                type={field.type} 
                className="rounded-pill" 
                value={inputValues.value}
                onChange={(e)=> setInputValues('value', e.target.value)}
              />
            </>
          )}
          <Button onClick={()=> handleAddCustomFieldValue(inputValues)}>Add custom fields</Button>
        </Form.Group>
      ))}
    </>
  );
};
