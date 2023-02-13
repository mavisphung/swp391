import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, Input, Row, Space, Table } from 'antd';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';

import CustomTooltip from '~/ui/CustomTooltip';
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

import '../../../styles/Component/label.scss';
import './OrdersList.scss';
import { viewOrderDetail } from '~/system/Constants/LinkURL';

const { Search } = Input;

const statusList = [
  {
    key: '',
    tab: 'Tất cả',
  },
  {
    key: '0',
    tab: 'Chờ xác nhận',
  },
  {
    key: '1',
    tab: 'Đang xử lí',
  },
  {
    key: '2',
    tab: 'Thành công',
  },
  {
    key: '3',
    tab: 'Đã hủy',
  },
];

const ordersList = {
  data: [
    {
      id: 'OCH0123456',
      customerAccount: {
        fullname: 'Thái Đăng Linh',
      },
      status: '0',
      orderDate: '2023-01-09',
      estimatedReceiveDate: '2023-01-12',
      totalPrice: '3600000',
    },
    {
      id: 'OCH0123789',
      customerAccount: {
        fullname: 'Phùng Hữu Kiều',
      },
      status: '0',
      orderDate: '2023-01-15',
      estimatedReceiveDate: '2023-01-18',
      totalPrice: '1500000',
    },
    {
      id: 'OCH0123555',
      customerAccount: {
        fullname: 'Lương Bá Thành',
      },
      status: '1',
      orderDate: '2023-01-12',
      estimatedReceiveDate: '2023-01-14',
      totalPrice: '2300000',
    },
    {
      id: 'OCH0123666',
      customerAccount: {
        fullname: 'Trần Công Minh',
      },
      status: '3',
      orderDate: '2023-02-06',
      estimatedReceiveDate: '2023-02-10',
      totalPrice: '3000000',
    },
  ],
  pageSize: 10,
  totalCount: 2,
};

const OrdersList = () => {
  const { pathname } = useLocation();

  const [orderStatus, setOrderStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchOrderId, setSearchOrderId] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orders, setOrders] = useState([]);
  const [totalCount, setTotalCount] = useState(1);

  //Get current user
  const { getCurrentUser } = useUserAuth();
  const user = getCurrentUser();

  // Get customer order list
  const getCustomerOrderList = useCallback(async (pageIndex) => {
    try {
      const data = ordersList;
      setOrders(data.data.map((order) => order));
      setPageSize(data.pageSize);
      setTotalCount(data.totalCount);
      setLoading(false);
      setLoadingSearch(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getCustomerOrderList(pageIndex, orderStatus, searchOrderId);
  }, [getCustomerOrderList, pageIndex, orderStatus, searchOrderId]);

  // Manage tabs
  const onStatusChange = (key) => {
    setOrderStatus(key);
  };

  // Manage table
  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Khách hàng',
      dataIndex: ['customerAccount', 'fullname'],
      key: 'customer',
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderDate',
      key: 'orderDate',
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
      render: (text, record) => {
        return moment(record.estimatedReceiveDate, dateConvert).format(
          defaultDatePickerRange,
        );
      },
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
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

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h2>Danh sách đơn đặt hàng</h2>
      </div>
      <Card
        tabList={statusList}
        activeTabKey={orderStatus}
        onTabChange={(rowkey) => {
          onStatusChange(rowkey);
        }}
        className="status_card"
      />
      <Row className="my-3" justify="center">
        <Search
          style={{ width: '48%' }}
          placeholder="Tìm mã đơn hàng"
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
            position: ['none', 'bottomCenter'],
            onChange: (page) => {
              setPageIndex(page);
            },
          }}
          bordered
        />
      </div>
    </>
  );
};

export default OrdersList;
