import { Pie } from '@ant-design/plots';
import { useCallback, useEffect, useState } from 'react';
import { getCitiesRecordsData } from '~/api/statistics';
import NoData from '~/components/NoData';
import { PROVINCEVN } from '~/system/Constants/provinceVN';
import CustomSpinner from '~/ui/CustomSpinner';

function PieChart() {
  const [cities, setCities] = useState([]);
  const [chartConfig, setChartConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pie chart config
  const config = {
    appendPadding: 10,
    data: cities.map((c) => c),
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      content: '{percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };

  // Get Cities records
  const getCitiesRecordList = useCallback(async () => {
    try {
      const data = await getCitiesRecordsData();
      setCities(
        data.data.map((province) => ({
          type: handleRenderProvince(province.province),
          value: province.count,
        })),
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getCitiesRecordList();
  }, [getCitiesRecordList]);

  useEffect(() => {
    cities && setChartConfig(config);
  }, [cities]);

  // Get province name by id
  const handleRenderProvince = (id) => {
    let province = PROVINCEVN.province.find(
      (province) => province.idProvince === id,
    );
    return province ? province.name : 'Khác';
  };

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          <h5 style={{ marginBottom: 10, paddingLeft: 20 }}>Tỉnh thành</h5>

          {cities.length !== 0 ? <Pie {...chartConfig} /> : <NoData />}
        </>
      )}
    </>
  );
}

export default PieChart;
