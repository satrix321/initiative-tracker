import React from 'react';
import './CustomMenu.scss';
import './CustomButton.scss';

interface CustomMenuProps {
  activatorIcon?: boolean,
  activatorSecondary?: boolean,
  activatorContent?: any,
}

class CustomMenu extends React.Component<CustomMenuProps, {}> {
  state: {
    active: boolean,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      active: false,
    };
  }

  render() {
    return (
      <div className="menu">
        <div className="menu__activator">
          <button
            className={`button ${this.props.activatorIcon ? 'button--icon' : ''}
              ${this.state.active ? 'button--is-clicked' : ''}
              ${this.props.activatorSecondary ? 'button--is-secondary' : ''}`
            }
            onClick={this.activatorClick}
          >
            {this.props.activatorContent}
          </button>
        </div>
        <div className={`menu__content ${this.state.active ? 'menu__content--active' : ''}`}>
          {this.props.children}
        </div>
      </div>
    );
  }

  activatorClick = () => {
    this.setState({ active: !this.state.active });
  }
}

export default CustomMenu;