import { useEffect, useState } from "react";
import { Button, Col, Form, Image, ProgressBar, Row } from "react-bootstrap";

import "./ProfileDetailsLayout.scss";
import { useUserAuth } from "~/context/UserAuthContext";
import { checkEmail, checkFieldIsEmpty } from "~/common/Validation";

function ProfileDetails() {
  const { getUser } = useUserAuth();
  const user = getUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [validated, setValidated] = useState(true);

  useEffect(() => {
    if (user) {
      setName(user.fullname);
      setEmail(user.email);
      setAvatar(user.avatar);
    }
  }, [user]);

  const requiredMark = <span style={{ color: "red" }}>*</span>;

  const handleChangeAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
    // setCheckEnableUpdateButton(true);
  };

  // const handleUploadImage = () => {
  //   const storageRef = ref(storage, `accountImages/${avatar.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, avatar);
  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot) => {
  //       const progress = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
  //       );
  //       setProgress(progress);
  //       setShowProgress(true);

  //       switch (snapshot.state) {
  //         case 'paused':
  //           console.log('Upload is pause');
  //           break;
  //         case 'running':
  //           console.log('Upload is running');
  //           break;
  //         default:
  //           break;
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setAvatarURL(downloadURL);
  //       });
  //       setShowProgress(false);
  //     },
  //   );
  // };

  return (
    <>
      <Form
        noValidate
        // onSubmit={handleSubmit}
        className="form-input-2"
        validated={validated}
      >
        <Row>
          <Col className="align-items-center">
            <span style={{ fontSize: "16px" }}>Cập nhật ảnh đại diện</span>
          </Col>
        </Row>
        {avatar && (
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Image
                className="account-image-file"
                src={avatar}
                alt="User avatar"
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
          <Row>
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
                // onClick={handleUploadImage}
                disabled={avatar ? false : true}
              >
                Tải ảnh lên
              </Button>
            </Col>
          </Row>
        </Form.Group>

        <hr />

        <Row>
          <Col lg={6}>
            <Form.Group controlId="ProfileValidationName">
              <Form.Label>Họ tên {requiredMark}</Form.Label>
              <Form.Control
                type="text"
                value={name}
                autoFocus
                onChange={(e) => setName(e.target.value)}
                placeholder="Vui lòng nhập họ tên"
                required
              />
              <Form.Control.Feedback type="invalid">
                {checkFieldIsEmpty(name, "Họ tên không được để trống")}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group controlId="ProfileValidationEmail">
              <Form.Label>Email {requiredMark}</Form.Label>
              <Form.Control
                type="email"
                value={email}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Vui lòng nhập email"
                required
              />
              <Form.Control.Feedback type="invalid">
                {checkEmail(email)}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default ProfileDetails;
