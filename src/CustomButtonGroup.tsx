import React from 'react';
import './CustomButtonGroup.scss';

interface CustomButtonGroupProps {
  
}

const CustomButtonGroup: React.FC<CustomButtonGroupProps> = (props) => {
  return (
    <span className="button-group">
      {props.children}
    </span>
  );
}

export default CustomButtonGroup;