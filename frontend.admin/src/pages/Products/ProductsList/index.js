import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Space, Table } from 'antd';
import { Button, Image, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faEye } from '@fortawesome/free-solid-svg-icons';

import productsData from './productsData.json';
import { MSG07, MSG34 } from '~/system/Messages/messages';
import CustomTooltip from '~/ui/CustomTooltip';
import CustomModal from '~/components/Modal';
import { viewProductDetail } from '~/system/Constants/LinkURL';

const productStatus = [
  {
    id: '1',
    status: true,
    name: 'Hoạt động',
  },
  {
    id: '0',
    status: false,
    name: 'Không hoạt động',
  },
];

const ProductsList = () => {
  const { pathname } = useLocation();
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [searchProductName, setSearchProductName] = useState('');
  const [searchProductCode, setSearchProductCode] = useState('');
  const [searchProductType, setSearchProductType] = useState('');
  const [searchProductStatus, setSearchProductStatus] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [productId, setProductId] = useState('');
  const [show, setShow] = useState(false);

  // Get all products
  const getProductsList = useCallback((pageIndex) => {
    const data = productsData;
    setProducts(data.map((product) => product));

    let allTypesList = data.map((product) => product.CategoryId);
    let uniqueTypes = [...new Set(allTypesList)];
    setProductTypes(uniqueTypes.map((type) => type));

    // setPageSize(data.pageSize);
    // setTotalCount(data.totalCount);
  }, []);

  useEffect(() => {
    getProductsList(pageIndex);
  }, [getProductsList, pageIndex]);

  // Manage table
  const columns = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'ProductCode',
      key: 'ProductCode',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'Url',
      key: 'Url',
      width: 100,
      render: (text, record) => {
        return (
          <Image src={record.Url[0]} alt={text} style={{ maxHeight: 40 }} />
        );
      },
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Phân loại',
      dataIndex: 'CategoryId',
      key: 'CategoryId',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status',
      key: 'Status',
      width: 200,
      render: (text, record) => {
        if (record.Status === true) {
          return <span className="c-label c-label-success"> Hoạt động</span>;
        } else if (record.Status === false) {
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
      render: (text, record) => cellButton(record),
    },
  ];

  const cellButton = (record) => {
    return (
      <Space>
        <Link to={`${pathname}/${viewProductDetail}/${record.ProductCode}`}>
          <CustomTooltip title="Xem chi tiết" color="#014B92">
            <Button variant="outline-info" size="xs">
              <FontAwesomeIcon icon={faEye} size="lg" />
            </Button>
          </CustomTooltip>
        </Link>
        <CustomTooltip title="Vô hiệu hóa" color="#dc3545">
          <Button
            variant="outline-danger"
            size="xs"
            disabled={checkDisableButton(record.Status) ? true : false}
            onClick={() => handleShowModal(record.id)}
          >
            <FontAwesomeIcon icon={faBan} size="lg" />
          </Button>
        </CustomTooltip>
      </Space>
    );
  };

  //Enable the Deactivate Button
  const checkDisableButton = (status) => {
    if (status !== true) {
      return true;
    } else {
      return false;
    }
  };

  // Manage deactivate-product modal
  const handleCloseModal = () => setShow(false);

  const handleShowModal = (selectedProductId) => {
    setShow(true);
    setProductId(selectedProductId);
  };

  // Manage deactivate-product action
  const deactivateProductStatusById = async (productById) => {
    try {
      // call api
      productById.Status = false;

      getProductsList(pageIndex);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeactivateProduct = (productId) => {
    const productById = products.find((product) => product.id === productId);
    deactivateProductStatusById(productById);
    setShow(false);
  };

  // Filter products list
  const handleChangeProductStatus = (e) => {
    setPageIndex(1);
    setSearchProductStatus(e.target.value);
    if (e.target.value === '') {
      getProductsList();
    }
  };

  const handleChangeProductName = (e) => {
    setPageIndex(1);
    setSearchProductName(e.target.value);
    if (e.target.value === '') {
      getProductsList();
    }
  };

  const handleChangeProductCode = (e) => {
    setPageIndex(1);
    setSearchProductCode(e.target.value);
    if (e.target.value === '') {
      getProductsList();
    }
  };

  const handleChangeProductType = (e) => {
    setPageIndex(1);
    setSearchProductType(e.target.value);
    if (e.target.value === '') {
      getProductsList();
    }
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h2>Danh sách sản phẩm</h2>
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
            placeholder="Mã sản phẩm"
            onChange={handleChangeProductCode}
            value={searchProductCode}
            type="text"
          />
          <Form.Control
            placeholder="Tên sản phẩm"
            onChange={handleChangeProductName}
            value={searchProductName}
            type="text"
          />
          <Form.Select
            value={searchProductType}
            onChange={handleChangeProductType}
            aria-label="Chọn phân loại"
            required
          >
            <option value="">Chọn phân loại</option>
          </Form.Select>
          <Form.Select
            value={searchProductStatus}
            onChange={handleChangeProductStatus}
            aria-label="Chọn trạng thái"
            required
          >
            <option value="">Chọn trạng thái</option>
            {productStatus.map((status, index) => (
              <option key={index} value={status.status}>
                {status.name}
              </option>
            ))}
          </Form.Select>
        </Space>
      </div>

      <div className="my-3">
        <Table
          rowKey="ProductCode"
          locale={{ emptyText: MSG07 }}
          columns={columns}
          dataSource={products}
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

      <CustomModal
        show={show}
        title="Vô hiệu hóa sản phẩm"
        body={MSG34}
        handleClose={handleCloseModal}
        handleSubmit={() => handleDeactivateProduct(productId)}
      />
    </>
  );
};

export default ProductsList;
