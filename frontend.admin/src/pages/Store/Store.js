import { Carousel } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { getBannersListData } from '~/api/banners';
import { viewBannersList } from '~/system/Constants/LinkURL';
import CustomSpinner from '~/ui/CustomSpinner';
import CustomWrapper from '~/ui/CustomWrapper';

const contentStyle = {
  color: '#fff',
  textAlign: 'center',
  height: 300,
  background: '#364d79',
};

function Store() {
  const { pathname } = useLocation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  //Get banners list
  const getBannersList = useCallback(async () => {
    try {
      const data = await getBannersListData(1);
      setImages(data.data.map((banner) => banner.image));
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getBannersList();
  }, [getBannersList]);

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          <CustomWrapper>
            <h2 style={{ textAlign: 'center' }}>Thông tin cửa hàng</h2>
            <Row className="my-3">
              <Link to={`${pathname}/${viewBannersList}`}>
                <Col md={12}>
                  <Card style={{ backgroundColor: '#001529' }}>
                    <Card.Body>
                      <Carousel autoplay>
                        {images
                          ? images.map((image, index) => {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  <h3 style={contentStyle}>
                                    <Image
                                      src={image}
                                      style={{ width: '100%', height: 'auto' }}
                                      alt={'Banner'}
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
              </Link>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to={`${pathname}/${viewBannersList}`}>
                <Button variant="outline-info" size="xs">
                  {'Đến danh sách banner >>>'}
                </Button>
              </Link>
            </div>
          </CustomWrapper>
        </>
      )}
    </>
  );
}

export default Store;
