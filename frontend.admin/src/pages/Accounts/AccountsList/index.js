import { useCallback, useEffect, useState } from 'react';
import { Image, Space, Table } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faEye, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import { MSG07, MSG08, MSG42 } from '~/system/Messages/messages';
import CustomTooltip from '~/ui/CustomTooltip';
import CustomSpinner from '~/ui/CustomSpinner';
import CustomModal from '~/components/Modal';
import { useUserAuth } from '~/context/UserAuthContext';
import { updateAccount } from '~/system/Constants/LinkURL';
import { active, Admin, inactive } from '~/system/Constants/constants';
import { getAccountsListData } from '~/api/accounts';
import { accountRoles } from '~/system/Data/roles';
import { accountStatus } from '~/system/Data/status';

import '../../../styles/Component/button.scss';
import '../../../styles/Component/label.scss';
import '../../../styles/Component/table.scss';

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
  const [loading, setLoading] = useState(true);

  // Get all accounts
  const getAccountsList = useCallback(
    async (pageIndex, searchAccountStatus) => {
      try {
        if (searchAccountStatus === '') {
          const data = await getAccountsListData(pageIndex);
          setAccounts(data.data.map((account) => account));

          let paginationObj = JSON.parse(data.headers['x-pagination']);
          setPageSize(paginationObj.PageSize);
          setTotalCount(paginationObj.TotalCount);
        } else {
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  useEffect(() => {
    getAccountsList(pageIndex, searchAccountStatus);
  }, [getAccountsList, pageIndex, searchAccountStatus]);

  //Enable the Deactivate Button
  const checkDisableButton = (email, isDeleted) => {
    if (user.email === email) {
      return true;
    } else if (isDeleted !== inactive) {
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
        {user.roleId === Admin ? (
          <CustomTooltip title="Vô hiệu hóa" color="#dc3545">
            <Button
              variant="outline-danger"
              size="xs"
              disabled={
                checkDisableButton(record.email, record.isDeleted)
                  ? true
                  : false
              }
              onClick={() => handleShowModal(record.id)}
            >
              <FontAwesomeIcon icon={faBan} size="lg" />
            </Button>
          </CustomTooltip>
        ) : (
          <></>
        )}
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
      title: 'Ảnh',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 50,
      render: (text, record) => {
        return record.avatar ? (
          <>
            <div
              style={{
                display: 'inline-block',
                borderRadius: '50%',
                width: 40,
                height: 40,
                overflow: 'hidden',
              }}
            >
              <Image src={record.avatar} />
            </div>
          </>
        ) : (
          <FontAwesomeIcon style={{ fontSize: 40 }} icon={faUserCircle} />
        );
      },
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (text, record) => {
        const roleName = accountRoles.find(
          (role) => role.id === record.roleId,
        )?.name;
        return roleName || 'NaN';
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (text, record) => {
        return record.phone || 'Chưa cập nhật';
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      width: 200,
      render: (text, record) => {
        if (record.isDeleted === inactive) {
          return <span className="c-label c-label-success"> Hoạt động</span>;
        } else if (record.isDeleted === active) {
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
    toast.success(MSG42, { autoClose: 1500 });
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
      {loading ? (
        <CustomSpinner />
      ) : (
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
                  <option key={index} value={status.value}>
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
              showSizeChanger: false,
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
      )}
    </>
  );
}

export default ViewAccountsList;
