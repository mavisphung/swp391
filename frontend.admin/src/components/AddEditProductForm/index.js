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
  MSG15,
  MSG29,
  MSG35,
  MSG36,
  MSG37,
  MSG39,
  MSG40,
  MSG41,
  MSG49,
  MSG50,
  MSG51,
  MSG57,
} from '~/system/Messages/messages';
import {
  checkBirdAge,
  checkFieldIsEmpty,
  checkProductPrice,
  checkProductQuantity,
} from '../Validation';
import CustomModal from '../Modal';

import '../AddEditAccountForm/AddEditAccountForm.scss';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '~/firebase';
import { Carousel } from 'antd';
import { toast } from 'react-toastify';
import { categoriesTypesList } from '~/system/Data/types';
import {
  birdAgePattern,
  jpeg,
  jpg,
  mov,
  mp4,
  png,
} from '~/system/Constants/constants';
import { getCategoriesListData } from '~/api/categories';
import {
  addNewProduct,
  getProductDetailsById,
  updateProductById,
} from '~/api/products';
import { viewProductsList } from '~/system/Constants/LinkURL';
import CustomSpinner from '~/ui/CustomSpinner';

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
    id: true,
    name: 'Chim trống',
  },
  {
    id: false,
    name: 'Chim mái',
  },
];

const contentStyle = {
  color: '#fff',
  textAlign: 'center',
  height: 300,
  background: '#364d79',
};

