import React from 'react';
import './CustomMenuItem.scss';

interface CustomMenuItemProps {
  clicked?: boolean,
  onClick: () => void,
}

class CustomMenuItem extends React.Component<CustomMenuItemProps, {}> {

  render() {
    return (
      <div
        className={`menu-item ${this.props.clicked ? 'menu-item--is-clicked' : ''}`}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

export default CustomMenuItem;