import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ProgressBar,
  Row,
} from 'react-bootstrap';
import CustomModal from '../Modal';
import { checkFieldIsEmpty } from '../Validation';
import {
  MSG29,
  MSG30,
  MSG31,
  MSG32,
  MSG33,
  MSG39,
  MSG45,
  MSG46,
} from '~/system/Messages/messages';
import { dashboard, viewCategoriesList } from '~/system/Constants/LinkURL';
import { useUserAuth } from '~/context/UserAuthContext';
import moment from 'moment';
import { categoriesTypesList } from '~/system/Data/types';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '~/firebase';
import { addCategory } from '~/api/categories';
import { toast } from 'react-toastify';

const AddEditCategoryForm = () => {
  const { getCurrentUser } = useUserAuth();
  const user = getCurrentUser();
  const { categoryId } = useParams();

  let navigate = useNavigate();

  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [category, setCategory] = useState({});
  const [categoryImage, setCategoryImage] = useState(null);
  const [categoryImageURL, setCategoryImageURL] = useState('');

  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [isEntered, setIsEntering] = useState(false);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [checkEnableUpdateButton, setCheckEnableUpdateButton] = useState(false);

  const changeTitle = categoryId ? 'Thông tin loại hàng' : 'Thêm loại hàng';

  const redStart = categoryId ? '' : <span className="text-danger">*</span>;

  const changeContentModal = categoryId ? MSG33 : MSG32;

  // Manage upload image action
  const handleChangeCategoryImage = (e) => {
    if (e.target.files[0]) {
      setCategoryImage(e.target.files[0]);
    }
    setCheckEnableUpdateButton(true);
  };

  const handleUploadImage = () => {
    const storageRef = ref(storage, `categoryImages/${categoryImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, categoryImage);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgress(progress);
        setShowProgress(true);

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is pause');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setCategoryImageURL(downloadURL);
        });
        setShowProgress(false);
      },
    );
  };

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
        image: categoryImageURL,
        // UpdatedDate: moment().format('YYYY-MM-DD'),
        // UpdatedBy: user.id,
      };
      // call update api and alert
      updateCategory(categoryId, updateCategory);
      toast.success(MSG46, { autoClose: 1500 });
    } else {
      const newCategory = {
        name: categoryName,
        description: description,
        categoryType: parseInt(categoryType),
        image: categoryImageURL,
        // AddedBy: user.id,
        // CreatedDate: moment().format('YYYY-MM-DD'),
      };
      console.log(newCategory);
      // call add api and alert
      addCategory(newCategory);
      toast.success(MSG45, { autoClose: 1500 });
    }

    setTimeout(
      () =>
        navigate({
          pathname: `/dashboard/${viewCategoriesList}`,
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
            <Row>
              <Col className="align-items-center">
                <h5>Chọn ảnh loại hàng {redStart}</h5>
              </Col>
            </Row>
            {categoryImageURL && (
              <Row>
                <Col className="align-items-center">
                  <Image
                    className="product-image-file"
                    src={categoryImageURL}
                    alt={categoryName}
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
                    onChange={handleChangeCategoryImage}
                    accept="image/*"
                    className="product-image-file-input"
                    required={categoryId ? false : true}
                  />
                  <Button
                    variant="primary"
                    onClick={handleUploadImage}
                    disabled={categoryImage ? false : true}
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

            <Row>
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
                    {categoriesTypesList.map((type, index) => (
                      <option key={index} value={type.id}>
                        {type.name}
                      </option>
                    ))}
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
            </Row>

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
