import { Line } from '@ant-design/plots';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { getProfitRecordsData } from '~/api/statistics';
import NoData from '~/components/NoData';
import {
  dateConvert,
  defaultDatePickerRange,
} from '~/system/Constants/constants';
import CustomSpinner from '~/ui/CustomSpinner';

function LineChart() {
  const [loading, setLoading] = useState(true);
  const [profit, setProfit] = useState([]);

  const config = {
    data: profit.map((p) => p),
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      tickCount: 5,
    },
    slider: {
      start: 0,
      end: 0.5,
    },
  };

  // Get Profit records
  const getProfitRecordList = useCallback(async () => {
    try {
      const data = await getProfitRecordsData();
      setProfit(
        data.data.map((profit) => ({
          Date: moment(profit.createdDate, dateConvert).format(
            defaultDatePickerRange,
          ),
          scales: profit.total,
        })),
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getProfitRecordList();
  }, [getProfitRecordList]);

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : (
        <div>
          <h5 style={{ marginBottom: 10 }}>Doanh số</h5>
          {profit.length !== 0 ? <Line {...config} /> : <NoData />}
        </div>
      )}
    </>
  );
}

export default LineChart;
