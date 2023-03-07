import { async } from '@firebase/util';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Carousel, Spin, Upload } from 'antd';
import {
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import CustomModal from '~/components/Modal';
import { storage } from '~/firebase';

const contentStyle = {
  color: '#fff',
  textAlign: 'center',
  height: 300,
  background: '#364d79',
};

function MultipleImages() {
  const [fileList, setFileList] = useState([]);
  const [backupFileList, setbackupFileList] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [show, setShow] = useState(false);
  const [urls, setUrls] = useState([
    {
      type: 'image/jpeg',
      url: 'https://firebasestorage.googleapis.com/v0/b/bird-shop-22ade.appspot.com/o/productImages%2Fsinging-birds-banner-abstract-folk-bird-sitting-on-rope-isolated-decorative-animal-vector-element-2H48K82.jpg?alt=media&token=5ced7242-8cdb-4f09-af33-85a0c5b04976',
    },
  ]);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(1);
  const [fileListData, setFileListData] = useState([]);

  useEffect(() => {
    const promises = [];
    if (urls) {
      console.log('Go here...');
      urls.map(async (file) => {
        var name = file.url.substring(
          file.url.indexOf('%2F') + 3,
          file.url.lastIndexOf('?alt='),
        );

        getMetadata(ref(storage, `productImages/${name}`)).then((data) => {
          console.log('Data: ', data);
          data.contentType = 'image/jpeg';
          promises.push(data);
        });
      });

      Promise.all(promises).then(() => {
        console.log('promises: ', promises);
        setFileListData(promises);
      });
    }
  }, [urls]);

  // Manage upload image action
  const handleChangeProductImage = () => {
    console.log(fileListData);
    setUrls([]); // Reset urls list
    console.log('fileList: ', fileList);
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i]) {
        setProductImages((prevState) => [...prevState, fileList[i]]);
      }
    }
    setShow(false);
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
  };

  console.log('urls: ', urls);

  const handleOpenImageModal = () => {
    setShow(true);
    if (count === 1) {
      setFileList(fileListData);
      setCount(0);
    } else {
      setFileList(backupFileList);
    }
    setProductImages([]);
  };

  const handleCloseImageModal = () => {
    setShow(false);
    setProductImages([]);
  };

  return (
    <>
      <h2>MultipleImages Page</h2>
      <Card>
        <Row>
          <Col md={12}>
            <Carousel autoplay>
              {urls
                ? urls.map((imageUrl, index) => {
                    return (
                      <div key={index}>
                        <h3 style={contentStyle}>
                          <Image
                            src={imageUrl.url}
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
      </Card>

      <Button
        variant="primary"
        onClick={handleUploadImage}
        disabled={productImages ? false : true}
      >
        Tải ảnh lên
      </Button>
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
                listType="picture"
                accept=".png,.jpg,.jpeg"
                showUploadList={{ showRemoveIcon: true }}
                defaultFileList={[...fileList]}
                beforeUpload={(file) => {
                  setbackupFileList((prevState) => [
                    ...prevState,
                    Object(file),
                  ]);

                  setFileList((prevState) => [...prevState, Object(file)]);
                  return false;
                }}
                onRemove={(file) => {
                  const index = backupFileList.findIndex(
                    (selectedFile) => selectedFile.name === file.name,
                  );
                  index !== -1 && backupFileList.splice(index, 1);

                  const findIndex = fileList.findIndex(
                    (selectedFile) => selectedFile.name === file.name,
                  );
                  findIndex !== -1 && fileList.splice(findIndex, 1);
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
          handleSubmit={handleChangeProductImage}
        />
      </div>
    </>
  );
}

export default MultipleImages;
