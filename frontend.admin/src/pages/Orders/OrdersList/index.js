import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, DatePicker, Input, Row, Space, Table } from 'antd';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';

import CustomTooltip from '~/ui/CustomTooltip';
import CustomSpinner from '~/ui/CustomSpinner';
import { useUserAuth } from '~/context/UserAuthContext';
import {
  accepted,
  cancelled,
  dateConvert,
  defaultDatePickerRange,
  finished,
  pending,
} from '~/system/Constants/constants';
import { MSG07 } from '~/system/Messages/messages';
import { viewOrderDetail } from '~/system/Constants/LinkURL';
import {
  getCustomerOrderListData,
  getFilterCustomerOrderListData,
} from '~/api/orders';
import { orderStatusList } from '~/system/Data/status';

import '../../../styles/Component/label.scss';
import './OrdersList.scss';

const { Search } = Input;

const OrdersList = () => {
  const { pathname } = useLocation();
  const { RangePicker } = DatePicker;

  const [orderStatus, setOrderStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchOrderId, setSearchOrderId] = useState('');
  const [startPeriod, setStartPeriod] = useState('');
  const [endPeriod, setEndPeriod] = useState('');

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orders, setOrders] = useState([]);
  const [totalCount, setTotalCount] = useState(1);

  //Get current user
  const { getCurrentUser } = useUserAuth();
  const user = getCurrentUser();

  // Get customer order list
  const getCustomerOrderList = useCallback(
    async (pageIndex, orderStatus, searchOrderId, startPeriod, endPeriod) => {
      try {
        if (
          searchOrderId === '' &&
          orderStatus === '' &&
          ((startPeriod === '' && endPeriod === '') ||
            (startPeriod === 'Invalid date' && endPeriod === 'Invalid date'))
        ) {
          const data = await getCustomerOrderListData(pageIndex);
          setOrders(data.data.map((order) => order));
          let paginationObj = JSON.parse(data.headers['x-pagination']);
          setPageSize(paginationObj.PageSize);
          setTotalCount(paginationObj.TotalCount);
        } else {
          const data = await getFilterCustomerOrderListData(
            pageIndex,
            orderStatus,
            searchOrderId,
            startPeriod,
            endPeriod,
          );
          setOrders(data.data.map((order) => order));
          let paginationObj = JSON.parse(data.headers['x-pagination']);
          setPageSize(paginationObj.PageSize);
          setTotalCount(paginationObj.TotalCount);
        }
        setLoading(false);
        setLoadingSearch(false);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  useEffect(() => {
    getCustomerOrderList(
      pageIndex,
      orderStatus,
      searchOrderId,
      startPeriod,
      endPeriod,
    );
  }, [
    getCustomerOrderList,
    pageIndex,
    orderStatus,
    searchOrderId,
    startPeriod,
    endPeriod,
  ]);

  // Manage tabs
  const onStatusChange = (key) => {
    setOrderStatus(key);
    setPageIndex(1);
  };

  // Manage table
  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Khách hàng',
      dataIndex: ['customerInfo', 'fullname'],
      key: 'customer',
    },
    {
      title: 'Điện thoại',
      dataIndex: ['customerInfo', 'phoneNumber'],
      key: 'phoneNumber',
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderDate',
      key: 'orderDate',
      align: 'center',
      render: (text, record) => {
        return moment(record.orderDate, dateConvert).format(
          defaultDatePickerRange,
        );
      },
    },
    {
      title: 'Ngày dự kiến giao',
      dataIndex: 'estimatedReceiveDate',
      key: 'estimatedReceiveDate',
      align: 'center',
      render: (text, record) => {
        if (record.estimatedReceiveDate) {
          if (record.status === cancelled) {
            return 'Đã hủy';
          } else {
            return moment(record.estimatedReceiveDate, dateConvert).format(
              defaultDatePickerRange,
            );
          }
        } else {
          return 'Chờ xác nhận';
        }
      },
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      align: 'right',
      width: 100,
      render: (text, record) => {
        let price = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(record.totalPrice);
        return price;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        if (record.status === pending) {
          return <span className="c-label c-label-waiting"> Chờ xác nhận</span>;
        } else if (record.status === accepted) {
          return (
            <span className="c-label c-label-inprogress"> Đang xử lí</span>
          );
        } else if (record.status === finished) {
          return <span className="c-label c-label-success"> Thành công</span>;
        } else if (record.status === cancelled) {
          return <span className="c-label c-label-danger"> Đã hủy</span>;
        }
      },
    },
    {
      title: '',
      dataIndex: 'button',
      key: 'button',
      render: (text, record) => cellButton(record),
    },
  ];

  const cellButton = (record) => {
    return (
      <Space>
        <Link to={`${pathname}/${viewOrderDetail}/${record.id}`}>
          <CustomTooltip title="Xem chi tiết" color="#014B92">
            <Button variant="outline-info" size="xs">
              <FontAwesomeIcon icon={faEye} size="lg" />
            </Button>
          </CustomTooltip>
        </Link>
      </Space>
    );
  };

  //Choose date range
  const onDateSelection = (value, dateString) => {
    setStartPeriod(
      moment(dateString[0], defaultDatePickerRange).format(dateConvert),
    );
    setEndPeriod(
      moment(dateString[1], defaultDatePickerRange).format(dateConvert),
    );
    setPageIndex(1);
  };

  const disabledDate = (current) => {
    // Can not select days after today
    return current && current > moment().endOf('day');
  };

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          <div style={{ textAlign: 'center' }}>
            <h2>Danh sách đơn đặt hàng</h2>
          </div>
          <Card
            tabList={orderStatusList}
            activeTabKey={orderStatus}
            onTabChange={(rowkey) => {
              onStatusChange(rowkey);
            }}
            className="status_card"
          />

          <div
            style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}
          >
            <span
              style={{ marginTop: 3, marginRight: 10, fontSize: '1.01rem' }}
            >
              Chọn Ngày:
            </span>
            <RangePicker
              placeholder={['Từ ngày', 'Đến ngày']}
              format={defaultDatePickerRange}
              onChange={onDateSelection}
              disabledDate={disabledDate}
              bordered="true"
            />
          </div>

          <Row className="my-3" justify="center">
            <Search
              style={{ width: '48%' }}
              placeholder="Tìm khách hàng"
              enterButton
              size="large"
              loading={loadingSearch}
              onSearch={(value) => {
                setPageIndex(1);
                setSearchOrderId(value);
                setLoadingSearch(true);
              }}
            />
          </Row>
          <div className="my-3">
            <Table
              rowKey="id"
              locale={{ emptyText: MSG07 }}
              columns={columns}
              dataSource={orders}
              pagination={{
                defaultCurrent: 1,
                current: pageIndex,
                pageSize: pageSize,
                total: totalCount,
                showSizeChanger: false,
                position: ['none', 'bottomCenter'],
                onChange: (page) => {
                  setPageIndex(page);
                },
              }}
              bordered
            />
          </div>
        </>
      )}
    </>
  );
};

export default OrdersList;
