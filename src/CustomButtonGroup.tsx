import React from 'react';
import './CustomButtonGroup.scss';

interface CustomButtonGroupProps {
  
}

class CustomButtonGroup extends React.Component<CustomButtonGroupProps, {}> {

  render() {
    return (
      <span className="button-group">
        {this.props.children}
      </span>
    );
  }
}

export default CustomButtonGroup;