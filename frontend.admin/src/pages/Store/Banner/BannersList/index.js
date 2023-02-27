import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Alert, Image, Space, Table } from 'antd';
import CustomSpinner from '~/ui/CustomSpinner';
import { MSG07, MSG47, MSG48 } from '~/system/Messages/messages';
import CustomTooltip from '~/ui/CustomTooltip';
import { Button, Col, Form, ProgressBar, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { viewBannerDetail } from '~/system/Constants/LinkURL';
import moment from 'moment';
import {
  dateTimeConvert,
  defaultDateTimePickerRange,
} from '~/system/Constants/constants';
import { getBannersListData, removeBanner, addBanner } from '~/api/banners';
import CustomModal from '~/components/Modal';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '~/firebase';

const BannersList = () => {
  const { pathname } = useLocation();

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [banners, setBanners] = useState([]);
  const [totalCount, setTotalCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [bannerId, setBannerId] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(false);
  const [bannerName, setBannerName] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImageURL, setBannerImageURL] = useState('');
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  // Get customer order list
  const getBannersList = useCallback(async (pageIndex) => {
    try {
      const data = await getBannersListData(pageIndex);
      setBanners(data.data.map((order) => order));
      let paginationObj = JSON.parse(data.headers['x-pagination']);
      setPageSize(paginationObj.PageSize);
      setTotalCount(paginationObj.TotalCount);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getBannersList(pageIndex);
  }, [getBannersList, pageIndex]);

  // Manage table
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'id',
      key: 'id',
      width: 20,
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (text, record) => {
        return (
          <>
            <div
              style={{
                display: 'inline-block',
                width: 80,
                height: 40,
                overflow: 'hidden',
                backgroundColor: 'black',
              }}
            >
              <Image src={record.image} />
            </div>
          </>
        );
      },
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedDate',
      key: 'updatedDate',
      render: (text, record) => {
        return moment(record.updatedDate, dateTimeConvert).format(
          defaultDateTimePickerRange,
        );
      },
    },
    {
      title: 'Người cập nhật',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
    },
    {
      title: '',
      dataIndex: 'button',
      key: 'button',
      width: 100,
      render: (text, record) => cellButton(record),
    },
  ];

  const cellButton = (record) => {
    return (
      <Space>
        <Link to={`${pathname}/${viewBannerDetail}/${record.id}`}>
          <CustomTooltip title="Xem chi tiết" color="#014B92">
            <Button className="mx-2" variant="outline-info" size="xs">
              <FontAwesomeIcon icon={faEye} size="lg" />
            </Button>
          </CustomTooltip>
        </Link>
        <CustomTooltip title="Xóa" color="#dc3545">
          <Button
            variant="outline-danger"
            size="xs"
            onClick={() => handleShowModal(record.id)}
          >
            <FontAwesomeIcon icon={faBan} size="lg" />
          </Button>
        </CustomTooltip>
      </Space>
    );
  };

  // Manage remove banner modal
  const handleCloseModal = () => setShow(false);

  const handleShowModal = (selectedBannerId) => {
    setShow(true);
    setBannerId(selectedBannerId);
  };

  // Manage remove banner action
  const removeBannerById = async (bannerById) => {
    try {
      // call api
      const id = parseInt(bannerById.id);
      await removeBanner(id);

      getBannersList(pageIndex);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveBanner = async (bannerId) => {
    const bannerById = banners.find((banner) => banner.id === bannerId);
    removeBannerById(bannerById);

    toast.success(MSG48, { autoClose: 1500 });
    setShow(false);
  };

  // Manage create banner modal
  const handleCloseCreate = () => {
    setShowCreate(false);
    setBannerName('');
    setBannerImage(null);
    setBannerImageURL('');
    setErrorCreate(false);
  };

  const handleShowCreate = () => {
    setShowCreate(true);
  };

  // Manage create banner action
  const createBanner = async () => {
    try {
      const body = {
        name: bannerName,
        image: bannerImageURL,
      };
      // call api deny
      await addBanner(body);
      handleCloseCreate();
      getBannersList(pageIndex);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateBanner = () => {
    if (bannerName === '' || bannerImageURL === '') {
      setErrorCreate(true);
      return;
    } else if (bannerName && bannerImageURL) {
      createBanner();
      toast.success('Tạo banner thành công', { autoClose: 1500 });
      handleCloseCreate();
    }
  };

  const handleChangeBannerImage = (e) => {
    if (e.target.files[0]) {
      setBannerImage(e.target.files[0]);
    }
  };

  const handleUploadImage = () => {
    const storageRef = ref(storage, `bannerImages/${bannerImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, bannerImage);
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
          setBannerImageURL(downloadURL);
          setErrorCreate(false);
        });
        setShowProgress(false);
      },
    );
  };

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          <div style={{ textAlign: 'center' }}>
            <h2>Danh sách Banner</h2>
          </div>

          <div className="my-3">
            <Table
              rowKey="id"
              locale={{ emptyText: MSG07 }}
              columns={columns}
              dataSource={banners}
              pagination={{
                defaultCurrent: 1,
                current: pageIndex,
                pageSize: pageSize,
                total: totalCount,
                position: ['none', 'bottomCenter'],
                onChange: (page) => {
                  setPageIndex(page);
                },
              }}
              bordered
              summary={() => {
                return (
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={5} />
                    <Table.Summary.Cell>
                      <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <CustomTooltip title="Thêm banner mới" color="#198754">
                          <Button
                            variant="outline-success"
                            size="xs"
                            onClick={() => handleShowCreate()}
                          >
                            <FontAwesomeIcon icon={faPlus} size="lg" />
                          </Button>
                        </CustomTooltip>
                      </div>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              }}
            />
          </div>

          <CustomModal
            show={show}
            title={'Xóa banner ' + bannerId}
            body={MSG47}
            handleClose={handleCloseModal}
            handleSubmit={() => handleRemoveBanner(bannerId)}
          />

          <CustomModal
            show={showCreate}
            title="Thêm banner mới"
            body={
              <>
                <Row>
                  <Col className="align-items-center">
                    <h5>Thêm banner</h5>
                  </Col>
                </Row>
                {bannerImageURL && (
                  <Row>
                    <Col className="align-items-center">
                      <Image
                        className="account-image-file"
                        src={bannerImageURL}
                        alt={'Ảnh'}
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
                        onChange={handleChangeBannerImage}
                        accept="image/*"
                        className="account-image-file-input"
                      />
                      <Button
                        variant="primary"
                        onClick={handleUploadImage}
                        disabled={bannerImage ? false : true}
                      >
                        Tải ảnh lên
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Tên banner"
                    style={{ marginTop: 20 }}
                    value={bannerName}
                    maxLength={500}
                    onChange={(e) => {
                      setBannerName(e.target.value);
                      setErrorCreate(false);
                    }}
                    required
                  />
                </Form.Group>
                {errorCreate && (
                  <Alert
                    banner
                    message="Vui lòng thêm tên và hình ảnh banner"
                    type="error"
                    className="my-2"
                  />
                )}
              </>
            }
            handleClose={handleCloseCreate}
            handleSubmit={() => handleCreateBanner()}
          />
        </>
      )}
    </>
  );
};

export default BannersList;
