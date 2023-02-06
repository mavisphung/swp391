import { useCallback, useEffect, useState } from 'react';
import { Space, Table } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faEye } from '@fortawesome/free-solid-svg-icons';

import { MSG07, MSG08 } from '~/system/Messages/messages';
import CustomTooltip from '~/ui/CustomTooltip';
import { useUserAuth } from '~/context/UserAuthContext';

import '../../../styles/Component/button.scss';
import '../../../styles/Component/label.scss';
import '../../../styles/Component/table.scss';
import CustomModal from '~/components/Modal';
import { updateAccount } from '~/system/Constants/LinkURL';
import { active, inactive } from '~/system/Constants/constants';

const accountRoles = [
  {
    id: 'admin',
    name: 'Quản trị viên',
  },
  {
    id: 'staff',
    name: 'Nhân viên',
  },
  {
    id: 'customer',
    name: 'Khách hàng',
  },
];

const accountStatus = [
  {
    id: '1',
    name: 'Hoạt động',
  },
  {
    id: '0',
    name: 'Không hoạt động',
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
      status: '1',
      phone: '0123123123',
    },
    {
      id: 2,
      fullname: 'Kevin Ken',
      email: 'staff@chytech.com.vn',
      password: 'staff123',
      roleId: 'staff',
      status: '1',
      phone: '0123123555',
    },
    {
      id: 3,
      fullname: 'Thái Đăng Linh',
      email: 'linhtd@gmail.com.vn',
      password: 'linhtd123',
      roleId: 'customer',
      status: '1',
      phone: '0901565565',
    },
    {
      id: 4,
      fullname: 'Phùng Hữu Kiều',
      email: 'kieuph@gmail.com.vn',
      password: 'kieuph123',
      roleId: 'customer',
      status: '0',
      phone: '0901789789',
    },
  ],
  pageSize: 10,
  totalCount: 4,
};

function ViewAccountsList() {
  const { getCurrentUser } = useUserAuth();
  const user = getCurrentUser();

  const { pathname } = useLocation();

  const [accounts, setAccounts] = useState([]);
  const [searchAccountEmail, setSearchAccountEmail] = useState('');
  const [searchAccountRole, setSearchAccountRole] = useState('');
  const [searchAccountStatus, setSearchAccountStatus] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [show, setShow] = useState(false);
  const [accountId, setAccountId] = useState('');

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
  const checkDisableButton = (email, status) => {
    if (user.email === email) {
      return true;
    } else if (status !== active) {
      return true;
    } else {
      return false;
    }
  };

  // Table record buttons group
  const cellButton = (record) => {
    return (
      <Space>
        <Link to={`${pathname}/${updateAccount}/${record.id}`}>
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
              checkDisableButton(record.email, record.status) ? true : false
            }
            onClick={() => handleShowModal(record.id)}
          >
            <FontAwesomeIcon icon={faBan} size="lg" />
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
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (text, record) => {
        if (record.status === active) {
          return <span className="c-label c-label-success"> Hoạt động</span>;
        } else if (record.status === inactive) {
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

  // Manage deactivate-account modal
  const handleCloseModal = () => setShow(false);

  const handleShowModal = (selectedAccountId) => {
    setShow(true);
    setAccountId(selectedAccountId);
  };

  // Manage deactivate-account action
  const deactivateAccountStatusById = async (accountById) => {
    try {
      // call api
      accountById.status = inactive;

      getAccountsList(pageIndex);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeactivateAccount = (accountId) => {
    const accountById = accounts.find((account) => account.id === accountId);
    deactivateAccountStatusById(accountById);
    setShow(false);
  };

  // Filter accounts list
  const handleChangeAccountStatus = (e) => {
    setPageIndex(1);
    setSearchAccountStatus(e.target.value);
    if (e.target.value === '') {
      getAccountsList();
    }
  };

  const handleChangeAccountEmail = (e) => {
    setPageIndex(1);
    setSearchAccountEmail(e.target.value);
    if (e.target.value === '') {
      getAccountsList();
    }
  };

  const handleChangeAccountRole = (e) => {
    setPageIndex(1);
    setSearchAccountRole(e.target.value);
    if (e.target.value === '') {
      getAccountsList();
    }
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h2>Danh sách tài khoản</h2>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          paddingBottom: 15,
        }}
      >
        <Space>
          <Form.Control
            placeholder="Tìm email"
            onChange={handleChangeAccountEmail}
            value={searchAccountEmail}
            type="text"
          />
          {/* <Form.Control
            placeholder="Tìm tên"
            onChange={handleChangeAccountEmail}
            value={searchAccountEmail}
            type="text"
          /> */}
          <Form.Select
            value={searchAccountRole}
            onChange={handleChangeAccountRole}
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
            onChange={handleChangeAccountStatus}
            aria-label="Chọn trạng thái"
            required
          >
            <option value="">Chọn trạng thái</option>
            {accountStatus.map((status, index) => (
              <option key={index} value={status.id}>
                {status.name}
              </option>
            ))}
          </Form.Select>
        </Space>
      </div>

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

      <CustomModal
        show={show}
        title="Vô hiệu hóa tài khoản"
        body={MSG08}
        handleClose={handleCloseModal}
        handleSubmit={() => handleDeactivateAccount(accountId)}
      />
    </>
  );
}

export default ViewAccountsList;
