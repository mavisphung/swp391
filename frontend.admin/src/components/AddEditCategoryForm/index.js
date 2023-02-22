import { useCallback, useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import CustomSpinner from '~/ui/CustomSpinner';
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
import { viewCategoriesList } from '~/system/Constants/LinkURL';
import { useUserAuth } from '~/context/UserAuthContext';
import moment from 'moment';
import { categoriesTypesList } from '~/system/Data/types';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '~/firebase';
import {
  addCategory,
  getCategoriesListData,
  getCategoryDataById,
  updateCategoryById,
} from '~/api/categories';

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
  const [relativeCategories, setRelativeCategories] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const animatedComponent = makeAnimated();
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [isEntered, setIsEntering] = useState(false);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [checkEnableUpdateButton, setCheckEnableUpdateButton] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get categories list
  const getCategoriesList = useCallback(async () => {
    try {
      const data = await getCategoriesListData(1, 100);
      setCategoriesList(
        data.data.map((category) => ({
          value: category.id,
          label: category.name,
        })),
      );
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getCategoriesList();
  }, [getCategoriesList]);

  // Get category by id
  const getCategoryById = useCallback(async (categoryId) => {
    try {
      const data = await getCategoryDataById(categoryId);
      setCategory(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (categoryId) {
      getCategoryById(categoryId);
    } else {
      setLoading(false);
    }
  }, [categoryId, getCategoryById]);

  useEffect(() => {
    if (category && categoryId) {
      setCheckEnableUpdateButton(false);
      setCategoryImageURL(category.image);
      setCategoryName(category.name);
      setCategoryType(category.categoryType);
      setDescription(category.description);
      // Load relative categories list
      setRelativeCategories(category.relativeCategories);
      relativeCategories?.forEach((element) => {
        const category = categoriesList.find(
          (category) => category.value === element,
        );
        if (category) {
          selectedCategory.push(category);
        }
      });
    } else if (!category || !categoryId) {
      setCategoryImageURL('');
      setCategoryName('');
      setCategoryType('');
      setDescription('');
      setSelectedCategory([]);
    }
  }, [category, categoryId, categoriesList, relativeCategories]);

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
        relativeCategories: selectedCategory.map((category) => category.value),
        // UpdatedDate: moment().format('YYYY-MM-DD'),
        // UpdatedBy: user.id,
      };
      // call update api and alert
      updateCategoryById(categoryId, updateCategory);
      toast.success(MSG46, { autoClose: 1500 });
    } else {
      const newCategory = {
        name: categoryName,
        description: description,
        categoryType: parseInt(categoryType),
        image: categoryImageURL,
        relativeCategories: selectedCategory.map((category) => category.value),
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

  // Go back to categories list page
  const handleGoBack = () => {
    setTimeout(() => {
      navigate(-1);
    }, 200);
  };

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : (
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
                    <h5 style={{ marginBottom: 20 }}>
                      Chọn ảnh loại hàng {redStart}
                    </h5>
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
                    <Form.Group
                      className="mb-3"
                      controlId="validationCategoryType"
                    >
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

                  <Col md={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="validationDescription"
                    >
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

                  <Col md={12} style={{ marginBottom: 16 }}>
                    <div style={{ marginBottom: 8 }}>Loại hàng liên quan</div>
                    <Select
                      isMulti
                      value={selectedCategory}
                      placeholder="Chọn loại hàng liên quan"
                      options={[
                        { label: 'Select All', value: 'all' },
                        ...categoriesList,
                      ]}
                      components={animatedComponent}
                      isSearchable={true}
                      closeMenuOnSelect={false}
                      isClearable={true}
                      onChange={(e) => {
                        setSelectedCategory(e);
                        setCheckEnableUpdateButton(true);
                      }}
                    />
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
                    <Button
                      variant="primary"
                      className="px-4 mx-2"
                      type="submit"
                    >
                      Thêm
                    </Button>
                  )}
                </div>
              </Form>

              {categoryId ? (
                <Row>
                  <Col
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      variant="outline-secondary"
                      onClick={handleGoBack}
                      style={{ fontSize: '0.8rem' }}
                    >
                      <strong>{`<< Quay lại danh sách loại hàng`}</strong>
                    </Button>
                  </Col>
                </Row>
              ) : (
                <></>
              )}

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
      )}
    </>
  );
};

export default AddEditCategoryForm;
