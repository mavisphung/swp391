import { useState } from 'react';
import { Form, Card, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useUserAuth } from '~/context/UserAuthContext';
import { MSG24 } from '~/system/Messages/messages';
import CustomModal from '../Modal';
import {
  checkConfirmNewPasswordMessage,
  checkNewPasswordMessage,
  checkPasswordMessage,
} from '../Validation';
import '../../styles/Component/input-field.scss';

const ChangePasswordForm = () => {
  const { getCurrentUser } = useUserAuth();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [isEntered, setIsEntering] = useState(false);
  const [validated, setValidated] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [newPasswordType, setNewPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [eye, setEye] = useState(true);
  const [eyeNew, setEyeNew] = useState(true);
  const [eyeConfirm, setEyeConfirm] = useState(true);
  const [show, setShow] = useState(false);
  const [currentPasswordIsNotMatch, setCurrentPasswordIsNotMatch] =
    useState(false);
  const [checkEnableUpdateButton, setCheckEnableUpdateButton] = useState(false);

  // Get current user
  const user = getCurrentUser();

  // Manage modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Manage Form
  const handleFormFocused = () => setIsEntering(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
    } else if (
      newPassword !== oldPassword ||
      newPassword === confirmNewPassword
    ) {
      handleShow();
    }
  };

  const handleSubmitSuccess = async () => {
    const updatedPassword = {
      accountId: user.id,
      currentPassword: oldPassword,
      newPassword,
    };
    // Call api updatePassword
    setIsEntering(false);
    setShow(false);
  };

  const handleEye = () =>
    passwordType === 'password'
      ? (setPasswordType('text'), setEye(false))
      : (setPasswordType('password'), setEye(true));
  const handleEyeNew = () =>
    newPasswordType === 'password'
      ? (setNewPasswordType('text'), setEyeNew(false))
      : (setNewPasswordType('password'), setEyeNew(true));
  const handleEyeConfirm = () =>
    confirmPasswordType === 'password'
      ? (setConfirmPasswordType('text'), setEyeConfirm(false))
      : (setConfirmPasswordType('password'), setEyeConfirm(true));

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onFocus={handleFormFocused}
        onSubmit={handleSubmit}
      >
        <Card>
          <Card.Body>
            <Form.Group className="mb-4" controlId="validationOldPassword">
              <Form.Label>
                Mật khẩu hiện tại <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={passwordType}
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                    if (e.target.value === '') {
                      setCurrentPasswordIsNotMatch(false);
                    }
                    setCheckEnableUpdateButton(true);
                  }}
                  minLength={6}
                  maxLength={20}
                  autoComplete="current-password"
                  isInvalid={oldPassword && currentPasswordIsNotMatch}
                  required
                />
                <div className="c-input-group-append">
                  <InputGroup.Text>
                    <FontAwesomeIcon
                      onClick={handleEye}
                      icon={eye ? faEyeSlash : faEye}
                    />
                  </InputGroup.Text>
                </div>
                <Form.Control.Feedback type="invalid">
                  {checkPasswordMessage(oldPassword, currentPasswordIsNotMatch)}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-4" controlId="validationNewPassword">
              <Form.Label>
                Mật khẩu mới <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={newPasswordType}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setCheckEnableUpdateButton(true);
                  }}
                  minLength={6}
                  maxLength={20}
                  autoComplete="new-password"
                  isInvalid={newPassword && oldPassword === newPassword}
                  required
                />
                <div className="c-input-group-append">
                  <InputGroup.Text>
                    <FontAwesomeIcon
                      onClick={handleEyeNew}
                      icon={eyeNew ? faEyeSlash : faEye}
                    />
                  </InputGroup.Text>
                </div>
                <Form.Control.Feedback type="invalid">
                  {checkNewPasswordMessage(oldPassword, newPassword)}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group
              className="mb-4"
              controlId="validationConfirmNewPassword"
            >
              <Form.Label>
                Nhập lại mật khẩu mới <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={confirmPasswordType}
                  value={confirmNewPassword}
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value);
                    setCheckEnableUpdateButton(true);
                  }}
                  minLength={6}
                  maxLength={20}
                  isInvalid={
                    confirmNewPassword && newPassword !== confirmNewPassword
                  }
                  autoComplete="new-password"
                  required
                />
                <div className="c-input-group-append">
                  <InputGroup.Text>
                    <FontAwesomeIcon
                      onClick={handleEyeConfirm}
                      icon={eyeConfirm ? faEyeSlash : faEye}
                    />
                  </InputGroup.Text>
                </div>
                <Form.Control.Feedback type="invalid">
                  {checkConfirmNewPasswordMessage(
                    newPassword,
                    confirmNewPassword,
                  )}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Row>
              <Col className="text-end">
                <Button
                  variant="primary"
                  size="md"
                  className="px-4 mx-2"
                  type="submit"
                  disabled={checkEnableUpdateButton === true ? false : true}
                >
                  Thay đổi
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <CustomModal
          show={show}
          title="Thay đổi mật khẩu"
          body={MSG24}
          handleClose={handleClose}
          handleSubmit={handleSubmitSuccess}
        />
      </Form>
    </>
  );
};

export default ChangePasswordForm;
