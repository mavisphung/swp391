import { useCallback, useEffect, useState } from 'react';
import { Image, Space, Table } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import CustomSpinner from '~/ui/CustomSpinner';
import CustomTooltip from '~/ui/CustomTooltip';
import { MSG07 } from '~/system/Messages/messages';
import {
  dateConvert,
  defaultDatePickerRange,
} from '~/system/Constants/constants';
import { getCategoriesListData } from '~/api/categories';
import { categoriesTypesList } from '~/system/Data/types';
import { updateCategory } from '~/system/Constants/LinkURL';

const CategoriesList = () => {
  const { pathname } = useLocation();

  const [categories, setCategories] = useState([]);
  const [searchCategoryName, setSearchCategoryName] = useState('');
  const [searchCategoryType, setSearchCategoryType] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [loading, setLoading] = useState(true);

  // Get all categories
  const getCategoriesList = useCallback(
    async (pageIndex, searchCategoryName, searchCategoryType) => {
      try {
        const data = await getCategoriesListData(
          pageIndex,
          10,
          searchCategoryName,
          searchCategoryType,
        );
        setCategories(data.data.map((category) => category));

        let paginationObj = JSON.parse(data.headers['x-pagination']);
        setPageSize(paginationObj.CurrentPage);
        setPageSize(paginationObj.PageSize);
        setTotalCount(paginationObj.TotalCount);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getCategoriesList(pageIndex, searchCategoryName, searchCategoryType);
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [getCategoriesList, pageIndex, searchCategoryName, searchCategoryType]);

  // Table record buttons group
  const cellButton = (record) => {
    return (
      <Space>
        <Link to={`${pathname}/${updateCategory}/${record.id}`}>
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
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 50,
      render: (text, record) => {
        return (
          <>
            <div
              style={{
                display: 'inline-block',
                borderRadius: '50%',
                width: 40,
                height: 40,
                overflow: 'hidden',
                backgroundColor: 'black',
              }}
            >
              <Image src={record.image} />
            </div>
          </>
        );
      },
    },
    {
      title: 'Tên loại hàng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phân loại',
      dataIndex: 'categoryType',
      key: 'categoryType',
      render: (text, record) => {
        let obj = categoriesTypesList.find((c) => c.id === record.categoryType);
        return obj.name;
      },
      responsive: ['lg'],
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedDate',
      key: 'updatedDate',
      align: 'center',
      render: (text, record) => {
        return moment(record.updatedDate, dateConvert)
          .add(7, 'hours')
          .format(defaultDatePickerRange);
      },
    },
    {
      title: 'Người cập nhật',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
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
      getCategoriesList(pageIndex);
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
      {loading ? (
        <CustomSpinner />
      ) : (
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
                {categoriesTypesList.map((type, index) => (
                  <option key={index} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>
            </Space>
          </div>

          <Table
            style={{ maxWidth: '100%' }}
            locale={{ emptyText: MSG07 }}
            rowKey="id"
            columns={columns}
            scroll={{ x: true }}
            dataSource={categories}
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
        </>
      )}
    </>
  );
};

export default CategoriesList;
