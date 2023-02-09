import { useCallback, useEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  ProgressBar,
  Image,
} from 'react-bootstrap';
import { storage } from '~/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { useUserAuth } from '~/context/UserAuthContext';
import { fullNamePattern, phonePattern } from '~/system/Constants/constants';
import { checkFullNameMessage, checkPhoneNumber } from '../Validation';
import CustomModal from '../Modal';
import { PROVINCEVN } from '~/system/Constants/provinceVN';
import '../AddEditAccountForm/AddEditAccountForm.scss';

const userAccount = {
  id: 1,
  avatar:
    'https://firebasestorage.googleapis.com/v0/b/bird-shop-22ade.appspot.com/o/accountImages%2FPokemon.png?alt=media&token=152ef9eb-3ad9-42c1-9101-6767c505eb39',
  fullname: 'Bao Khang',
  email: 'admin@chytech.com.vn',
  gender: false,
  password: 'admin123',
  dob: '1998-07-07',
  role: {
    roleId: 'admin',
    name: 'Quản trị viên',
  },
  status: '1',
  phone: '0123123123',
  address: '250 Nguyễn Thị Minh Khai',
  ward: '27139',
  district: '770',
  province: '79',
};

const AccountProfileForm = () => {
  const { getCurrentUser } = useUserAuth();
  const [user, setUser] = useState({});

  const [avatar, setAvatar] = useState(null);
  let [email, setEmail] = useState('');
  const [avatarURL, setAvatarURL] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState({});
  const [genderBool, setGenderBool] = useState('0');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [listCommune, setListCommune] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [communeObj, setCommuneObj] = useState({});
  const [districtObj, setDistrictObj] = useState({});
  const [provinceObj, setProvinceObj] = useState({});

  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [isEntered, setIsEntering] = useState(false);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [checkEnableUpdateButton, setCheckEnableUpdateButton] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Get current user
  const currentUser = getCurrentUser();

  // Get account profile by email
  const getAccountProfileByEmail = useCallback(async () => {
    try {
      const data = userAccount;
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }, [currentUser.email]);

  useEffect(() => {
    getAccountProfileByEmail();
  }, [getAccountProfileByEmail]);

  useEffect(() => {
    if (user) {
      //const date = moment(user.dob, defaultDBDateFormatter).format(dateConvert);
      setCheckEnableUpdateButton(false);
      setAvatarURL(user.avatar);
      setEmail(user.email);
      setFullName(user.fullname);
      setRole(user.role);
      if (user.gender === false) {
        setGender('0'); //Nam
      } else {
        setGender('1'); // Nữ
      }
      setDob(user.dob);
      setPhone(user.phone);
      setAddress(user.address);
      setWard(user.ward);
      setDistrict(user.district);
      setProvince(user.province);
    }
  }, [user]);

  // Get Address Data
  useEffect(() => {
    setListProvince(PROVINCEVN.province.map((item) => item));
  }, []);

  useEffect(() => {
    setListDistrict(
      PROVINCEVN.district.filter((item) => item.idProvince === province),
    );
  }, [province]);

  useEffect(() => {
    setListCommune(
      PROVINCEVN.commune.filter((item) => item.idDistrict === district),
    );
  }, [district]);

  useEffect(() => {
    setCommuneObj(listCommune.find((commune) => commune.idCommune === ward));
    setDistrictObj(listDistrict.find((item) => item.idDistrict === district));
    setProvinceObj(listProvince.find((item) => item.idProvince === province));
  }, [ward, district, province, listCommune, listDistrict, listProvince]);

  // Manage profile picture
  const handleChangeAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
    setCheckEnableUpdateButton(true);
  };

  const handleUploadImage = () => {
    const storageRef = ref(storage, `accountImages/${avatar.name}`);
    const uploadTask = uploadBytesResumable(storageRef, avatar);
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
          setAvatarURL(downloadURL);
        });
        setShowProgress(false);
      },
    );
  };

  // Manage form
  const handleFormFocused = () => setIsEntering(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmitSuccess = () => {
    const updateTheAccount = {
      ...user,
      avatar: avatarURL,
      email,
      fullname: fullName,
      gender: genderBool,
      dob,
      phone,
      address,
      ward: communeObj.idCommune,
      district: districtObj.idDistrict,
    };
    setShow(false);
    setCheckEnableUpdateButton(false);
    setIsEntering(false);
  };

  return (
    <>
      <Card className="border-0 p-4 rounded shadow">
        <Form
          noValidate
          validated={validated}
          onFocus={handleFormFocused}
          onSubmit={handleSubmit}
        >
          <Row>
            <Col className="align-items-center">
              <h5>Cập nhật ảnh đại diện</h5>
            </Col>
          </Row>
          {avatarURL && (
            <Row>
              <Col className="align-items-center">
                <Image
                  className="account-image-file"
                  src={avatarURL}
                  alt={fullName}
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
              <Col className="account-image-file-content">
                <Form.Control
                  width={50}
                  type="file"
                  onChange={handleChangeAvatar}
                  accept="image/*"
                  className="account-image-file-input"
                />
                <Button
                  variant="primary"
                  onClick={handleUploadImage}
                  disabled={avatar ? false : true}
                >
                  Tải ảnh lên
                </Button>
              </Col>
            </Row>
          </Form.Group>

          <hr />

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Họ và tên </Form.Label>
                <Form.Control
                  type="text"
                  value={fullName || ''}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setCheckEnableUpdateButton(true);
                  }}
                  isInvalid={fullName && !fullNamePattern.test(fullName)}
                />
                <Form.Control.Feedback type="invalid">
                  {checkFullNameMessage(fullName)}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Vai trò</Form.Label>
                <Form.Control type="text" value={role?.name || ''} readOnly />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email || ''} readOnly />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control
                  type="date"
                  value={dob || ''}
                  min="1960-01-01"
                  max="2000-12-31"
                  onChange={(e) => {
                    setDob(e.target.value);
                    setCheckEnableUpdateButton(true);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Giới tính</Form.Label>
                <Form.Select
                  aria-label="Chọn giới tính"
                  value={gender || ''}
                  onChange={(e) => {
                    setGender(e.target.value);
                    setCheckEnableUpdateButton(true);
                  }}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="0">Nam</option>
                  <option value="1">Nữ</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  maxLength={10}
                  value={phone || ''}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setCheckEnableUpdateButton(true);
                  }}
                  isInvalid={phone && !phonePattern.test(phone)}
                />
                <Form.Control.Feedback type="invalid">
                  {checkPhoneNumber(phone)}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Số nhà, tên đường </Form.Label>
                <Form.Control
                  type="text"
                  value={address || ''}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setCheckEnableUpdateButton(true);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Tỉnh, thành</Form.Label>
                <Form.Select
                  aria-label="Chọn tỉnh, thành"
                  value={province || ''}
                  onChange={(e) => {
                    setProvince(e.target.value);
                    setCheckEnableUpdateButton(true);
                  }}
                >
                  <option value="">Chọn tỉnh, thành</option>
                  {listProvince.map((province, index) => (
                    <option key={index} value={province.idProvince}>
                      {province.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Quận, huyện </Form.Label>
                <Form.Select
                  aria-label="Chọn quận huyện"
                  value={district || ''}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                    setCheckEnableUpdateButton(true);
                  }}
                >
                  <option value="">Chọn quận huyện</option>
                  {listDistrict.map((district, index) => (
                    <option key={index} value={district.idDistrict}>
                      {district.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Phường, xã </Form.Label>
                <Form.Select
                  aria-label="Chọn phường xã"
                  value={ward || ''}
                  onChange={(e) => {
                    setWard(e.target.value);
                    setCheckEnableUpdateButton(true);
                  }}
                >
                  <option value="">Chọn phường xã</option>
                  {listCommune.map((commune, index) => (
                    <option key={index} value={commune.idCommune}>
                      {commune.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="text-end">
            <Button
              variant="primary"
              className="px-4 mx-2"
              type="submit"
              disabled={checkEnableUpdateButton ? false : true}
            >
              Thay đổi
            </Button>
          </div>
        </Form>
        <CustomModal
          show={show}
          title="Thay đổi thông tin tài khoản"
          body={'MSG05'}
          handleClose={handleClose}
          handleSubmit={handleSubmitSuccess}
        />
      </Card>
    </>
  );
};

export default AccountProfileForm;