const AddEditProductForm = () => {
  let navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState([]);
  const [imagesList, setImagesList] = useState([]);
  const [urls, setUrls] = useState([]);
  const [productVideoURL, setProductVideoURL] = useState('');
  const [productName, setProductName] = useState('');
  const [productCategories, setProductCategories] = useState([]);
  const [productSubCategories, setProductSubCategories] = useState([]);
  const [productCategory, setProductCategory] = useState('1'); // Main category
  const [productCategoryId, setProductCategoryId] = useState(''); // Sub Category
  const [shortDescriptionList, setShortDescriptionList] = useState([]);
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [gendersList, setGendersList] = useState([]);
  const [sellMethod, setSellMethod] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const [isEntered, setIsEntering] = useState(false);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [checkEnableUpdateButton, setCheckEnableUpdateButton] = useState(false);
  const [loading, setLoading] = useState(true);

  //Get product by id
  const getProductById = useCallback(async (productId) => {
    try {
      console.log('Run get...');
      const data = await getProductDetailsById(productId);
      setProduct(data);
      console.log('Product:', product);

      // setRelativeProducts(product?.relativeProducts);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (productId) {
      getProductById(productId);
    } else {
      setLoading(false);
    }
  }, [getProductById, productId]);

  useEffect(() => {
    if (product && productId) {
      setCheckEnableUpdateButton(false);
      setProductName(product.name);
      setProductCategory(String(product.categoryType));
      setProductCategoryId(product.categoryId);
      setDescription(product.description);
      if (product.categoryType === 1 && product.age) {
        setSellMethod('1');
        setGender(product.gender);
        setAge(product.age);
      } else if (product.categoryType === 1 && !product.age) {
        setSellMethod('2');
      }
      setShortDescription(product.shortDescription);
      setQuantity(String(product.quantity));
      setProductPrice(String(product.price));

      setImagesList(
        product?.medias?.filter((media) => {
          if (media.type === png || media.type === jpeg || media.type === jpg)
            return media.url;
        }),
      );
      setUrls(imagesList?.map((url) => url.url));

      setProductVideoURL(
        product?.medias?.find(
          (media) => media.type === mp4 || media.type === mov,
        )?.url,
      );
    } else if (!product || !productId) {
      setProductName('');
      setProductCategory('');
      setProductCategoryId('');
      setDescription('');
      setShortDescription('');
      setQuantity('');
      setProductPrice('');
      setProductVideoURL('');
      setUrls([]);
    }
  }, [product, productId]);

  // Get product categories list
  const getProductCategories = useCallback(async () => {
    try {
      const data = categoriesTypesList;
      setProductCategories(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getProductCategories();
  }, [getProductCategories]);

  // Get product sub categories list
  const getSubProductCategories = useCallback(async (productCategory) => {
    try {
      const data = await getCategoriesListData(
        1,
        100,
        '',
        parseInt(productCategory),
      );
      setProductSubCategories(data.data.map((category) => category));
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getSubProductCategories(productCategory);
  }, [getSubProductCategories, productCategory]);

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

  // Manage upload image action
  const handleChangeProductImage = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        setProductImages((prevState) => [...prevState, e.target.files[i]]);
      }
    }
  };

  const handleUploadImage = () => {
    const promises = [];
    productImages.map((image) => {
      const storageRef = ref(storage, `productImages/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      promises.push(uploadTask);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrls((prevState) => [...prevState, downloadURL]);
          });
          setProgress(false);
        },
      );
      return urls;
    });

    Promise.all(promises)
      .then(() => toast.success('Hình ảnh đã dược tải lên', { autoClose: 500 }))
      .catch((err) => console.log(err));
  };

  // Manage upload video
  const handleChangeProductVideo = (e) => {
    if (e.target.value.includes('youtube')) {
      var url = e.target.value.replace('watch?v=', 'embed/');
    }
    setProductVideoURL(url);
  };

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

  const handleSubmitSuccess = () => {
    if (productId) {
      console.log('Update action');
      const updateData = {
        ...product,
        name: productName,
        description: description,
        price: parseInt(productPrice),
        quantity: parseInt(quantity),
        gender: gender === '' ? null : gender === 'true' ? true : false,
        shortDescription: shortDescription,
        age: age,
        categoryId: parseInt(productCategoryId),
        // categoryType: productCategory,
      };
      console.log('updateData', updateData);
      console.log('Not yet update media !!!');
      // Call api
      updateProductById(productId, updateData);
      toast.success(MSG36, { autoClose: 1500 });

      setTimeout(() => navigate(-1), 800);
    } else {
      for (let i = 0; i < productImages.length; i++) {
        if (urls[i] && productImages[i]) {
          let imageItem = {
            url: urls[i],
            type: handleProcessImageType(
              productImages[i]?.type.replace('image/', ''),
            ),
          };
          imagesList.push(imageItem);
        }
      }

      const createData = {
        name: productName,
        medias: [{ url: productVideoURL, type: 5 }].concat(
          getUnique(imagesList, 'url'),
        ),
        description: description,
        price: parseInt(productPrice),
        quantity: parseInt(quantity),
        gender: gender === '' ? null : gender === 'true' ? true : false,
        shortDescription: shortDescription,
        age: age,
        categoryId: parseInt(productCategoryId),
        // categoryType: productCategory,
      };
      console.log('createData', createData);
      // Call api
      addNewProduct(createData);
      toast.success(MSG36, { autoClose: 1500 });

      setTimeout(
        () =>
          navigate({
            pathname: `/dashboard/${viewProductsList}`,
          }),
        800,
      );
    }
  };

  // Xóa giá trị trùng lặp
  function getUnique(arr, comp) {
    const unique = arr
      .map((e) => e[comp])
      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the false indexes & return unique objects
      .filter((e) => arr[e])
      .map((e) => arr[e]);

    return unique;
  }

  // Chuyển kiểu media sang id
  const handleProcessImageType = (type) => {
    if (type === 'png') {
      return 0;
    } else if (type === 'jpeg') {
      return 1;
    } else if (type === 'jpg') {
      return 2;
    }
  };

  // Reset tất cả field khi đổi phân loại chính
  const handleResetField = () => {
    setProductName('');
    setProductCategoryId('');
    setSellMethod('');
    setGender('');
    setAge('');
    setShortDescription('');
    setDescription('');
    setQuantity('');
    setProductPrice('');
  };

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : (
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
                  <Col md={6}>
                    <Row>
                      <Col className="align-items-center">
                        <h5>Chọn ảnh sản phẩm {redStart}</h5>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Carousel autoplay>
                          {urls
                            ? urls.map((imageUrl, index) => {
                                return (
                                  <div key={index}>
                                    <h3 style={contentStyle}>
                                      <Image
                                        src={imageUrl}
                                        style={{
                                          width: '100%',
                                          height: 'auto',
                                        }}
                                        alt="Ảnh"
                                      />
                                    </h3>
                                  </div>
                                );
                              })
                            : ''}
                        </Carousel>
                      </Col>
                    </Row>

                    <Row className="justify-content-center">
                      <Col md={3}>
                        {showProgress && (
                          <ProgressBar
                            variant="info"
                            now={progress}
                            max={100}
                          />
                        )}
                      </Col>
                    </Row>

                    <Form.Group controlId="validationImage">
                      <Row className="align-items-center">
                        <Col className="product-image-file-content">
                          <Form.Control
                            width={50}
                            type="file"
                            multiple={true}
                            onChange={handleChangeProductImage}
                            accept="image/*"
                            className="product-image-file-input"
                            required={productId ? false : true}
                          />
                          <Button
                            variant="primary"
                            onClick={handleUploadImage}
                            disabled={productImages ? false : true}
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
                  </Col>

                  {/* Chọn video cho sản phẩm */}
                  <Col md={6}>
                    <Row>
                      <Col className="align-items-center">
                        <h5>Chọn video giới thiệu {redStart}</h5>
                      </Col>
                    </Row>
                    {productVideoURL && (
                      <Row>
                        <Col className="align-items-center">
                          <div
                            style={{
                              textAlign: 'center',
                            }}
                          >
                            <iframe
                              title="chim chao mao"
                              width="500"
                              height="300"
                              allowFullScreen={true}
                              src={productVideoURL || ''}
                            ></iframe>
                          </div>
                        </Col>
                      </Row>
                    )}

                    <Form.Group controlId="validationVideo">
                      <Row className="align-items-center">
                        <Col className="product-image-file-content">
                          <Form.Control
                            width={200}
                            type="url"
                            placeholder="Thêm link video giới thiệu"
                            onChange={handleChangeProductVideo}
                            accept="video/*"
                            required={productId ? false : true}
                          />
                          <Form.Control.Feedback
                            type="invalid"
                            className="product-image-invalid"
                          >
                            {MSG49}
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
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
                        handleResetField();
                        setCheckEnableUpdateButton(true);
                      }}
                      aria-label="Chọn loại sản phẩm"
                      disabled={productId ? true : false}
                      required
                    >
                      {productCategories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {productCategory === '1' ? (
                  // <RenderBirdFields />
                  <Row>
                    <Col md={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="validationProductName"
                      >
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

                    <Col md={3}>
                      <Form.Group
                        className="mb-3"
                        controlId="validationProductSubCategory"
                      >
                        <Form.Label>Loại chim {redStart}</Form.Label>
                        <Form.Select
                          value={productCategoryId}
                          onChange={(e) => {
                            setProductCategoryId(e.target.value);
                            setCheckEnableUpdateButton(true);
                          }}
                          aria-label="Chọn loại chim"
                          required
                        >
                          <option value="">Chọn loại chim</option>
                          {productSubCategories.map((type, index) => (
                            <option key={index} value={type.id}>
                              {type.name}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {MSG40}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={3}>
                      <Form.Group
                        className="mb-3"
                        controlId="validationProductSellMethod"
                      >
                        <Form.Label>Cách bán {redStart}</Form.Label>
                        <Form.Select
                          value={sellMethod}
                          onChange={(e) => {
                            setSellMethod(e.target.value);
                            setCheckEnableUpdateButton(true);
                          }}
                          aria-label="Chọn cách bán"
                          required
                        >
                          <option value="">Chọn cách bán</option>
                          <option value="1">Chim tuyển</option>
                          <option value="2">Bắt lồng</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {MSG50}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {gender !== '' || sellMethod === '1' ? (
                      // <RenderFieldBySellMethod />
                      <>
                        <Col md={4}>
                          <Form.Group
                            className="mb-3"
                            controlId="validationProductGender"
                          >
                            <Form.Label>Giới tính {redStart}</Form.Label>
                            <Form.Select
                              value={gender}
                              onChange={(e) => {
                                setGender(e.target.value);
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
                              {MSG15}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col md={4}>
                          <Form.Group
                            className="mb-3"
                            controlId="validationProductAge"
                          >
                            <Form.Label>Tuổi {redStart}</Form.Label>
                            <Form.Control
                              type="text"
                              maxLength={100}
                              value={age}
                              isInvalid={age && !birdAgePattern.test(age)}
                              onChange={(e) => {
                                setAge(e.target.value);
                                setCheckEnableUpdateButton(true);
                              }}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {checkBirdAge(age)}
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
                              {shortDescriptionList.map(
                                (shortDescription, index) => (
                                  <option
                                    key={index}
                                    value={shortDescription.name}
                                  >
                                    {shortDescription.name}
                                  </option>
                                ),
                              )}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {MSG51}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </>
                    ) : (
                      <></>
                    )}
                  </Row>
                ) : (
                  // <RenderProductFields />
                  <Row>
                    <Col md={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="validationProductName"
                      >
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
                        <Form.Label>Phân loại {redStart}</Form.Label>
                        <Form.Select
                          value={productCategoryId}
                          onChange={(e) => {
                            setProductCategoryId(e.target.value);
                            setCheckEnableUpdateButton(true);
                          }}
                          aria-label="Chọn loại sản phẩm"
                          required
                        >
                          <option value="">Chọn loại sản phẩm</option>
                          {productSubCategories.map((type, index) => (
                            <option key={index} value={type.id}>
                              {type.name}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {MSG40}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group
                        className="mb-3"
                        controlId="validationOtherProductShortDescription"
                      >
                        <Form.Label>Mô tả ngắn {redStart}</Form.Label>
                        <Form.Control
                          type="text"
                          maxLength={100}
                          value={shortDescription}
                          onChange={(e) => {
                            setShortDescription(e.target.value);
                            setCheckEnableUpdateButton(true);
                          }}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {checkFieldIsEmpty(shortDescription, MSG29)}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                )}

                <Row>
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
                        {checkFieldIsEmpty(description, MSG41)}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="validationProductQuantity"
                    >
                      <Form.Label>Số lượng {redStart}</Form.Label>
                      <Form.Control
                        type="number"
                        value={quantity}
                        isInvalid={quantity && parseInt(quantity) <= 0}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                          setCheckEnableUpdateButton(true);
                        }}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {checkProductQuantity(quantity)}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="validationProductPrice"
                    >
                      <Form.Label>Giá thành {redStart}</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        step="1000"
                        value={productPrice}
                        isInvalid={productPrice && parseInt(productPrice) <= 0}
                        onChange={(e) => {
                          setProductPrice(e.target.value);
                          setCheckEnableUpdateButton(true);
                        }}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {checkProductPrice(productPrice)}
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
                    <Button
                      variant="primary"
                      className="px-4 mx-2"
                      type="submit"
                    >
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
      )}
    </>
  );
};

export default AddEditProductForm;
