import React from 'react';
import styled from 'styled-components';

interface CustomMenuOptionProps {
  clicked?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const MenuItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: left;
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

const Content = styled.span`
  white-space: nowrap;
`;

const CustomMenuItem: React.FC<CustomMenuOptionProps> = (props) => {
  return (
    <MenuItem
      onClick={props.onClick}
      href="#"
    >
      <Content>{props.children}</Content>
    </MenuItem>
  );
};

export default CustomMenuItem;