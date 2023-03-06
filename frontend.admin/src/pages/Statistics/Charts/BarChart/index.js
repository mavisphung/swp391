import { Column } from '@ant-design/plots';

function BarChart() {
  const data = [
    {
      type: '1-3 đơn',
      value: 0.16,
    },
    {
      type: '4-10 đơn',
      value: 0.125,
    },
    {
      type: '11-30 đơn',
      value: 0.24,
    },
    {
      type: '31-60 đơn',
      value: 0.19,
    },
    {
      type: '1-3 đơn',
      value: 0.22,
    },
    {
      type: '3-10 đơn',
      value: 0.05,
    },
    {
      type: '10-30 đơn',
      value: 0.01,
    },
    {
      type: '30+ đơn',
      value: 0.015,
    },
  ];
  const paletteSemanticRed = '#F4664A';
  const brandColor = '#5B8FF9';
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    seriesField: '',
    color: ({ type }) => {
      if (type === '10-30 đơn' || type === '30+ đơn') {
        return paletteSemanticRed;
      }

      return brandColor;
    },
    label: {
      content: (originData) => {
        const val = parseFloat(originData.value);

        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return (
    <>
      <h5 style={{ marginBottom: 10 }}>Đơn hàng</h5>
      <Column {...config} className="outline-border-shadow" />
    </>
  );
}

export default BarChart;
