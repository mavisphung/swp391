import { Column } from '@ant-design/plots';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { getOrdersRecordsData } from '~/api/statistics';
import {
  dateConvert,
  defaultDatePickerRange,
} from '~/system/Constants/constants';
import CustomSpinner from '~/ui/CustomSpinner';

function BarChart() {
  const [orders, setOrders] = useState([]);
  console.log('🚀 ~ file: index.js:12 ~ BarChart ~ orders:', orders);
  const [loading, setLoading] = useState(true);

  // Get Orders records
  const getOrdersRecordList = useCallback(async () => {
    try {
      const data = await getOrdersRecordsData();
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
    getOrdersRecordList();
  }, [getOrdersRecordList]);

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
          <Column {...config} />
        </>
      )}
    </>
  );
}

export default BarChart;
