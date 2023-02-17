import { Spin } from 'antd';

import './CustomSpinner.scss';

const CustomSpinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="c-spinner">
        <Spin size="large" />
      </div>
    </div>
  );
};

export default CustomSpinner;
