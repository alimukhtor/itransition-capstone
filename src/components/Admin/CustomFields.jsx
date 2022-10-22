import { Form } from "react-bootstrap";

export const CustomFields = ({ fields }) => {
  console.log("FIELDS",fields);
  return (
    <>
      {fields.map((field, i) => (
        <Form.Group key={i}>
          {field.type === "textarea" ? (
            <>
              <Form.Label>{field.title}</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
              />
            </>
          ) : (
            <>
              <Form.Label>{field.title}</Form.Label>
              <Form.Control 
                type={field.type} 
                className="rounded-pill" 
              />
            </>
          )}
        </Form.Group>
      ))}
    </>
  );
};
