import { useCallback, useEffect, useState } from 'react';
import { Space, Table } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import categoriesListData from './categoryData.json';
import CustomTooltip from '~/ui/CustomTooltip';
import { MSG07 } from '~/system/Messages/messages';

const CategoriesList = () => {
  const { pathname } = useLocation();

  const [categories, setCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [searchCategoryName, setSearchCategoryName] = useState('');
  const [searchCategoryType, setSearchCategoryType] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);

  // Get all accounts
  const getCategoriesList = useCallback((pageIndex) => {
    const data = categoriesListData;
    setCategories(data.map((category) => category));

    let allTypesList = data.map((category) => category.categoryType);
    let uniqueTypes = [...new Set(allTypesList)];
    setCategoryTypes(uniqueTypes.map((type) => type));

    // setPageSize(data.pageSize);
    // setTotalCount(data.totalCount);
  }, []);

  useEffect(() => {
    getCategoriesList(pageIndex);
  }, [getCategoriesList, pageIndex]);

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
      </Space>
    );
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phân loại',
      dataIndex: 'categoryType',
      key: 'categoryType',
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'UpdatedDate',
      key: 'UpdatedDate',
    },
    {
      title: 'Người cập nhật',
      dataIndex: 'UpdatedBy',
      key: 'UpdatedBy',
    },
    {
      title: '',
      dataIndex: 'button',
      key: 'button',
      width: 100,
      render: (text, record) => cellButton(record),
    },
  ];

  // Filter categories list
  const handleChangeCategoryName = (e) => {
    setPageIndex(1);
    setSearchCategoryName(e.target.value);
    if (e.target.value === '') {
      getCategoriesList();
    }
  };

  const handleChangeCategoryType = (e) => {
    setPageIndex(1);
    setSearchCategoryType(e.target.value);
    if (e.target.value === '') {
      getCategoriesList();
    }
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h2>Danh sách loại hàng</h2>
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
            placeholder="Tìm theo tên"
            onChange={handleChangeCategoryName}
            value={searchCategoryName}
            type="text"
          />
          <Form.Select
            value={searchCategoryType}
            onChange={handleChangeCategoryType}
            aria-label="Chọn phân loại"
            required
          >
            <option value="">Chọn phân loại</option>
            {categoryTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </Form.Select>
        </Space>
      </div>

      <Table
        locale={{ emptyText: MSG07 }}
        rowKey="Id"
        columns={columns}
        dataSource={categories}
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
};

export default CategoriesList;
