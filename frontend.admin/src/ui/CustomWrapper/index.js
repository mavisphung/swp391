import { Container, Row } from 'react-bootstrap';

const CustomWrapper = ({ children }) => {
  return (
    <div className="d-flex flex-row">
      <Container>
        <Row className="justify-content-center">{children}</Row>
      </Container>
    </div>
  );
};

export default CustomWrapper;
