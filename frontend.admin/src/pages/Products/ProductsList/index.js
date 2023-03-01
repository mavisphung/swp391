import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Space, Table } from 'antd';
import { Button, Image, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faEye } from '@fortawesome/free-solid-svg-icons';

import birdData from './birdData.json';
import { MSG07, MSG34 } from '~/system/Messages/messages';
import CustomTooltip from '~/ui/CustomTooltip';
import CustomModal from '~/components/Modal';
import { viewProductDetail } from '~/system/Constants/LinkURL';
import {
  active,
  available,
  jpeg,
  jpg,
  outOfStock,
  png,
} from '~/system/Constants/constants';
import { getProductListData } from '~/api/products';
import { categoriesTypesList } from '~/system/Data/types';
import CustomSpinner from '~/ui/CustomSpinner';

const productStatus = [
  {
    id: 2,
    name: 'Có sẵn',
  },
  {
    id: 1,
    name: 'Hết hàng',
  },
];

const ProductsList = () => {
  const { pathname } = useLocation();
  const [products, setProducts] = useState([]);
  const [searchProductName, setSearchProductName] = useState('');
  const [searchProductCode, setSearchProductCode] = useState('');
  const [searchProductType, setSearchProductType] = useState('');
  const [searchProductStatus, setSearchProductStatus] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [productId, setProductId] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState('true');

  // Get all products
  const getProductsList = useCallback(
    async (
      pageIndex,
      searchProductName,
      searchProductType,
      searchProductStatus,
    ) => {
      const data = await getProductListData(
        pageIndex,
        searchProductName,
        searchProductType,
        searchProductStatus,
      );
      setProducts(data.data.map((product) => product));

      let paginationObj = JSON.parse(data.headers['x-pagination']);
      setPageIndex(paginationObj.CurrentPage);
      setPageSize(paginationObj.PageSize);
      setTotalCount(paginationObj.TotalCount);
      setLoading(false);
    },
    [],
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getProductsList(
        pageIndex,
        searchProductName,
        searchProductType,
        searchProductStatus,
      );
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [
    getProductsList,
    pageIndex,
    searchProductName,
    searchProductType,
    searchProductStatus,
  ]);

  // Manage table
  const columns = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'productCode',
      key: 'productCode',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'medias',
      key: 'medias',
      width: 100,
      render: (text, record) => {
        let imageLink = record.medias.filter(
          (media) =>
            media.type === png || media.type === jpeg || media.type === jpg,
        )[0]?.url;
        return (
          <div
            style={{
              display: 'inline-block',
              width: 40,
              height: 40,
              overflow: 'hidden',
              backgroundColor: 'black',
            }}
          >
            <Image src={imageLink} alt={text} style={{ maxHeight: 40 }} />
          </div>
        );
      },
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại hàng',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Tồn kho',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (text, record) => {
        if (record.status === available) {
          return <span className="c-label c-label-success"> Có sẵn</span>;
        } else if (record.status === outOfStock) {
          return <span className="c-label c-label-danger"> Hết hàng</span>;
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
        <Link to={`${pathname}/${viewProductDetail}/${record.id}`}>
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
            disabled={checkDisableButton(record.isDeleted) ? false : true}
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
      productById.isDeleted = active;

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
      {loading ? (
        <CustomSpinner />
      ) : (
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
                {categoriesTypesList.map((type, index) => (
                  <option key={index} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                value={searchProductStatus}
                onChange={handleChangeProductStatus}
                aria-label="Chọn trạng thái"
                required
              >
                <option value="">Chọn trạng thái</option>
                {productStatus.map((status, index) => (
                  <option key={index} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </Form.Select>
            </Space>
          </div>

          <div className="my-3">
            <Table
              rowKey="productCode"
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
      )}
    </>
  );
};

export default ProductsList;
