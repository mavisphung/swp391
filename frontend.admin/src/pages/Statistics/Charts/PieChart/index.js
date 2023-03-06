import { Pie } from '@ant-design/plots';
function PieChart() {
  // Pie chart config
  const data = [
    {
      type: 'Hồ Chí Minh',
      value: 31,
    },
    {
      type: 'Hà Nội',
      value: 21,
    },
    {
      type: 'Đà Nẵng',
      value: 18,
    },
    {
      type: 'Hải Phòng',
      value: 15,
    },
    {
      type: 'Cần Thơ',
      value: 10,
    },
    {
      type: 'Khác',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
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
  return (
    <>
      <h5 style={{ marginBottom: 10 }}>Tỉnh thành</h5>
      <Pie {...config} className="outline-border-shadow" />
    </>
  );
}

export default PieChart;
