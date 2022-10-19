import { Form } from "react-bootstrap";

export const CustomFields = ({ fields }) => {
  return (
    <>
      {fields.slice(1).map((field) => (
        <Form.Group>
          
          {field.type === "textarea" ? (
            <>
              <Form.Label>{field.title}</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </>
          ) : (
            <>
              <Form.Label>{field.title}</Form.Label>
              <Form.Control type={field.type} />
            </>
          )}
        </Form.Group>
      ))}
    </>
  );
};
