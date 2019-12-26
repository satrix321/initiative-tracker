import React from 'react';
import './CustomButton.scss';

interface CustomButtonProps {
  icon?: boolean,
  secondary?: boolean,
  clicked?: boolean,
  ariaLabel?: string,
  onClick: () => void,
}

class CustomButton extends React.Component<CustomButtonProps, {}> {

  render() {
    return (
      <button
        className={`button ${this.props.icon ? 'button--icon' : ''}
          ${this.props.clicked ? 'button--is-clicked' : ''}
          ${this.props.secondary ? 'button--is-secondary' : ''}`}
        onClick={this.props.onClick}
        aria-label={this.props.ariaLabel}
      >
        {this.props.children}
      </button>
    );
  }
}

export default CustomButton;