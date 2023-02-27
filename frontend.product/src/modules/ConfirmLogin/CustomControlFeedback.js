import { Form } from "react-bootstrap";

const CustomControlFeedback = ({ children }) => {
  return (
    <Form.Control.Feedback type="invalid" style={{ color: "white" }}>
      {children}
    </Form.Control.Feedback>
  );
};

export default CustomControlFeedback;
