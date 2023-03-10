import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Carousel, Rate } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Button, Card, CardGroup, Col, Image, Row } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getProductDetailsById } from '~/api/products';
import { jpeg, jpg, png, mp4, mov } from '~/system/Constants/constants';
import { updateProduct } from '~/system/Constants/LinkURL';
import CustomSpinner from '~/ui/CustomSpinner';
import CustomTooltip from '~/ui/CustomTooltip';

import CustomWrapper from '~/ui/CustomWrapper';

const contentStyle = {
  color: '#fff',
  textAlign: 'center',
  background: '#364d79',
};

const desc = ['rất tệ', 'tệ', 'bình thường', 'tốt', 'tuyệt vời'];

function ProductDetail() {
  const { productId } = useParams();
  const { pathname } = useLocation();
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState('');
  const [relativeProducts, setRelativeProducts] = useState([]);
  const [value, setValue] = useState(3.5);
  const [loading, setLoading] = useState(true);

  //Get product by id
  const getProductById = useCallback(async (productId) => {
    try {
      const data = await getProductDetailsById(productId);
      setProduct(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getProductById(productId);
  }, [getProductById, productId]);

  useEffect(() => {
    if (product) {
      setImages(
        product?.medias?.filter(
          (media) =>
            media.type === png || media.type === jpeg || media.type === jpg,
        ),
      );
      setVideo(
        product?.medias?.find(
          (media) => media.type === mp4 || media.type === mov,
        ),
      );
      setRelativeProducts(product?.relativeProducts);
    }
  }, [product]);

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : (
        <CustomWrapper>
          <h2 style={{ textAlign: 'center' }}>Thông tin sản phẩm</h2>
          <Row className="my-3">
            <Col md={6}>
              <Card style={{ backgroundColor: '#001529' }}>
                <Card.Body>
                  <Carousel autoplay>
                    {images
                      ? images.map((image, index) => {
                          return (
                            <div key={index}>
                              <h3 style={contentStyle}>
                                <Image
                                  src={image.url}
                                  style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: '500px',
                                  }}
                                  alt={product?.name}
                                  fluid
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
                      <h4>{product?.name}</h4>
                    </Col>
                    <Col md={2}>
                      <div className="text-end">
                        <Link to={`${pathname}/${updateProduct}`}>
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
                    <Col md={12}>
                      <Card.Text>
                        <strong>Mã sản phẩm: &nbsp; </strong>
                        {product.productCode}
                      </Card.Text>
                      <Card.Text>
                        <strong>Loại sản phẩm: &nbsp;</strong>
                        {product?.shortDescription}, {product?.categoryName}
                      </Card.Text>
                      {product.gender && (
                        <Card.Text>
                          <strong>Giới tính: &nbsp;</strong>{' '}
                          {product.gender === true ? 'trống' : 'mái'}
                        </Card.Text>
                      )}
                      {product.age && (
                        <Card.Text>
                          <strong>Tuổi: &nbsp; </strong> {product.age || 'tuổi'}
                        </Card.Text>
                      )}
                      <Card.Text>
                        <strong>Số lượng tồn: &nbsp; </strong>
                        {product.quantity === 0
                          ? 'Hết hàng'
                          : product.quantity}{' '}
                        {product.quantity === 0
                          ? ''
                          : product.categoryType === 1
                          ? 'con'
                          : 'sản phẩm'}
                      </Card.Text>
                      <Card.Text>
                        <strong>Giá thành: &nbsp; </strong>
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(product.price)}
                      </Card.Text>
                    </Col>
                    {/* <Col md={8}>
                    <Card.Text>{product.productCode}</Card.Text>
                    <Card.Text>
                      {product?.shortDescription}, {product?.categoryId}
                    </Card.Text>
                    <Card.Text>{product.gender || 'giới tính'}</Card.Text>
                    <Card.Text>{product.age || 'tuổi'}</Card.Text>
                  </Col> */}
                  </Row>

                  <br />
                  <Row>
                    <Col md={12}>
                      <strong>Đánh giá: &nbsp;</strong>
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
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card style={{ marginTop: 20 }}>
                <Card.Header>
                  <Row>
                    <Col>
                      <h5>Thông tin sản phẩm</h5>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Col>
                    <span>{product?.description}</span>
                  </Col>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {video && (
            <Row style={{ marginTop: 20 }}>
              <hr />
              <Col className="align-items-center">
                <div
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <h4>Video giới thiệu</h4>
                  <iframe
                    title="chim chao mao"
                    width="500"
                    height="300"
                    allowFullScreen={true}
                    style={{ border: '10px solid black' }}
                    src={video.url}
                  ></iframe>
                </div>
              </Col>
            </Row>
          )}

          <div style={{ marginTop: 20 }}>
            <hr />
            <h4>Mặt hàng liên quan</h4>
            <CardGroup>
              {relativeProducts
                ? relativeProducts.map((relativeProduct, index) => {
                    return (
                      <Card
                        style={{
                          maxWidth: '25%',
                          marginRight: 16,
                          border: '3px solid rgba(0, 0, 0, 0.3)',
                          borderRadius: 5,
                          boxShadow: '4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                        key={index}
                      >
                        <Card.Img
                          variant="top"
                          src={
                            relativeProduct.medias.filter(
                              (media) =>
                                media.type === png ||
                                media.type === jpeg ||
                                media.type === jpg,
                            )[0]?.url
                          }
                        />
                        <Card.Body>
                          <Card.Title>{relativeProduct.name}</Card.Title>
                          <Card.Text>
                            Tuổi:&nbsp;{relativeProduct.age}
                            <br />
                            Giới tính:&nbsp;{relativeProduct.gender}
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
                            {relativeProduct.price}.đ
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
      )}
    </>
  );
}

export default ProductDetail;
