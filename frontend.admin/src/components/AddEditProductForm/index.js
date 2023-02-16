import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  ProgressBar,
  Image,
} from 'react-bootstrap';

import {
  MSG29,
  MSG35,
  MSG37,
  MSG39,
  MSG40,
  MSG41,
} from '~/system/Messages/messages';
import { checkFieldIsEmpty } from '../Validation';
import CustomModal from '../Modal';

import '../AddEditAccountForm/AddEditAccountForm.scss';

const categoriesListData = [
  {
    id: 1,
    name: 'Chim',
  },
  {
    id: 2,
    name: 'Thức ăn',
  },
  {
    id: 3,
    name: 'Lồng chim',
  },
  {
    id: 4,
    name: 'Phụ kiện',
  },
  {
    id: 0,
    name: 'Khác',
  },
];

const shortDescriptionListData = [
  {
    id: 1,
    name: 'Chim bổi',
  },
  {
    id: 2,
    name: 'Chim chuyền',
  },
  {
    id: 3,
    name: 'Chim thuần',
  },
  {
    id: 4,
    name: 'Chim non',
  },
];

const birdGendersData = [
  {
    id: 1,
    name: 'Chim trống',
  },
  {
    id: 2,
    name: 'Chim mái',
  },
  {
    id: 0,
    name: 'Khác',
  },
];

