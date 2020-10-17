import React from 'react';
import styled from 'styled-components';

interface CustomMenuOptionProps {
  clicked?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

interface MenuItemOptionProps {
  clicked?: boolean;
}

const MenuItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${props => props.theme.spacings.p32};
  width: 100%;
  box-sizing: border-box;
  padding: 0 ${props => props.theme.spacings.p12};
  min-width: ${props => props.theme.spacings.p64};;
  cursor: pointer;
  transition: background .3s ease-out;
  user-select: none;
  color: black;
  text-decoration: none;

  &:hover {
    background: ${props => props.theme.colors.greyLight3};
  }

  &:focus {
    outline: 3px solid ${props => props.theme.colors.secondaryLight1};
    outline-offset: -3px;
  }
`;

const MenuItemOption = styled.div<MenuItemOptionProps>`
  position: relative;
  display: block;
  height: ${props => props.theme.spacings.p16};
  width: ${props => props.theme.spacings.p32};
  border-radius: ${props => props.theme.spacings.p16};
  margin-left: ${props => props.theme.spacings.p8};
  background: lightgrey;

  &:after {
    content: '';
    position: absolute;
    right: calc(100% - ${props => props.theme.spacings.p12} - ${props => props.theme.spacings.p2});
    top: ${props => props.theme.spacings.p2};
    width: ${props => props.theme.spacings.p12};
    height: ${props => props.theme.spacings.p12};
    border-radius: 50%;
    background: grey;
    transition: all .3s ease-in-out;

    ${props => props.clicked && `
      left: initial;
      right: ${props.theme.spacings.p2};
      background: ${props.theme.colors.primary};
    `}
  }
`;

const Content = styled.span`
  white-space: nowrap;
`;

const CustomMenuOption: React.FC<CustomMenuOptionProps> = (props) => {
  return (
    <MenuItem
      onClick={props.onClick}
      onMouseDown={(evt: React.MouseEvent) => evt.preventDefault()}
      href="#"
    >
      <Content>{props.children}</Content>
      <MenuItemOption clicked={props.clicked}/>
    </MenuItem>
  );
};

export default CustomMenuOption;