import { Space, Table } from 'antd';
import { MSG07 } from '~/system/Messages/messages';

import '../../../styles/Component/button.scss';
import '../../../styles/Component/label.scss';
import '../../../styles/Component/table.scss';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import CustomTooltip from '~/ui/CustomTooltip';
import { useUserAuth } from '~/context/UserAuthContext';

const accountRoles = [
  {
    id: 'admin',
    name: 'Admin',
  },
  {
    id: 'staff',
    name: 'Staff',
  },
  {
    id: 'customer',
    name: 'Customer',
  },
];

const accountStatus = [
  {
    id: 'active',
    name: 'Active',
  },
  {
    id: 'inactive',
    name: 'Inactive',
  },
];

const accountList = {
  type: 'list',
  data: [
    {
      id: 1,
      fullname: 'Bao Khang',
      email: 'admin@chytech.com.vn',
      password: 'admin123',
      roleId: 'admin',
      statusId: 'active',
      phone: '0123123123',
    },
    {
      id: 2,
      fullname: 'Kevin Ken',
      email: 'staff@chytech.com.vn',
      password: 'staff123',
      roleId: 'staff',
      statusId: 'active',
      phone: '0123123555',
    },
    {
      id: 3,
      fullname: 'Thái Đăng Linh',
      email: 'linhtd@gmail.com.vn',
      password: 'linhtd123',
      roleId: 'customer',
      statusId: 'active',
      phone: '0901565565',
    },
    {
      id: 4,
      fullname: 'Phùng Hữu Kiều',
      email: 'kieuph@gmail.com.vn',
      password: 'kieuph123',
      roleId: 'customer',
      statusId: 'active',
      phone: '0901789789',
    },
  ],
  pageSize: 10,
  totalCount: 4,
};

function ViewAccountsList() {
  const { getCurrentUser } = useUserAuth();
  const user = getCurrentUser();

  const [accounts, setAccounts] = useState([]);
  const [searchAccountEmail, setSearchAccountEmail] = useState('');
  const [searchAccountRole, setSearchAccountRole] = useState('');
  const [searchAccountStatus, setSearchAccountStatus] = useState('active');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);

  // Get all accounts
  const getAccountsList = useCallback((pageIndex) => {
    const data = accountList;
    setAccounts(data.data.map((account) => account));
    setPageSize(data.pageSize);
    setTotalCount(data.totalCount);
  }, []);

  useEffect(() => {
    getAccountsList(pageIndex);
  }, [getAccountsList, pageIndex]);

  //Enable the Deactivate Button
  const checkDisableButton = (email, statusId) => {
    if (user.email === email) {
      return true;
    } else if (statusId !== 'active') {
      return true;
    } else {
      return false;
    }
  };

  // Table record buttons group
  const cellButton = (record) => {
    return (
      <Space>
        <Link to={``}>
          <CustomTooltip title="Xem chi tiết" color="#014B92">
            <Button className="mx-2" variant="outline-info" size="xs">
              <FontAwesomeIcon icon={faEye} size="lg" />
            </Button>
          </CustomTooltip>
        </Link>
        <CustomTooltip title="Vô hiệu hóa" color="#dc3545">
          <Button
            variant="outline-danger"
            size="xs"
            disabled={
              checkDisableButton(record.email, record.statusId) ? true : false
            }
            // onClick={() => handleShow(record.id)}
          >
            <FontAwesomeIcon icon={faTrashCan} size="lg" />
          </Button>
        </CustomTooltip>
      </Space>
    );
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 250,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (text, record) => {
        const roleName = accountRoles.find(
          (role) => role.id === record.roleId,
        )?.name;
        return roleName;
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'statusId',
      key: 'statusId',
      render: (text, record) => {
        if (record.statusId === 'active') {
          return <span className="c-label c-label-success"> Hoạt động</span>;
        } else if (record.statusId === 'inactive') {
          return (
            <span className="c-label c-label-danger"> Không hoạt động</span>
          );
        }
      },
    },
    {
      title: '',
      dataIndex: 'button',
      key: 'button',
      width: 100,
      render: (text, record) => cellButton(record),
    },
  ];

  return (
    <>
      <div className="justify-content-center">
        <h2>Danh sách tài khoản</h2>
      </div>

      <Space>
        <Form.Control
          placeholder="Tìm email"
          //onChange={handleChangeAccountEmail}
          value={searchAccountEmail}
          type="text"
        />
        <Form.Select
          value={searchAccountRole}
          //onChange={handleChangeAccountRole}
          aria-label="Chọn vai trò"
          required
        >
          <option value="">Chọn vai trò</option>
          {accountRoles.map((role, index) => (
            <option key={index} value={role.id}>
              {role.name}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          value={searchAccountStatus}
          //onChange={handleChangeAccountStatus}
          aria-label="Chọn trạng thái"
          required
        >
          {accountStatus.map((status, index) => (
            <option key={index} value={status.id}>
              {status.name}
            </option>
          ))}
        </Form.Select>
      </Space>

      <Table
        locale={{ emptyText: MSG07 }}
        rowKey="id"
        columns={columns}
        dataSource={accounts}
        pagination={{
          pageSize: pageSize,
          total: totalCount,
          position: ['none', 'bottomCenter'],
          onChange: (page) => {
            setPageIndex(page);
          },
        }}
        bordered
      />
    </>
  );
}

export default ViewAccountsList;