const AddEditProductForm = () => {
  let navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [productImage, setProductImage] = useState(null);
  const [productImageURL, setProductImageURL] = useState('');
  const [productName, setProductName] = useState('');
  const [productCategories, setProductCategories] = useState([]);
  const [productCategory, setProductCategory] = useState('1');
  const [shortDescriptionList, setShortDescriptionList] = useState([]);
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [gendersList, setGendersList] = useState([]);

  const [isEntered, setIsEntering] = useState(false);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [checkEnableUpdateButton, setCheckEnableUpdateButton] = useState(false);

  // Get product categories list
  const getProductCategories = useCallback(async () => {
    try {
      const data = categoriesListData;
      setProductCategories(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getProductCategories();
  }, [getProductCategories]);

  // Get product short description list
  const getProductShortDescription = useCallback(async () => {
    try {
      const data = shortDescriptionListData;
      setShortDescriptionList(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getProductShortDescription();
  }, [getProductShortDescription]);

  // Get product genders list
  const getGendersList = useCallback(async () => {
    try {
      const data = birdGendersData;
      setGendersList(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getGendersList();
  }, [getGendersList]);

  const handleFormFocused = () => setIsEntering(true);
  const redStart = productId ? '' : <span className="text-danger">*</span>;
  const changeTitle = productId
    ? 'Thay đổi thông tin sản phẩm'
    : 'Thêm sản phẩm';
  const changeContentModal = productId ? MSG37 : MSG35;

  const handleChangeProductImage = () => {};
  const handleUploadImage = () => {};

  // Manage Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Manage Form
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      handleShow();
    }
  };

  const handleSubmitSuccess = () => {};

  const RenderBirdFields = () => {
    return (
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="validationProductName">
            <Form.Label>Tên sản phẩm {redStart}</Form.Label>
            <Form.Control
              type="text"
              maxLength={100}
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
                setCheckEnableUpdateButton(true);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              {checkFieldIsEmpty(productName, MSG29)}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group
            className="mb-3"
            controlId="validationProductShortDescription"
          >
            <Form.Label>Loại chim {redStart}</Form.Label>
            <Form.Select
              value={shortDescription}
              onChange={(e) => {
                setShortDescription(e.target.value);
                setCheckEnableUpdateButton(true);
              }}
              aria-label="Chọn loại chim"
              required
            >
              <option value="">Chọn loại chim</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {MSG40}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group
            className="mb-3"
            controlId="validationProductShortDescription"
          >
            <Form.Label>Giới tính {redStart}</Form.Label>
            <Form.Select
              value={shortDescription}
              onChange={(e) => {
                setShortDescription(e.target.value);
                setCheckEnableUpdateButton(true);
              }}
              aria-label="Chọn giới tính"
              required
            >
              <option value="">Chọn giới tính</option>
              {gendersList.map((gender, index) => (
                <option key={index} value={gender.id}>
                  {gender.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {MSG40}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3" controlId="validationProductName">
            <Form.Label>Tuổi {redStart}</Form.Label>
            <Form.Control
              type="text"
              maxLength={100}
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
                setCheckEnableUpdateButton(true);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              {checkFieldIsEmpty(productName, MSG29)}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group
            className="mb-3"
            controlId="validationProductShortDescription"
          >
            <Form.Label>Kiểu chim {redStart}</Form.Label>
            <Form.Select
              value={shortDescription}
              onChange={(e) => {
                setShortDescription(e.target.value);
                setCheckEnableUpdateButton(true);
              }}
              aria-label="Chọn kiểu chim"
              required
            >
              <option value="">Chọn kiểu chim</option>
              {shortDescriptionList.map((shortDescription, index) => (
                <option key={index} value={shortDescription.id}>
                  {shortDescription.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {MSG40}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <h2 className="align-items-center">{changeTitle}</h2>
      <Col lg={12} className="mt-4">
        <Card className="border-0 p-4 rounded shadow">
          <Form
            noValidate
            validated={validated}
            onFocus={handleFormFocused}
            onSubmit={handleSubmit}
          >
            <Row>
              <Col className="align-items-center">
                <h5>Chọn ảnh sản phẩm {redStart}</h5>
              </Col>
            </Row>
            {productImageURL && (
              <Row>
                <Col className="align-items-center">
                  <Image
                    className="product-image-file"
                    src={productImageURL}
                    alt={productName}
                    roundedCircle={true}
                  />
                </Col>
              </Row>
            )}

            <Row className="justify-content-center">
              <Col md={3}>
                {showProgress && (
                  <ProgressBar variant="info" now={progress} max={100} />
                )}
              </Col>
            </Row>

            <Form.Group controlId="validationImage">
              <Row className="align-items-center">
                <Col className="product-image-file-content">
                  <Form.Control
                    width={50}
                    type="file"
                    onChange={handleChangeProductImage}
                    accept="image/*"
                    className="product-image-file-input"
                    required={productId ? false : true}
                  />
                  <Button
                    variant="primary"
                    onClick={handleUploadImage}
                    disabled={productImage ? false : true}
                  >
                    Tải ảnh lên
                  </Button>
                  <Form.Control.Feedback
                    type="invalid"
                    className="product-image-invalid"
                  >
                    {MSG39}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Form.Group>
            <hr />

            <Col md={3}>
              <Form.Group
                className="mb-3"
                controlId="validationProductCategory"
              >
                <Form.Label>Loại sản phẩm {redStart}</Form.Label>
                <Form.Select
                  value={productCategory}
                  onChange={(e) => {
                    setProductCategory(e.target.value);
                    setCheckEnableUpdateButton(true);
                  }}
                  aria-label="Chọn loại sản phẩm"
                  required
                >
                  {productCategories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {MSG40}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {productCategory === '1' ? <RenderBirdFields /> : <p>Khác</p>}

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="validationDescription">
                  <Form.Label>Mô tả {redStart}</Form.Label>
                  <Form.Control
                    as="textarea"
                    maxLength={1000}
                    style={{ height: '150px' }}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setCheckEnableUpdateButton(true);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {checkFieldIsEmpty(description, MSG41)}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="validationProductName">
                  <Form.Label>Số lượng {redStart}</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength={100}
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);
                      setCheckEnableUpdateButton(true);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {checkFieldIsEmpty(productName, MSG29)}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="validationProductName">
                  <Form.Label>Giá thành {redStart}</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength={100}
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);
                      setCheckEnableUpdateButton(true);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {checkFieldIsEmpty(productName, MSG29)}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end">
              {productId ? (
                <Button
                  variant="primary"
                  className="px-4 mx-2"
                  type="submit"
                  disabled={checkEnableUpdateButton === true ? false : true}
                >
                  Thay đổi
                </Button>
              ) : (
                <Button variant="primary" className="px-4 mx-2" type="submit">
                  Thêm
                </Button>
              )}
            </div>

            <CustomModal
              show={show}
              title={changeTitle}
              body={changeContentModal}
              handleClose={handleClose}
              handleSubmit={handleSubmitSuccess}
            />
          </Form>
        </Card>
      </Col>
    </>
  );
};

export default AddEditProductForm;
