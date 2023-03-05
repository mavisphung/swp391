import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  Col,
  Image,
  List,
  Modal,
  Row,
  Space,
  Table,
  TimePicker,
} from 'antd';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import moment from 'moment';

import { useUserAuth } from '~/context/UserAuthContext';
import {
  accepted,
  cancelled,
  dateTimeConvert,
  defaultDateTimePickerRange,
  finished,
  pending,
} from '~/system/Constants/constants';
import CustomModal from '~/components/Modal';
import { PROVINCEVN } from '~/system/Constants/provinceVN';
import { disabledDateTime, disablePastDate } from '~/components/DateTime';
import {
  MSG25,
  MSG26,
  MSG27,
  MSG28,
  MSG43,
  MSG44,
} from '~/system/Messages/messages';
import { getCustomerOrderDetailDataByOrderId, updateOrder } from '~/api/orders';
import '../OrdersList/OrdersList.scss';
import './OrderDetail.scss';
import CustomSpinner from '~/ui/CustomSpinner';

const orderDetailsData = {
  id: 'OCH0123456',
  customerInfo: {
    id: 3,
    fullname: 'Thái Đăng Linh',
    email: 'linhtd@gmail.com.vn',
    gender: true,
    password: 'linhtd123',
    dob: '1995-04-15',
    roleId: 3,
    status: true,
    phone: '0901565565',
    address: '250 Nguyễn Thị Minh Khai',
    ward: '27139',
    district: '770',
    province: '79',
  },
  payment: [
    {
      id: 1232,
      paymentCode: '12145',
      amount: 1600000,
      paymentMethod: 2,
      paidDate: '2023-01-09T08:15:00',
    },
    {
      id: 1235,
      paymentCode: '12155',
      amount: 2000000,
      paymentMethod: 1,
      paidDate: '',
    },
  ],
  status: 1,
  orderDate: '2023-01-09',
  estimatedReceiveDate: '2023-01-12',
  closeDate: '',
  totalPrice: '3600000',
};

// Deny reason samples
const reasonsList = [
  {
    id: 1,
    name: 'Số lượng trong kho không đủ',
  },
  {
    id: 2,
    name: 'Hàng bị hư hại',
  },
  {
    id: 3,
    name: 'Không có nhân viên gói hàng',
  },
];

