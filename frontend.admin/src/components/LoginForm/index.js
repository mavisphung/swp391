import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import {
  emailPattern,
  templateEmailPlaceholder,
} from '~/system/Constants/constants';
import { checkEmailMessage, checkPasswordMessage } from '../Validation';

const LoginForm = () => {
  let [email, setEmail] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [eye, setEye] = useState(true);
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else if (emailPattern.test(email)) {
      //
    }
  };

  const handleEye = () =>
    passwordType === 'password'
      ? (setPasswordType('text'), setEye(false))
      : (setPasswordType('password'), setEye(true));

  const handleSetAutoDomain = (e) => {
    if (e.key === '@') {
      email += 'chytech.com.vn';
      setEmail(email);
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Card className="p-2 mb-0" style={{ border: '5px solid rgba(0,0,0)' }}>
          <Card.Body>
            <h3 className="text-center">Nhân viên</h3>
            <Form.Group className="mb-3" controlId="validationEmail">
              <Form.Label>
                <strong>Email</strong> <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup style={{ paddingRight: 44 }}>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder={templateEmailPlaceholder}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={handleSetAutoDomain}
                  isInvalid={email && !emailPattern.test(email)}
                  autoFocus
                  required
                  style={{ borderRadius: 5 }}
                />
                <Form.Control.Feedback type="invalid">
                  {checkEmailMessage(email)}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationPassword">
              <Form.Label>
                <strong>Mật khẩu</strong> <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={passwordType}
                  value={password}
                  minLength={6}
                  maxLength={20}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="password"
                  required
                  style={{ borderRadius: 5 }}
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
                  {checkPasswordMessage(password)}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Row>
              <Col className="text-end">
                <Button
                  variant="primary"
                  className="px-4 mx-2 my-2"
                  type="submit"
                  style={{ backgroundColor: 'black' }}
                >
                  Đăng nhập
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
};

export default LoginForm;
