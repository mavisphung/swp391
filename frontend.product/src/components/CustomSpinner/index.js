import { Spin } from "antd";

import "./CustomSpinner.scss";

const CustomSpinner = ({ text }) => {
  return (
    <div className="container">
      <div className="c-spinner">
        <Spin size="large" />
        <div style={{ marginTop: "20px" }}>{text}</div>
      </div>
    </div>
  );
};

export default CustomSpinner;
