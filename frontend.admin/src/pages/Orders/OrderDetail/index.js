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
  atStore,
  cancelled,
  cod,
  dateTimeConvert,
  defaultDateTimePickerRange,
  finished,
  payInAdvance,
  pending,
  vnpay,
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
  MSG60,
  MSG61,
} from '~/system/Messages/messages';
import {
  addPaymentOrder,
  getCustomerOrderDetailDataByOrderId,
  updateOrder,
} from '~/api/orders';
import '../OrdersList/OrdersList.scss';
import './OrderDetail.scss';
import CustomSpinner from '~/ui/CustomSpinner';
import { checkPaidAmount } from '~/components/Validation';

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

// Payment methods
const paymentMethodList = [
  {
    id: 1,
    name: 'Chuyển khoản qua Vnpay',
  },
  {
    id: 2,
    name: 'Thanh toán tiền mặt',
  },
  {
    id: 3,
    name: 'Ship COD',
  },
];

const OrderDetail = () => {
  let navigate = useNavigate();
  const { orderId } = useParams();
  const [customerOrder, setCustomerOrder] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);
  const [payments, setPayments] = useState([]);
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
  const [showPayment, setShowPayment] = useState(false);
  const [errorPayment, setErrorPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [paidAmount, setPaidAmount] = useState('');

  //Get current user
  const { getCurrentUser } = useUserAuth();
  const user = getCurrentUser();

  // Get customer order by order id
  const getOrderDataByOrderId = useCallback(async (orderId) => {
    try {
      const data = await getCustomerOrderDetailDataByOrderId(orderId);
      setCustomerOrder(data);
      setOrderDetails(data.orderDetails?.map((product) => product));
      setPayments(data.payments?.map((payment) => payment));
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

  // Transform payment methods
  const handlePaymentMethods = (payment) => {
    if (payment === vnpay) {
      return 'Vnpay';
    } else if (payment === atStore) {
      return 'Thanh toán tiền mặt tại quầy';
    } else if (payment === cod) {
      return 'Ship COD';
    } else if (payment === payInAdvance) {
      return 'Cọc';
    }
  };

  // Tổng tiền đã thanh toán
  const handleSumPaidAmount = () => {
    let sum = 0;
    payments?.forEach((element) => {
      // if (element.paymentMethod !== atStore && element.paymentMethod !== cod) {
      //   sum += element.amount;
      // }
      sum += element.amount;
    });
    return sum;
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
          {customerOrder.note !== '' ? (
            <p>
              <strong>Ghi chú:</strong> {customerOrder.note}
            </p>
          ) : (
            <></>
          )}
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
          {/* {payments[0]?.paymentMethod === 4 ? (
            <>
              <p>
                <strong>Đặt cọc trước:</strong>
              </p>
              <p>
                &emsp; <strong>Ngày cọc:</strong>{' '}
                {moment(payments[0]?.paidDate, dateTimeConvert)
                  .add(7, 'hours')
                  .format(defaultDateTimePickerRange)}
              </p>
              <p>
                &emsp; <strong>Số tiền đã cọc:</strong>{' '}
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(payments[0]?.amount)}
              </p>
              <hr />
            </>
          ) : (
            <></>
          )} */}
          {payments.map((payment, index) => {
            return (
              <div key={index} style={{ display: 'flex' }}>
                <p>{'#' + parseInt(index + 1)}</p>
                <div style={{ paddingLeft: 10 }}>
                  <p>
                    <strong>Phương thức thức thanh toán:</strong>{' '}
                    {handlePaymentMethods(payment?.paymentMethod)}
                  </p>
                  <p>
                    <strong>Ngày tạo:</strong>{' '}
                    {moment(payment?.paidDate, dateTimeConvert)
                      .add(7, 'hours')
                      .format(defaultDateTimePickerRange)}
                  </p>
                  <p>
                    <strong>Số tiền:</strong>{' '}
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(payment?.amount)}
                  </p>
                </div>
              </div>
            );
          })}
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
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: ['product', 'categoryName'],
      key: ['product', 'categoryName'],
      responsive: ['lg'],
    },
    {
      title: 'Đơn giá',
      dataIndex: ['product', 'price'],
      key: 'price',
      align: 'right',
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
      align: 'right',
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
      setLoading(true);
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

  //At Order Payment Modal
  const handleClosePayment = () => {
    setShowPayment(false);
    setSelectedPayment('');
    setPaidAmount('');
    setErrorPayment(false);
  };

  const handleShowPayment = () => {
    setShowPayment(true);
  };

  // Add payment
  const addPaymentOrderById = async (orderId) => {
    try {
      const body = {
        amount: parseInt(paidAmount),
        paymentMethod: parseInt(selectedPayment),
        orderId: parseInt(orderId),
        payInAdvance: Math.round(
          (parseInt(paidAmount) / customerOrder.totalPrice) * 100,
        ),
      };
      console.log('Payment Body: ', body);
      // call api payment
      await addPaymentOrder(orderId, body);
      handleClosePayment();
      setLoading(true);
      getOrderDataByOrderId(orderId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPaymentToOrder = (orderId) => {
    if (selectedPayment === '' || paidAmount === '') {
      setErrorPayment(true);
      return;
    } else if (selectedPayment) {
      addPaymentOrderById(orderId);
      toast.success(MSG61, { autoClose: 1500 });
      handleCloseDeny();
    }
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
      setLoading(true);
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
                columns: 3,
              }}
              style={{
                display: 'flex',
                justifyContent: 'space-around',
              }}
              dataSource={dataList}
              renderItem={(item) => (
                <List.Item style={{ width: '100%' }}>
                  <Card
                    title={item.title}
                    style={{
                      textAlign: 'left',
                      height: 350,
                      width: '27vw',
                      minWidth: 400,
                    }}
                    className={
                      item.title === 'Thanh toán'
                        ? 'card-content payment-scroll'
                        : 'card-content'
                    }
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
                style={{ maxWidth: '100%' }}
                className="mb-3"
                rowKey={(record) => record?.id}
                loading={loading}
                columns={columns}
                scroll={{ x: true }}
                pagination={false}
                dataSource={orderDetails}
                rowClassName={(record, index) =>
                  record.product.quantity < record.quantity &&
                  customerOrder.status === pending
                    ? 'error'
                    : 'allowed'
                }
              />
              <Row justify="end" className="mt-3 me-2">
                <Col style={{ marginRight: 20 }}>
                  <h6>Tổng tiền hàng:</h6>
                  <h6>Tổng tiền đã thanh toán:</h6>
                  <h4 style={{ color: '#099E2A' }}>Tổng thanh toán:</h4>
                </Col>
                <Col
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                  }}
                >
                  <h6>
                    <span className="mx-2">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(customerOrder.totalPrice)}
                    </span>
                  </h6>
                  <h6>
                    <span className="mx-2">
                      -{' '}
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(handleSumPaidAmount())}
                    </span>
                  </h6>
                  <h4 style={{ color: '#099E2A' }}>
                    <span className="mx-2">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(
                        customerOrder.totalPrice - handleSumPaidAmount(),
                      )}
                    </span>
                  </h4>
                </Col>
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
                    {customerOrder.totalPayInAdvance === 100 ? (
                      <Col className="mx-2">
                        <Button
                          className="success-btn"
                          type="primary"
                          onClick={() =>
                            handleShowFinish(customerOrder.orderId)
                          }
                        >
                          Hoàn thành
                        </Button>
                      </Col>
                    ) : (
                      <Col className="mx-2">
                        <Button
                          type="primary"
                          disabled={!enoughQuantity}
                          onClick={() =>
                            handleShowPayment(customerOrder.orderId)
                          }
                        >
                          Thêm thanh toán
                        </Button>
                      </Col>
                    )}
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

          <CustomModal
            show={showPayment}
            title="Thêm thanh toán"
            body={
              <>
                {MSG60 + ' ' + orderId}
                <br />
                <br />
                <Form.Group className="mb-3">
                  <Form.Select
                    value={selectedPayment}
                    onChange={(e) => {
                      setSelectedPayment(e.target.value);
                      setErrorPayment(false);
                    }}
                    aria-label="Chọn phương thức thanh toán"
                    required
                  >
                    <option value="">Chọn phương thức thanh toán</option>
                    {paymentMethodList.map((method, index) => (
                      <option key={index} value={method.id}>
                        {method.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control
                    type="number"
                    placeholder="Số tiền"
                    style={{ marginTop: 20 }}
                    value={paidAmount}
                    step="1000"
                    min="0"
                    max={(
                      customerOrder.totalPrice - handleSumPaidAmount()
                    ).toString()}
                    isInvalid={
                      paidAmount &&
                      (parseInt(paidAmount) >
                        customerOrder.totalPrice - handleSumPaidAmount() ||
                        parseInt(paidAmount) <= 0)
                    }
                    onChange={(e) => {
                      setPaidAmount(e.target.value);
                      setErrorPayment(false);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {checkPaidAmount(
                      paidAmount,
                      customerOrder.totalPrice - handleSumPaidAmount(),
                    )}
                  </Form.Control.Feedback>
                </Form.Group>
                {errorPayment && (
                  <Alert
                    banner
                    message="Vui lòng chọn phương thức thanh toán và số tiền"
                    type="error"
                    className="my-2"
                  />
                )}
              </>
            }
            handleClose={handleClosePayment}
            handleSubmit={() => handleAddPaymentToOrder(orderId)}
          />
        </>
      )}
    </>
  );
};

export default OrderDetail;
