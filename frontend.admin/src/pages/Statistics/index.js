import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Spin, Upload } from 'antd';
import {
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';
import { toast } from 'react-toastify';
import CustomModal from '~/components/Modal';
import { storage } from '~/firebase';

function Statistics() {
  const [fileList, setFileList] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [show, setShow] = useState(false);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);

  const fileListData = [
    {
      uid: '0',
      name: 'sample-loading.png',
      status: 'uploading',
      percent: 33,
    },
    {
      uid: '-1',
      name: 'sample-bird.png',
      status: 'done',
      url: 'https://thanhphochomeo.b-cdn.net/wp-content/uploads/2019/12/chich-cheo-lua-2.png',
      thumbUrl:
        'https://thanhphochomeo.b-cdn.net/wp-content/uploads/2019/12/chich-cheo-lua-2.png',
    },
    {
      uid: '-2',
      name: 'sample-error.png',
      status: 'error',
    },
  ];

  // Manage upload image action
  const handleChangeProductImage = (file) => {
    if (file) {
      setProductImages((prevState) => [...prevState, file]);
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
          let type = await getMetadata(uploadTask.snapshot.ref);
          let url = await getDownloadURL(uploadTask.snapshot.ref);
          setUrls((prevState) => [
            ...prevState,
            { url: url, type: type.contentType },
          ]);
          setProgress(false);
        },
      );
      return urls;
    });

    Promise.all(promises)
      .then(() => toast.success('Hình ảnh đã dược tải lên', { autoClose: 500 }))
      .catch((err) => console.log(err));

    setShow(false);
  };

  console.log('urls: ', urls);

  const handleOpenImageModal = () => {
    setShow(true);
    setFileList(fileListData);
    setProductImages([]);
  };

  const handleCloseImageModal = () => {
    setShow(false);
    setFileList([]);
    setProductImages([]);
  };

  return (
    <>
      <h2>Statistics Page</h2>
      {/* <Button
        variant="primary"
        onClick={handleUploadImage}
        disabled={productImages ? false : true}
      >
        Tải ảnh lên
      </Button> */}
      <Button variant="primary" onClick={handleOpenImageModal}>
        Chỉnh sửa danh sách ảnh
      </Button>
      <div style={{ width: '50%' }}>
        <CustomModal
          show={show}
          title={'Image list - Xem log'}
          body={
            <>
              <Upload.Dragger
                multiple
                //action={'http://localhost:3001/dashboard/statistics'}
                listType="picture"
                accept=".png,.jpg,.jpeg"
                showUploadList={{ showRemoveIcon: true }}
                defaultFileList={[...fileList]}
                beforeUpload={(file) => {
                  console.log(productImages);
                  handleChangeProductImage(file);
                  return false;
                }}
                iconRender={() => {
                  return <Spin></Spin>;
                }}
                progress={{
                  strokeWidth: 3,
                  strokeColor: {
                    '0%': '#f2635f',
                    '100%': '#55d983',
                  },
                  style: { top: 10 },
                }}
              >
                <Button>
                  <FontAwesomeIcon
                    icon={faUpload}
                    style={{ marginRight: 10 }}
                  />{' '}
                  Upload
                </Button>
              </Upload.Dragger>
            </>
          }
          handleClose={handleCloseImageModal}
          handleSubmit={handleUploadImage}
        />
      </div>
    </>
  );
}

export default Statistics;
