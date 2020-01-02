import React from 'react';
import './CustomMenuItem.scss';

interface CustomMenuItemProps {
  clicked?: boolean,
  onClick: () => void,
}

const CustomMenuItem: React.FC<CustomMenuItemProps> = (props) => {
  return (
    <div
      className={`menu-item ${props.clicked ? 'menu-item--is-clicked' : ''}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

export default CustomMenuItem;