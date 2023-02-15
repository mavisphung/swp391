import { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {
  Customer,
  emailPattern,
  fullNamePattern,
  inactive,
  phonePattern,
  templateEmailPlaceholder,
} from '~/system/Constants/constants';
import { PROVINCEVN } from '~/system/Constants/provinceVN';
import {
  MSG14,
  MSG15,
  MSG16,
  MSG17,
  MSG18,
  MSG19,
  MSG20,
} from '~/system/Messages/messages';
import CustomModal from '../Modal';
import {
  checkEmailMessage,
  checkFieldIsEmpty,
  checkFullNameMessage,
  checkPhoneNumber,
} from '../Validation';

const userAccount = {
  id: 3,
  fullname: 'Thái Đăng Linh',
  email: 'linhtd@gmail.com.vn',
  gender: true,
  password: 'linhtd123',
  dob: '1995-04-15',
  roleId: '3',
  status: '1',
  phone: '0901565565',
  address: '250 Nguyễn Thị Minh Khai',
  ward: '27139',
  district: '770',
  province: '79',
};

const AddEditAccountForm = () => {
  const { accountId } = useParams();

  let [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [genderBool, setGenderBool] = useState('');
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

  const [isEntered, setIsEntering] = useState(false);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [account, setAccount] = useState({});
  const [emailIsExisted, setEmailIsExisted] = useState(false);
  const [checkEnableUpdateButton, setCheckEnableUpdateButton] = useState(false);

  // Get account by id
  const getAccountById = useCallback(async (accountId) => {
    try {
      const data = userAccount;
      setAccount(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (accountId) {
      getAccountById(accountId);
    }
  }, [accountId, getAccountById]);

  useEffect(() => {
    if (account && accountId) {
      setCheckEnableUpdateButton(false);
      //setEmailIsExisted(false);
      setEmail(account.email);
      setFullName(account.fullname);
      if (account.gender === false) {
        setGender('0'); //Nam
      } else {
        setGender('1'); // Nữ
      }
      setDob(account.dob);
      setPhone(account.phone);
      setAddress(account.address);
      setWard(account.ward);
      setDistrict(account.district);
      setProvince(account.province);
    } else if (!account || !accountId) {
      //setEmailIsExisted(false);
      setEmail('');
      setFullName('');
      setGender('');
      setDob('');
      setPhone('');
      setAddress('');
      setWard('');
      setDistrict('');
      setProvince('');
    }
  }, [accountId, account]);

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

  useEffect(() => {
    if (gender === '0') {
      setGenderBool(false);
    } else if (gender === '1') {
      setGenderBool(true);
    }
  }, [gender]);

  const redStart = accountId ? '' : <span className="text-danger">*</span>;

  const checkAccountIdHad = accountId ? true : false;

  const changeTitle = accountId ? 'Thông tin tài khoản' : 'Thêm tài khoản';

  const changeContentModal = accountId ? MSG20 : MSG19;

  const handleFormFocused = () => setIsEntering(true);

  const handleSetAutoDomain = (e) => {
    if (e.key === '@') {
      email += 'chytech.com.vn';
      setEmail(email);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else if (
      fullNamePattern.test(fullName) &&
      emailPattern.test(email) &&
      phonePattern.test(phone) &&
      emailIsExisted === false
    ) {
      handleShow();
    }
  };

  const handleSubmitSuccess = () => {};

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>{changeTitle}</h2>
      <Col lg={12} className="mt-4">
        {/* <Prompt when={isEntered} message={MSG09} /> */}
        <Card className="border-0 p-4 rounded shadow">
          <Form
            noValidate
            validated={validated}
            onFocus={handleFormFocused}
            onSubmit={handleSubmit}
          >
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="validationEmail">
                  <Form.Label>Email {redStart}</Form.Label>
                  <Form.Control
                    type="email"
                    value={email || ''}
                    placeholder={templateEmailPlaceholder}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={
                      email && (!emailPattern.test(email) || emailIsExisted)
                    }
                    onKeyUp={handleSetAutoDomain}
                    autoComplete="username"
                    maxLength={50}
                    readOnly={checkAccountIdHad}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {checkEmailMessage(email, emailIsExisted)}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <hr />

              <Col md={6}>
                <Form.Group className="mb-3" controlId="validationFullName">
                  <Form.Label>Họ và tên {redStart}</Form.Label>
                  <Form.Control
                    type="text"
                    value={fullName || ''}
                    maxLength={50}
                    onChange={(e) => setFullName(e.target.value)}
                    isInvalid={fullName && !fullNamePattern.test(fullName)}
                    readOnly={checkAccountIdHad}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {checkFullNameMessage(fullName)}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="validationDob">
                  <Form.Label>Ngày sinh {redStart}</Form.Label>
                  <Form.Control
                    type="date"
                    value={dob || ''}
                    min="1960-01-01"
                    max="2000-12-31"
                    onChange={(e) => setDob(e.target.value)}
                    readOnly={accountId ? true : false}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {checkFieldIsEmpty(dob, MSG14)}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="validationGender">
                  <Form.Label>Giới tính {redStart}</Form.Label>
                  <Form.Select
                    aria-label="Chọn giới tính"
                    value={gender || ''}
                    onChange={(e) => setGender(e.target.value)}
                    disabled={checkAccountIdHad}
                    required
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="0">Nam</option>
                    <option value="1">Nữ</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {MSG15}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="validationPhone">
                  <Form.Label>Số điện thoại {redStart}</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength={10}
                    value={phone || ''}
                    onChange={(e) => setPhone(e.target.value)}
                    isInvalid={phone && !phonePattern.test(phone)}
                    readOnly={checkAccountIdHad}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {checkPhoneNumber(phone)}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <hr />

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="validationAddress">
                  <Form.Label>Số nhà, tên đường {redStart}</Form.Label>
                  <Form.Control
                    type="text"
                    value={address || ''}
                    maxLength={100}
                    onChange={(e) => setAddress(e.target.value)}
                    readOnly={checkAccountIdHad}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {checkFieldIsEmpty(address, MSG16)}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="validationProvince">
                  <Form.Label>Tỉnh, thành {redStart}</Form.Label>
                  <Form.Select
                    aria-label="Chọn tỉnh, thành"
                    value={province || ''}
                    onChange={(e) => setProvince(e.target.value)}
                    disabled={checkAccountIdHad}
                    required
                  >
                    <option value="">Chọn tỉnh, thành</option>
                    {listProvince.map((province, index) => (
                      <option key={index} value={province.idProvince}>
                        {province.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {MSG18}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="validationDistrict">
                  <Form.Label>Quận, huyện {redStart}</Form.Label>
                  <Form.Select
                    aria-label="Chọn quận, huyện"
                    value={district || ''}
                    onChange={(e) => setDistrict(e.target.value)}
                    disabled={checkAccountIdHad}
                    required
                  >
                    <option value="">Chọn quận, huyện</option>
                    {listDistrict.map((district, index) => (
                      <option key={index} value={district.idDistrict}>
                        {district.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {MSG18}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="validationWard">
                  <Form.Label>Phường, xã {redStart}</Form.Label>
                  <Form.Select
                    aria-label="Chọn phường, xã"
                    value={ward || ''}
                    onChange={(e) => setWard(e.target.value)}
                    disabled={checkAccountIdHad}
                    required
                  >
                    <option value="">Chọn phường, xã</option>
                    {listCommune.map((commune, index) => (
                      <option key={index} value={commune.idCommune}>
                        {commune.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {MSG17}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end">
              {account.status === inactive ? (
                <></>
              ) : accountId ? (
                account.roleId === Customer ? (
                  <></>
                ) : (
                  <Button
                    variant="primary"
                    className="px-4 mx-2"
                    type="submit"
                    disabled={checkEnableUpdateButton === true ? false : true}
                  >
                    Thay đổi
                  </Button>
                )
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

export default AddEditAccountForm;
