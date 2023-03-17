import { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { EyeFilled } from "@ant-design/icons";

import { getListOrder } from "~/data/OrderRepository";
import CustomSpinner from "~/components/CustomSpinner";
import { orderStatusType } from "~/models/CategoryType";
import { formatDate, formatPrice } from "~/common/Helper";
import config from "../../config";

function OrderHistory() {
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState();

  useEffect(() => {
    const getOrderHistory = async () => {
      const data = await getListOrder({
        PageNumber: 1,
        PageSize: 10,
      });
      if (data) {
        setOrderHistory(data);
      }
    };

    getOrderHistory({});
  }, []);

  if (!orderHistory) return <CustomSpinner />;

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Khách hàng",
      dataIndex: ["customerInfo", "fullname"],
      key: "customer",
    },
    {
      title: "Điện thoại",
      dataIndex: ["customerInfo", "phoneNumber"],
      key: "phoneNumber",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "orderDate",
      key: "orderDate",
      align: "center",
      render: (_, record) => {
        return formatDate(record.orderDate);
      },
    },
    {
      title: "Ngày dự kiến giao",
      dataIndex: "estimatedReceiveDate",
      key: "estimatedReceiveDate",
      align: "center",
      render: (_, record) => {
        if (record.estimatedReceiveDate) {
          return formatDate(record.estimatedReceiveDate);
        } else {
          return "Chưa xác định";
        }
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "right",
      width: 100,
      render: (_, record) => {
        return formatPrice(record.totalPrice);
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        if (record.status === orderStatusType.pending) {
          return <span className="c-label c-label-waiting"> Chờ xác nhận</span>;
        } else if (record.status === orderStatusType.accept) {
          return (
            <span className="c-label c-label-inprogress"> Đang xử lí</span>
          );
        } else if (record.status === orderStatusType.finished) {
          return <span className="c-label c-label-success"> Thành công</span>;
        } else if (record.status === orderStatusType.cancelled) {
          return <span className="c-label c-label-danger"> Đã hủy</span>;
        }
      },
    },
    {
      title: "",
      dataIndex: "button",
      key: "button",
      render: (text, record) => cellButton(record),
    },
  ];

  const cellButton = (record) => {
    const params = {
      id: record.id,
    };

    return (
      <Space>
        {/* <CustomTooltip title="Xem chi tiết" color="#014B92"> */}
        <Button
          variant="outline-info"
          size="xs"
          onClick={() => {
            navigate({
              pathname: config.routes.orderDetail,
              search: `?${createSearchParams(params)}`,
            });
          }}
        >
          <EyeFilled />
        </Button>
        {/* </CustomTooltip> */}
      </Space>
    );
  };

  return (
    <div className="my-3">
      <Table
        rowKey="id"
        locale={{ emptyText: "Lịch sử đơn hàng trống" }}
        columns={columns}
        dataSource={orderHistory}
        pagination={{
          defaultCurrent: 1,
          // current: pageIndex,
          // pageSize: pageSize,
          total: orderHistory.length,
          showSizeChanger: false,
          position: ["none", "bottomCenter"],
          // onChange: (page) => {
          //   setPageIndex(page);
          // },
        }}
        // bordered
      />
    </div>
  );
}

export default OrderHistory;
