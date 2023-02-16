import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import CustomModal from '../Modal';
import { checkFieldIsEmpty } from '../Validation';
import { MSG29, MSG30, MSG31, MSG32, MSG33 } from '~/system/Messages/messages';
import { dashboard, viewCategoriesList } from '~/system/Constants/LinkURL';
import { useUserAuth } from '~/context/UserAuthContext';
import moment from 'moment';

const AddEditCategoryForm = () => {
  const { getCurrentUser } = useUserAuth();
  const user = getCurrentUser();
  const { categoryId } = useParams();

  let navigate = useNavigate();

  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [category, setCategory] = useState({});

  const [isEntered, setIsEntering] = useState(false);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [checkEnableUpdateButton, setCheckEnableUpdateButton] = useState(false);

  const changeTitle = categoryId ? 'Thông tin loại hàng' : 'Thêm loại hàng';

  const redStart = categoryId ? '' : <span className="text-danger">*</span>;

  const changeContentModal = categoryId ? MSG33 : MSG32;

  const handleFormFocused = () => setIsEntering(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleSubmitSuccess = () => {
    if (categoryId) {
      const updateCategory = {
        ...category,
        name: categoryName,
        description: description,
        categoryType: categoryType,
        UpdatedDate: moment().format('YYYY-MM-DD'),
        UpdatedBy: user.id,
      };
      // call update api and alert
    } else {
      const newCategory = {
        name: categoryName,
        description: description,
        categoryType: categoryType,
        AddedBy: user.id,
        CreatedDate: moment().format('YYYY-MM-DD'),
      };
      // call add api and alert
    }

    setTimeout(
      () =>
        navigate({
          pathname: `/${dashboard}/${viewCategoriesList}`,
        }),
      800,
    );

    setIsEntering(false);
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>{changeTitle}</h2>
      <Col lg={10} className="mt-4">
        <Card className="border-0 p-4 rounded shadow">
          <Form
            noValidate
            validated={validated}
            onFocus={handleFormFocused}
            onSubmit={handleSubmit}
          >
            <Col md={6}>
              <Form.Group className="mb-3" controlId="validationName">
                <Form.Label>Tên loại hàng {redStart}</Form.Label>
                <Form.Control
                  type="text"
                  value={categoryName || ''}
                  maxLength={100}
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                    setCheckEnableUpdateButton(true);
                  }}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {checkFieldIsEmpty(categoryName, MSG29)}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="validationCategoryType">
                <Form.Label>Phân loại {redStart}</Form.Label>
                <Form.Select
                  value={categoryType}
                  onChange={(e) => {
                    setCategoryType(e.target.value);
                    setCheckEnableUpdateButton(true);
                  }}
                  aria-label="Chọn phân loại"
                  required
                >
                  <option value="">Chọn phân loại</option>
                  {/* {productCategories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))} */}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {MSG30}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12} className="mt-4">
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
                  {checkFieldIsEmpty(description, MSG31)}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <div className="text-end">
              {category.isDeleted === true ? (
                <></>
              ) : categoryId ? (
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
          </Form>
          <CustomModal
            show={show}
            title={changeTitle}
            body={changeContentModal}
            handleClose={handleClose}
            handleSubmit={handleSubmitSuccess}
          />
        </Card>
      </Col>
    </>
  );
};

export default AddEditCategoryForm;
