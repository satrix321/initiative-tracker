import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  height: ${props => props.theme.spacings.spacing6};
  padding: 0 ${props => props.theme.spacings.spacing3};
  min-width: ${props => props.theme.spacings.spacing8};;
  width: max-content;
  cursor: pointer;
  transition: background .3s ease-out;
  user-select: none;

  &:hover {
    background: ${props => props.theme.colors.greyLight3};
  }

  &.menu-item--is-clicked {
    background: ${props => props.theme.colors.greyDark1};

    &:hover {
      background: ${props => props.theme.colors.greyLight1};
    }
  }
`;

interface CustomMenuItemProps {
  clicked?: boolean,
  onClick: (event: React.MouseEvent<HTMLElement>) => void,
}

const CustomMenuItem: React.FC<CustomMenuItemProps> = (props) => {
  return (
    <MenuItem
      className={classNames({'is-clicked': props.clicked})}
      onClick={props.onClick}
    >
      {props.children}
    </MenuItem>
  );
}

export default CustomMenuItem;