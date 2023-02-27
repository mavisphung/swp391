import { MdAlternateEmail } from "react-icons/md";
import { BsFillTelephoneFill, BsCartFill } from "react-icons/bs";
import { Col, Container, Form, Image, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./HeaderLayout.scss";
import config from "~/config";
import AppIcons from "~/assets/icons";
import { useUserCart } from "~/context/UserCartContext";

import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  const { cartAmount } = useUserCart();
  return (
    <div>
      <Container>
        <div className="home-contact">
          <Col md>
            <BsFillTelephoneFill /> 039.431.431 - 0985.651.651
          </Col>
          <Col md>
            <MdAlternateEmail /> chymstore@gmail.com
          </Col>
        </div>
        <Navbar expand="lg" variant="light" className="">
          <Container fluid style={{ padding: 0 }}>
            <Navbar.Brand>
              <Link to={config.routes.dashboard}>
                <Image src={AppIcons.logo} alt="ChyStore icon" />
              </Link>
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
              <div className="d-flex header-link">
                <Link to={config.routes.cart} className="pl-2">
                  <BsCartFill color="#ee3e6a" /> ({cartAmount})
                </Link>
                <Link to={config.routes.login} className="px-2">
                  Đăng nhập
                </Link>
                <div className="px-1">|</div>
                <Link to={config.routes.register} className="px-2">
                  Đăng ký
                </Link>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}

export default Header;
