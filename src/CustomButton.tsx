import React from 'react';
import './CustomButton.scss';

interface CustomButtonProps {
  icon?: boolean,
  secondary?: boolean,
  clicked?: boolean,
  disabled?: boolean,
  title?: string,
  onClick: () => void,
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return (
    <button
      className={`button ${props.icon ? 'button--icon' : ''}
        ${props.clicked ? 'button--is-clicked' : ''}
        ${props.secondary ? 'button--is-secondary' : ''}
        ${props.disabled ? 'button--is-disabled' : ''}
      `}
      onClick={props.onClick}
      aria-label={props.title}
      disabled={props.disabled}
      title={props.title}
    >
      {props.children}
    </button>
  );
}

export default CustomButton;