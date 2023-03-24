import PropTypes from 'prop-types';
import { Column } from '@ant-design/plots';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { getOrdersRecordsData } from '~/api/statistics';
import NoData from '~/components/NoData';
import {
  dateConvert,
  defaultDatePickerRange,
} from '~/system/Constants/constants';
import CustomSpinner from '~/ui/CustomSpinner';

function BarChart({ start, end }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get Orders records
  const getOrdersRecordList = useCallback(async (start, end) => {
    try {
      const data = await getOrdersRecordsData(start, end);
      setOrders(
        data.data.map((order) => ({
          type: moment(order.createdDate, dateConvert).format(
            defaultDatePickerRange,
          ),
          value: parseInt(order.orders),
        })),
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    getOrdersRecordList(start, end);
  }, [getOrdersRecordList, start, end]);

  const paletteSemanticRed = '#61d9aa';
  const brandColor = '#5B8FF9';
  const config = {
    data: orders.map((o) => o),
    xField: 'type',
    yField: 'value',
    seriesField: '',
    color: ({ type }) => {
      if (type.startsWith('01/')) {
        return paletteSemanticRed;
      }

      return brandColor;
    },
    label: {
      content: (originData) => {
        return originData.value;
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
  };
  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          <h5 style={{ marginBottom: 10 }}>Đơn hàng</h5>
          {orders.length !== 0 ? <Column {...config} /> : <NoData />}
        </>
      )}
    </>
  );
}

BarChart.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
};

export default BarChart;
