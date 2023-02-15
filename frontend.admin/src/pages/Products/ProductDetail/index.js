import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Carousel, Rate } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Button, Card, CardGroup, Col, Image, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import CustomTooltip from '~/ui/CustomTooltip';

import CustomWrapper from '~/ui/CustomWrapper';
import productData from './productData.json';

const contentStyle = {
  color: '#fff',
  textAlign: 'center',
  background: '#364d79',
};

const desc = ['rất tệ', 'tệ', 'bình thường', 'tốt', 'tuyệt vời'];

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [relativeProducts, setRelativeProducts] = useState([]);
  const [value, setValue] = useState(3.5);

  //Get product by id
  const getProductById = useCallback(
    async (productId) => {
      try {
        const data = productData;
        setProduct(data);
        setImages(product?.Url);
        setRelativeProducts(product?.relativeProducts);
      } catch (e) {
        console.log(e);
      }
    },
    [product],
  );

  useEffect(() => {
    getProductById();
  }, [getProductById]);

  return (
    <>
      <CustomWrapper>
        <h2 style={{ textAlign: 'center' }}>Thông tin sản phẩm</h2>
        <Row className="my-3">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Carousel autoplay>
                  {images
                    ? images.map((image) => {
                        return (
                          <div>
                            <h3 style={contentStyle}>
                              <Image
                                src={image}
                                style={{ width: '100%', height: 'auto' }}
                                alt={product?.Name}
                              />
                            </h3>
                          </div>
                        );
                      })
                    : ''}
                </Carousel>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card>
              <Card.Header>
                <Row>
                  <Col md={10}>
                    <h4>{product?.Name}</h4>
                  </Col>
                  <Col md={2}>
                    <div className="text-end">
                      <Link to={``}>
                        <CustomTooltip
                          title="Chỉnh sửa sản phẩm"
                          color="#0d6efd"
                        >
                          <Button variant="outline-primary" size="xs">
                            <FontAwesomeIcon icon={faPen} size="lg" />
                          </Button>
                        </CustomTooltip>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Card.Header>

              <Card.Body style={{ fontSize: '1.2rem' }}>
                <Row>
                  <Col md={4}>
                    <Card.Text>
                      <strong>Mã sản phẩm: &nbsp;</strong>
                    </Card.Text>
                    <Card.Text>
                      <strong>Loại sản phẩm: &nbsp;</strong>
                    </Card.Text>
                    <Card.Text>
                      <strong>Giới tính: &nbsp;</strong>
                    </Card.Text>
                    <Card.Text>
                      <strong>Tuổi: &nbsp;</strong>
                    </Card.Text>
                  </Col>
                  <Col md={8}>
                    <Card.Text>{product.ProductCode}</Card.Text>
                    <Card.Text>
                      {product?.ShortDescription}, {product?.CategoryId}
                    </Card.Text>
                    <Card.Text>{product.Gender || 'giới tính'}</Card.Text>
                    <Card.Text>{product.Age || 'tuổi'}</Card.Text>
                  </Col>
                </Row>

                <br />
                <Row>
                  <Col md={4}>
                    <Card.Text>
                      <strong>Đánh giá: &nbsp;</strong>
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>
                      <span>
                        <Rate
                          allowHalf
                          tooltips={desc}
                          onChange={setValue}
                          value={value}
                        />
                        {value ? (
                          <span className="ant-rate-text">
                            ({value} - {desc[Math.round(value) - 1]})
                          </span>
                        ) : (
                          ''
                        )}
                      </span>
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="my-3">
          <Card>
            <Row>
              <Col md={6}>
                <div style={{ fontSize: '1.4rem' }}>
                  <strong>Thông tin sản phẩm</strong>
                </div>
                <p>{product?.Description}</p>
              </Col>

              <Col md={6}>
                <div style={{ fontSize: '1.4rem' }}>
                  <strong>Lưu ý khi mua</strong>
                </div>
                <p>{product?.Description}</p>
              </Col>
            </Row>
          </Card>
        </Row>

        <div style={{ marginTop: 20 }}>
          <hr />
          <h4>Mặt hàng liên quan</h4>
          <CardGroup>
            {relativeProducts
              ? relativeProducts.map((relativeProduct) => {
                  return (
                    <Card
                      style={{
                        maxWidth: '25%',
                        marginRight: 16,
                        border: '2px solid rgba(0, 0, 0, 0.3)',
                        borderRadius: 5,
                        boxShadow: '4px 6px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Card.Img variant="top" src={relativeProduct.Url} />
                      <Card.Body>
                        <Card.Title>{relativeProduct.Name}</Card.Title>
                        <Card.Text>
                          Tuổi:&nbsp;{relativeProduct.Age}
                          <br />
                          Giới tính:&nbsp;{relativeProduct.Gender}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="text-end">
                        <strong
                          style={{
                            display: 'block',
                            fontSize: '1.2rem',
                            color: '#0A54A8',
                          }}
                        >
                          {relativeProduct.Price}.đ
                        </strong>
                        <Link to={``}>
                          <Button variant="dark">Xem sản phẩm</Button>
                        </Link>
                      </Card.Footer>
                    </Card>
                  );
                })
              : ''}
          </CardGroup>
        </div>
      </CustomWrapper>
    </>
  );
}

export default ProductDetail;
