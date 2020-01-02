import React from 'react';
import './CustomButton.scss';

interface CustomButtonProps {
  icon?: boolean,
  secondary?: boolean,
  clicked?: boolean,
  ariaLabel?: string,
  onClick: () => void,
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return (
    <button
      className={`button ${props.icon ? 'button--icon' : ''}
        ${props.clicked ? 'button--is-clicked' : ''}
        ${props.secondary ? 'button--is-secondary' : ''}`}
      onClick={props.onClick}
      aria-label={props.ariaLabel}
    >
      {props.children}
    </button>
  );
}

export default CustomButton;