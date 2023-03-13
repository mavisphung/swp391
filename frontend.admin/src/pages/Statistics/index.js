import { Card, Col, DatePicker, Row, Space, Statistic, Table } from 'antd';
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { getFilterCustomerOrderListData } from '~/api/orders';
import {
  dateConvert,
  defaultDatePickerRange,
} from '~/system/Constants/constants';
import moment from 'moment';
import PieChart from './Charts/PieChart';
import LineChart from './Charts/LineChart';
import BarChart from './Charts/BarChart';
import './Statistics.scss';
import { getStoreBriefRecordsData } from '~/api/statistics';
import CustomSpinner from '~/ui/CustomSpinner';

function Statistics() {
  const { RangePicker } = DatePicker;
  const [brief, setBrief] = useState(null);
  console.log('🚀 ~ file: index.js:24 ~ Statistics ~ brief:', brief);
  const [loading, setLoading] = useState(true);
  const [startPeriod, setStartPeriod] = useState('');
  const [endPeriod, setEndPeriod] = useState('');

  // Get Cities records
  const getStoreBriefRecordList = useCallback(async () => {
    try {
      const data = await getStoreBriefRecordsData();
      setBrief(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getStoreBriefRecordList();
  }, [getStoreBriefRecordList]);

  //Choose date range
  const onDateSelection = (value, dateString) => {
    setStartPeriod(
      moment(dateString[0], defaultDatePickerRange).format(dateConvert),
    );
    setEndPeriod(
      moment(dateString[1], defaultDatePickerRange).format(dateConvert),
    );
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
            <h2>Thống kê</h2>
          </div>
          <div
            style={{
              marginTop: 20,
              marginBottom: 20,
              display: 'flex',
              justifyContent: 'center',
            }}
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
          <Row gutter={8}>
            <Col span={6}>
              <DashboardCard
                icon={
                  <ShoppingCartOutlined
                    style={{
                      color: 'green',
                      backgroundColor: 'rgba(0,255,0,0.25)',
                      borderRadius: '50%',
                      fontSize: '2rem',
                      padding: 12,
                    }}
                  />
                }
                title={'Đơn hàng'}
                value={brief?.orders}
              />
            </Col>
            <Col span={6}>
              <DashboardCard
                icon={
                  <ShoppingOutlined
                    style={{
                      color: 'blue',
                      backgroundColor: 'rgba(0,0,255,0.25)',
                      borderRadius: '50%',
                      fontSize: '2rem',
                      padding: 12,
                    }}
                  />
                }
                title={'Kho hàng'}
                value={brief?.products}
              />
            </Col>
            <Col span={6}>
              <DashboardCard
                icon={
                  <UserOutlined
                    style={{
                      color: 'purple',
                      backgroundColor: 'rgba(0,255,255,0.25)',
                      borderRadius: '50%',
                      fontSize: '2rem',
                      padding: 12,
                    }}
                  />
                }
                title={'Khách hàng'}
                value={brief?.customers}
              />
            </Col>
            <Col span={6}>
              <DashboardCard
                icon={
                  <DollarCircleOutlined
                    style={{
                      color: 'red',
                      backgroundColor: 'rgba(255,0,0,0.25)',
                      borderRadius: '50%',
                      fontSize: '2rem',
                      padding: 12,
                    }}
                  />
                }
                title={'Doanh thu'}
                value={new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(brief?.profit)}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={12} style={{ paddingRight: 10 }}>
              <LineChart />
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <PieChart />
            </Col>
          </Row>
          <Row style={{ marginTop: 30 }}>
            <Col span={8}>
              <RecentOrders />
            </Col>
            <Col span={16} style={{ paddingLeft: 30 }}>
              <BarChart />
            </Col>
          </Row>
          <br />
        </>
      )}
    </>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card className="outline-border-shadow">
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} style={{ marginLeft: 50 }} />
      </Space>
    </Card>
  );
}

function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCustomerOrderList = useCallback(async () => {
    const data = await getFilterCustomerOrderListData(1, 2, '', '', '');
    setOrders(data.data.map((order) => order));
    setLoading(false);
  }, []);

  useEffect(() => {
    getCustomerOrderList();
  }, [getCustomerOrderList]);

  return (
    <>
      <h5 style={{ marginBottom: 10 }}>Đơn hàng gần đây</h5>
      <Table
        columns={[
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
            title: 'Hoàn thành',
            dataIndex: 'closeDate',
            key: 'closeDate',
            align: 'center',
            render: (text, record) => {
              return record.closeDate
                ? moment(record.closeDate, dateConvert).format(
                    defaultDatePickerRange,
                  )
                : 'Data lỗi';
            },
          },
          {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'right',
            render: (text, record) => {
              let price = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(record.totalPrice);
              return price;
            },
          },
        ]}
        className="outline-border-shadow"
        rowKey="id"
        dataSource={orders}
        loading={loading}
        pagination={false}
      ></Table>
    </>
  );
}

export default Statistics;
