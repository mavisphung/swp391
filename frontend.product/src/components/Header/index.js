import "./HeaderLayout.scss";
import config from "../../config";
import storeIcon from "~/assets/images/chystore_icon.svg";
import { Col, Container, Form, Image, Nav, Navbar } from "react-bootstrap";
import { BsFillTelephoneFill, BsCartFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";

import "bootstrap/dist/css/bootstrap.min.css";
function Header() {
  return (
    <div>
      <Container>
        <div>
          <Col md>
            <BsFillTelephoneFill /> 039.431.431 - 0985.651.651
          </Col>
          <Col md>
            <MdAlternateEmail /> chymstore@gmail.com
          </Col>
        </div>
        <Navbar expand="lg" variant="light" className="">
          <Container fluid>
            <Navbar.Brand href="#">
              <Image
                // id="register-icon"
                src={storeIcon}
                alt="ChyStore icon"
                // className="mb-4"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Tìm kiếm"
                    className="me-2 border-2 border-dark"
                    aria-label="Search"
                    htmlSize={40}
                  />
                  {/* <Button variant="outline-success">Search</Button> */}
                </Form>
              </Nav>
              <div className="d-flex">
                <Nav.Link href="#cartAction" className="pl-2">
                  <BsCartFill color="#ee3e6a" /> (0)
                </Nav.Link>
                <Nav.Link href={config.routes.login} className="px-2">
                  Đăng nhập
                </Nav.Link>
                <div className="px-1">|</div>
                <Nav.Link href={config.routes.register} className="px-2">
                  Đăng ký
                </Nav.Link>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}

export default Header;
