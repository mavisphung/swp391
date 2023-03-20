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
  const [startPeriod, setStartPeriod] = useState('');
  const [endPeriod, setEndPeriod] = useState('');

  // Get Orders records
  const getOrdersRecordList = useCallback(async (startPeriod, endPeriod) => {
    try {
      const data = await getOrdersRecordsData(startPeriod, endPeriod);
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
    if (start && end) {
      setStartPeriod(start);
      setEndPeriod(end);
    }
  }, [start, end]);

  useEffect(() => {
    setLoading(true);
    getOrdersRecordList(startPeriod, endPeriod);
  }, [getOrdersRecordList, startPeriod, endPeriod]);

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

export default BarChart;
