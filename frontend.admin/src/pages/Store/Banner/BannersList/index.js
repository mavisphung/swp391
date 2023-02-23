import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Image, Space, Table } from 'antd';
import CustomSpinner from '~/ui/CustomSpinner';
import { MSG07, MSG47, MSG48 } from '~/system/Messages/messages';
import CustomTooltip from '~/ui/CustomTooltip';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { viewBannerDetail } from '~/system/Constants/LinkURL';
import moment from 'moment';
import {
  dateTimeConvert,
  defaultDateTimePickerRange,
} from '~/system/Constants/constants';
import { getBannersListData, removeBanner } from '~/api/banners';
import CustomModal from '~/components/Modal';
import { toast } from 'react-toastify';

const BannersList = () => {
  const { pathname } = useLocation();

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [banners, setBanners] = useState([]);
  const [totalCount, setTotalCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [bannerId, setBannerId] = useState('');

  // Get customer order list
  const getBannersList = useCallback(async (pageIndex) => {
    try {
      const data = await getBannersListData(pageIndex);
      setBanners(data.data.map((order) => order));
      let paginationObj = JSON.parse(data.headers['x-pagination']);
      setPageSize(paginationObj.PageSize);
      setTotalCount(paginationObj.TotalCount);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getBannersList(pageIndex);
  }, [getBannersList, pageIndex]);

  // Manage table
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'id',
      key: 'id',
      width: 20,
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (text, record) => {
        return (
          <>
            <div
              style={{
                display: 'inline-block',
                width: 80,
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
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedDate',
      key: 'updatedDate',
      render: (text, record) => {
        return moment(record.updatedDate, dateTimeConvert).format(
          defaultDateTimePickerRange,
        );
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

  const cellButton = (record) => {
    return (
      <Space>
        <Link to={`${pathname}/${viewBannerDetail}/${record.id}`}>
          <CustomTooltip title="Xem chi tiết" color="#014B92">
            <Button className="mx-2" variant="outline-info" size="xs">
              <FontAwesomeIcon icon={faEye} size="lg" />
            </Button>
          </CustomTooltip>
        </Link>
        <CustomTooltip title="Xóa" color="#dc3545">
          <Button
            variant="outline-danger"
            size="xs"
            onClick={() => handleShowModal(record.id)}
          >
            <FontAwesomeIcon icon={faBan} size="lg" />
          </Button>
        </CustomTooltip>
      </Space>
    );
  };

  // Manage remove banner modal
  const handleCloseModal = () => setShow(false);

  const handleShowModal = (selectedBannerId) => {
    setShow(true);
    setBannerId(selectedBannerId);
  };

  // Manage remove banner action
  const removeBannerById = async (bannerById) => {
    try {
      // call api
      const id = parseInt(bannerById.id);
      await removeBanner(id);

      getBannersList(pageIndex);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveBanner = async (bannerId) => {
    const bannerById = banners.find((banner) => banner.id === bannerId);
    removeBannerById(bannerById);

    toast.success(MSG48, { autoClose: 1500 });
    setShow(false);
  };

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          <div style={{ textAlign: 'center' }}>
            <h2>Danh sách Banner</h2>
          </div>

          <div className="my-3">
            <Table
              rowKey="id"
              locale={{ emptyText: MSG07 }}
              columns={columns}
              dataSource={banners}
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
              summary={() => {
                return (
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={5} />
                    <Table.Summary.Cell>
                      <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <CustomTooltip title="Thêm banner mới" color="#198754">
                          <Button variant="outline-success" size="xs">
                            <FontAwesomeIcon icon={faPlus} size="lg" />
                          </Button>
                        </CustomTooltip>
                      </div>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              }}
            />
          </div>

          <CustomModal
            show={show}
            title={'Xóa banner ' + bannerId}
            body={MSG47}
            handleClose={handleCloseModal}
            handleSubmit={() => handleRemoveBanner(bannerId)}
          />
        </>
      )}
    </>
  );
};

export default BannersList;
