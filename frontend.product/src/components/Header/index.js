import { MdAlternateEmail } from "react-icons/md";
import { BsFillTelephoneFill, BsCartFill } from "react-icons/bs";
import { Col, Container, Form, Image, Nav, Navbar } from "react-bootstrap";
import { createSearchParams, Link, useNavigate } from "react-router-dom";

import "./HeaderLayout.scss";
import config from "~/config";
import AppIcons from "~/assets/icons";
import { useUserCart } from "~/context/UserCartContext";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button } from "antd";
import api from "~/context/AppApi";

function Header() {
  const navigate = useNavigate();

  const [prodList, setProdList] = useState([]);
  const { cartAmount } = useUserCart();
  const [value, setValue] = useState("");

  const getProducts = async () => {
    try {
      const response = await api.get("/product", {
        params: {
          PageNumber: 1,
          PageSize: 50,
        },
      });

      // console.log("RES", response);
      if (response.data) {
        await setProdList(response.data);
        console.log("Prod.DATA", prodList);
      }
    } catch (error) {
      console.log("Get /product/ Error", error);
    }
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchItem) => {
    setValue(searchItem);
    console.log("Search: ", searchItem);
  };

  useEffect(() => {
    getProducts();
  }, []);
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
                <Form>
                  <div className="dropdown">
                    <Form.Control
                      type="input"
                      placeholder="Tìm kiếm"
                      value={value}
                      className="me-2 border-2 border-dark"
                      aria-label="Search"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      htmlSize={40}
                      onChange={onChange}
                    />
                    <div className="dropdown-menu dropdown-menu-lg-end w-100">
                      {prodList
                        .filter((prod) => {
                          const searchTerm = value.toLowerCase();
                          const prodName = prod.name.toLowerCase();

                          return prodName && prodName.startsWith(searchTerm);
                        })
                        .slice(0, 10)
                        .map((p) => (
                          <div
                            className="dropdown-item"
                            // onClick={() => onSearch(p.name)}
                            onClick={() => {
                              onSearch(p.name);
                              const params = {
                                productId: p.id,
                              };
                              p.categoryType === 1
                                ? navigate(
                                    {
                                      pathname: config.routes.birdDetails,
                                      search: `?${createSearchParams(params)}`,
                                    },
                                    {
                                      preventScrollReset: false,
                                      state: {
                                        breadcrumb: [
                                          {
                                            name: p.name,
                                            url: `/product?productId=${p.id}`,
                                          },
                                        ],
                                      },
                                    }
                                  )
                                : navigate(
                                    {
                                      pathname: config.routes.productDetails,
                                      search: `?${createSearchParams(params)}`,
                                    },
                                    {
                                      preventScrollReset: false,
                                      state: {
                                        breadcrumb: [
                                          {
                                            name: p.name,
                                            url: `/product?productId=${p.id}`,
                                          },
                                        ],
                                        categoryType: p.categoryType,
                                      },
                                    }
                                  );
                              window.location.reload(false);
                            }}
                          >
                            {p.name}
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* <Button variant="outline-success">Search</Button> */}
                </Form>
                {/* <Button onClick={() => onSearch(value)}>Search</Button> */}
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
