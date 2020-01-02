import React, { useState } from 'react';
import './CustomMenu.scss';
import './CustomButton.scss';

interface CustomMenuProps {
  activatorIcon?: boolean,
  activatorSecondary?: boolean,
  activatorContent?: any,
}

const CustomMenu: React.FC<CustomMenuProps> = (props) => {
  const [active, setActive] = useState(false);

  return (
    <div className="menu">
      <div className="menu__activator">
        <button
          className={`button ${props.activatorIcon ? 'button--icon' : ''}
            ${active ? 'button--is-clicked' : ''}
            ${props.activatorSecondary ? 'button--is-secondary' : ''}`
          }
          onClick={() => setActive(!active)}
        >
          {props.activatorContent}
        </button>
      </div>
      <div className={`menu__content ${active ? 'menu__content--active' : ''}`}>
        {props.children}
      </div>
    </div>
  );
}

export default CustomMenu;