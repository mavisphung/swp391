import { Tooltip } from 'antd';
import React from 'react';

const CustomTooltip = (props) => {
  return (
    <Tooltip placement="bottom" title={props.title} color={props.color}>
      {props.children}
    </Tooltip>
  );
};

export default CustomTooltip;