const OrderDetail = () => {
  let navigate = useNavigate();
  const { orderId } = useParams();
  const [customerOrder, setCustomerOrder] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [communeObj, setCommuneObj] = useState({});
  const [districtObj, setDistrictObj] = useState({});
  const [provinceObj, setProvinceObj] = useState({});
  const [show, setShow] = useState(false);
  const [errorApprove, setErrorApprove] = useState(false);
  const [dateReceive, setDateReceive] = useState('');
  const [timeReceive, setTimeReceive] = useState('');
  const [showDeny, setShowDeny] = useState(false);
  const [reason, setReason] = useState('');
  const [optionReason, setOptionReason] = useState('');
  const [errorDeny, setErrorDeny] = useState(false);
  const [enoughQuantity, setEnoughQuantity] = useState(true);
  const [showFinish, setShowFinish] = useState(false);

  //Get current user
  const { getCurrentUser } = useUserAuth();
  const user = getCurrentUser();

  // Get customer order by order id
  const getOrderDataByOrderId = useCallback(async (orderId) => {
    try {
      const data = await getCustomerOrderDetailDataByOrderId(orderId);
      console.log('apiData:', data);
      setCustomerOrder(data);
      setOrderDetails(data.orderDetails?.map((product) => product));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getOrderDataByOrderId(orderId);
  }, [getOrderDataByOrderId, orderId]);

  // Render customer address
  useEffect(() => {
    setProvinceObj(
      PROVINCEVN.province.find(
        (province) =>
          province.idProvince === customerOrder.customerInfo?.province,
      ),
    );
  }, [customerOrder.customerInfo?.province]);

  useEffect(() => {
    const listDistrict = PROVINCEVN.district.filter(
      (item) => item.idProvince === customerOrder.customerInfo?.province,
    );
    setDistrictObj(
      listDistrict.find(
        (district) =>
          district.idDistrict === customerOrder.customerInfo?.district,
      ),
    );
  }, [
    customerOrder.customerInfo?.district,
    customerOrder.customerInfo?.province,
  ]);

  useEffect(() => {
    const listCommune = PROVINCEVN.commune.filter(
      (item) => item.idDistrict === customerOrder.customerInfo?.district,
    );
    setCommuneObj(
      listCommune.find(
        (commune) => commune.idCommune === customerOrder.customerInfo?.ward,
      ),
    );
  }, [customerOrder.customerInfo?.district, customerOrder.customerInfo?.ward]);

  // Render Order Status
  const renderOrderStatus = () => {
    if (customerOrder.status === pending) {
      return 'Chờ xác nhận';
    } else if (customerOrder.status === accepted) {
      return 'Đang xử lí';
    } else if (customerOrder.status === finished) {
      return 'Đã nhận hàng';
    } else if (customerOrder.status === cancelled) {
      return 'Đã hủy';
    }
  };

  // Render list
  const dataList = [
    {
      title: 'Thông tin khách hàng',
      content: (
        <>
          <p>
            <strong>Tên khách hàng:</strong>{' '}
            {customerOrder.customerInfo?.fullname}
          </p>
          <p>
            <strong>Email:</strong> {customerOrder.customerInfo?.email}
          </p>
          <p>
            <strong>Số điện thoại:</strong>{' '}
            {customerOrder.customerInfo?.phoneNumber}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {customerOrder.customerInfo?.address}
            {', '}
            {communeObj?.name}
            {', '}
            {districtObj?.name}
            {', '}
            {provinceObj?.name}
          </p>
        </>
      ),
    },
    {
      title: 'Thời gian',
      content: (
        <>
          <p>
            <strong>Ngày đặt hàng:</strong>{' '}
            {moment(customerOrder.orderDate, dateTimeConvert)
              .add(7, 'hours')
              .format(defaultDateTimePickerRange)}
          </p>
          {customerOrder.status === cancelled ? (
            <p>
              <strong>Ngày hủy:</strong>{' '}
              {moment(customerOrder.closeDate, dateTimeConvert)
                .add(7, 'hours')
                .format(defaultDateTimePickerRange)}
            </p>
          ) : (
            <>
              <p>
                <strong>Ngày dự kiến giao:</strong>{' '}
                {customerOrder.estimatedReceiveDate
                  ? moment(customerOrder.estimatedReceiveDate, dateTimeConvert)
                      .add(7, 'hours')
                      .format(defaultDateTimePickerRange)
                  : 'Chưa xác nhận'}
              </p>
              <p>
                <strong>Ngày lấy hàng: </strong>{' '}
                {customerOrder.closeDate
                  ? moment(customerOrder.closeDate, dateTimeConvert)
                      .add(7, 'hours')
                      .format(defaultDateTimePickerRange)
                  : 'Chưa lấy hàng'}
              </p>
            </>
          )}
        </>
      ),
    },
    {
      title: 'Thanh toán',
      content: (
        <>
          <p>
            <strong>Hình thức thanh toán:</strong> COD
          </p>

          <p>
            <strong>Số tiền đã cọc:</strong> Không có
          </p>
        </>
      ),
    },
  ];

  // Product lists table
  const columns = [
    {
      title: 'Mã sản phẩm',
      dataIndex: ['product', 'productCode'],
      key: 'productCode',
      render: (text, record) => text,
    },
    {
      title: 'Sản phẩm',
      dataIndex: ['product', 'name'],
      key: 'name',
      render: (text, record) => {
        return (
          <div className="name-group">
            <div className="product-img">
              <Image
                src={
                  record.product.medias[1]?.url || record.product.medias[2]?.url
                }
              />
            </div>
            <span className="mx-2">{record.product.name}</span>
          </div>
        );
      },
      width: 400,
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: ['product', 'categoryName'],
      key: ['product', 'categoryName'],
    },
    {
      title: 'Đơn giá',
      dataIndex: ['product', 'price'],
      key: 'price',
      render: (text, record) =>
        new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(text),
    },
    {
      title: 'Số lượng đặt',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Số lượng tồn',
      dataIndex: ['product', 'quantity'],
      key: 'currentQuantity',
      hide: customerOrder.status !== pending ? true : false,
      render: (text, record) => {
        if (record.quantity > text) {
          setEnoughQuantity(false);
        }
        return text;
      },
    },
    {
      title: 'Thành tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text, record) => {
        let price = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(record.product.price * record.quantity);
        return price;
      },
    },
  ].filter((item) => !item.hide);

  //Deny Order Modal
  const handleCloseDeny = () => {
    setShowDeny(false);
    setReason('');
    setErrorDeny(false);
  };

  const handleShowDeny = () => {
    setShowDeny(true);
  };

  // Deny order
  const denyOrderById = async (orderId) => {
    try {
      const body = {
        orderStatus: cancelled,
        reason: optionReason + ' ' + reason,
        staffAccountId: user.id,
      };
      console.log('Deny Body: ', body);
      // call api deny
      await updateOrder(orderId, body);
      handleCloseDeny();
      getOrderDataByOrderId(orderId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDenyOrder = (orderId) => {
    if (reason === '' && optionReason === '') {
      setErrorDeny(true);
      return;
    } else if (reason || optionReason) {
      denyOrderById(orderId);
      toast.success(MSG28, { autoClose: 1500 });
      handleCloseDeny();
    }
  };

  // Render Alert
  const renderAlert = () => {
    if (!enoughQuantity) {
      return (
        <Alert
          banner
          message={`Sản phẩm không đủ để cung cấp. Vui lòng kiểm tra lại.`}
          type="warning"
        />
      );
    }
  };

  // Approve order
  const approveOrderById = async (orderId) => {
    try {
      var estimatedReceiveDate = dateReceive + 'T' + timeReceive + ':00';
      const body = {
        orderStatus: accepted,
        estimatedReceiveDate: estimatedReceiveDate,
        staffAccountId: user.id,
      };
      console.log('Approve Body: ', body);
      // call api approve
      await updateOrder(orderId, body);
      handleClose();
      getOrderDataByOrderId(orderId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproveOrder = () => {
    if (dateReceive === '' || timeReceive === '') {
      setErrorApprove(true);
      return;
    } else if (dateReceive && timeReceive) {
      approveOrderById(orderId);
      toast.success(MSG26, { autoClose: 1500 });
      handleClose();
    }
  };

  //Input Approve Receive Date
  const handleDate = (e) => {
    setDateReceive(e.target.value);
  };

  //Approve Order Modal
  const handleClose = () => {
    setShow(false);
    setDateReceive('');
    setTimeReceive('');
    setErrorApprove(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  // Finish order modal
  const handleCloseFinish = () => {
    setShowFinish(false);
    setDateReceive('');
    setTimeReceive('');
    setErrorApprove(false);
  };

  const handleShowFinish = () => {
    setShowFinish(true);
  };

  // Manage finish order action
  const finishOrderById = async (orderId) => {
    try {
      const body = {
        orderStatus: finished,
        staffAccountId: user.id,
      };
      console.log('Finish Body: ', body);
      // call api finish
      await updateOrder(orderId, body);
      handleCloseFinish();
      getOrderDataByOrderId(orderId);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFinishOrder = (orderId) => {
    finishOrderById(orderId);
    toast.success(MSG44, { autoClose: 1500 });
    setShow(false);
  };

  // Go back to orders list page
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
          <>
            <Row>
              <Col>
                <p style={{ fontSize: '20px' }}>
                  Chi tiết đơn hàng #{orderId} -{' '}
                  <strong>{renderOrderStatus()}</strong>{' '}
                  {customerOrder.status === cancelled ? (
                    <>
                      {' '}
                      -{' '}
                      <strong style={{ color: 'red' }} className="my-2">
                        Lí do:
                      </strong>{' '}
                      {customerOrder.cancelReason}
                    </>
                  ) : (
                    <></>
                  )}
                </p>
              </Col>
            </Row>

            <List
              grid={{
                gutter: 16,
                column: 3,
              }}
              dataSource={dataList}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    title={item.title}
                    style={{
                      textAlign: 'left',
                      height: 280,
                    }}
                    className="card-content"
                  >
                    {item.content}
                  </Card>
                </List.Item>
              )}
            />
            <Card
              style={{
                marginBottom: '20px',
              }}
              className="card-content"
            >
              <Table
                className="mb-3"
                rowKey={(record) => record?.id}
                loading={loading}
                columns={columns}
                pagination={false}
                dataSource={orderDetails}
                rowClassName={(record, index) =>
                  record.product.quantity < record.quantity &&
                  customerOrder.status === pending
                    ? 'error'
                    : 'allowed'
                }
              />
              <Row justify="end" className="mx-3">
                <h4>
                  Tổng cộng:
                  <span className="mx-2">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(customerOrder.totalPrice)}
                  </span>
                </h4>
              </Row>
            </Card>
          </>

          <Row justify="end" className="mt-2">
            {!enoughQuantity && customerOrder.status === pending ? (
              <>{renderAlert()}</>
            ) : (
              <></>
            )}
            {customerOrder.status !== pending ? (
              <>
                {customerOrder.status === accepted ? (
                  <>
                    <Col className="mx-2">
                      <Button
                        className="success-btn"
                        type="primary"
                        onClick={() => handleShowFinish(customerOrder.orderId)}
                      >
                        Hoàn thành
                      </Button>
                    </Col>
                    <Col>
                      <Button danger onClick={() => handleShowDeny()}>
                        Từ chối
                      </Button>
                    </Col>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <Col className="mx-2">
                  <Button
                    type="primary"
                    disabled={!enoughQuantity}
                    onClick={() => handleShow(customerOrder.orderId)}
                  >
                    Chấp nhận
                  </Button>
                </Col>
                <Col>
                  <Button danger onClick={() => handleShowDeny()}>
                    Từ chối
                  </Button>
                </Col>
              </>
            )}
          </Row>
          <Row justify="center">
            <Col>
              <Button
                type="link"
                onClick={handleGoBack}
                style={{ color: '#014B92' }}
              >
                <strong>{`<< Quay lại danh sách đơn hàng`}</strong>
              </Button>
            </Col>
          </Row>

          <Modal
            title={<h4>Chấp nhận đơn hàng</h4>}
            open={show}
            onCancel={handleClose}
            footer={
              <>
                <Button
                  type="primary"
                  danger
                  onClick={handleClose}
                  className="mx-2"
                >
                  Hủy
                </Button>
                <Button type="primary" onClick={() => handleApproveOrder()}>
                  Đồng ý
                </Button>
              </>
            }
          >
            <hr />
            {MSG25 + ' ' + orderId}
            <Form.Group style={{ fontSize: '1rem' }}>
              <Form.Label>Chọn ngày và giờ dự kiến giao:</Form.Label>
              <Space direction="horizontal">
                <Form.Control
                  type="date"
                  value={dateReceive}
                  min={disablePastDate()}
                  // max={disableFutureDate()}
                  onChange={handleDate}
                  style={{ width: '250px' }}
                  required
                />
                <TimePicker
                  placeholder="HH:mm"
                  format="HH:mm"
                  allowClear
                  disabledTime={disabledDateTime}
                  onChange={(time, timeString) => {
                    setTimeReceive(timeString);
                    setErrorApprove(false);
                  }}
                />
              </Space>
            </Form.Group>
            <br />
            <hr />
            {errorApprove && (
              <Alert
                banner
                message="Vui lòng chọn ngày và giờ dự kiến giao"
                type="error"
                className="my-2"
              />
            )}
          </Modal>

          <CustomModal
            show={showFinish}
            title="Hoàn thành đơn hàng"
            body={MSG43}
            handleClose={handleCloseFinish}
            handleSubmit={() => handleFinishOrder(orderId)}
          />

          <CustomModal
            show={showDeny}
            title="Từ chối đơn hàng"
            body={
              <>
                {MSG27 + ' ' + orderId}
                <br />
                <br />
                <Form.Group className="mb-3">
                  <Form.Select
                    value={optionReason}
                    onChange={(e) => {
                      setOptionReason(e.target.value);
                      setErrorDeny(false);
                    }}
                    aria-label="Chọn lý do từ chối đơn"
                    required
                  >
                    <option value="">Chọn lý do từ chối đơn</option>
                    {reasonsList.map((reason, index) => (
                      <option key={index} value={reason.name}>
                        {reason.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control
                    as="textarea"
                    placeholder="Lý do khác"
                    style={{ height: '100px', marginTop: 20 }}
                    value={reason}
                    maxLength={500}
                    onChange={(e) => {
                      setReason(e.target.value);
                      setErrorDeny(false);
                    }}
                    required
                  />
                </Form.Group>
                {errorDeny && (
                  <Alert
                    banner
                    message="Vui lòng cho biết lí do từ chối đơn"
                    type="error"
                    className="my-2"
                  />
                )}
              </>
            }
            handleClose={handleCloseDeny}
            handleSubmit={() => handleDenyOrder(orderId)}
          />
        </>
      )}
    </>
  );
};

export default OrderDetail;
