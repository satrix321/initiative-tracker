import React, { useRef, useState } from 'react';
import './CustomMenu.scss';
import './CustomButton.scss';

interface CustomMenuProps {
  activatorIcon?: boolean,
  activatorSecondary?: boolean,
  activatorContent?: any,
}

const CustomMenu: React.FC<CustomMenuProps> = (props) => {
  const [active, setActive] = useState(false);

  const componentRef = useRef<HTMLDivElement>(null);
  const handleWindowClickRef = useRef((event: MouseEvent) => {
    let clickedOutside = !((componentRef.current as HTMLElement === event.target as HTMLElement) || 
      (componentRef.current as HTMLElement).contains(event.target as HTMLElement));

    if (clickedOutside) {
      setActive(false);
      window.removeEventListener('click', handleWindowClickRef.current, false);
    }
  });

  const onMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (!active) {
      window.addEventListener('click', handleWindowClickRef.current, false);
    } else {
      window.removeEventListener('click', handleWindowClickRef.current, false);
    }
    setActive(!active);
  };

  return (
    <div ref={componentRef} className="menu">
      <div className="menu__activator">
        <button
          className={`button ${props.activatorIcon ? 'button--icon' : ''}
            ${active ? 'button--is-clicked' : ''}
            ${props.activatorSecondary ? 'button--is-secondary' : ''}`
          }
          onClick={onMenuClick}
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