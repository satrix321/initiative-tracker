import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import CustomButton from '../CustomButton/CustomButton';
import classNames from 'classnames';

interface CustomMenuProps {
  activatorIcon?: boolean,
  activatorSecondary?: boolean,
  activatorContent?: any,
}

const Menu = styled.div`
  position: relative;
  margin: 0;
`;

const MenuContent = styled.div`
  position: absolute;
  z-index: 1;
  top: calc(${props => props.theme.spacings.p32} + ${props => props.theme.spacings.p8});
  right: ${props => props.theme.spacings.p4};
  background: ${props => props.theme.colors.greyLight5};
  border-radius: ${props => props.theme.spacings.p4};
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  opacity: 0;
  visibility: hidden;
  transition: opacity .3s ease-out, visibility .3s ease-out;

  &.active {
    visibility: initial;
    opacity: 1;
  }
`;

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
    <Menu ref={componentRef}>
      <div>
        <CustomButton
          icon={props.activatorIcon}
          clicked={active}
          onClick={onMenuClick}
        >{props.activatorContent}</CustomButton>
      </div>
      <MenuContent className={classNames({'active': active})}>
        {props.children}
      </MenuContent>
    </Menu>
  );
}

export default CustomMenu;