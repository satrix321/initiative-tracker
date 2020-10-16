import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

interface CustomButtonProps {
  icon?: boolean,
  secondary?: boolean,
  clicked?: boolean,
  disabled?: boolean,
  title?: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const Button = styled.button`
  border: none;
  border-radius: ${props => props.theme.spacings.p4};
  color: ${props => props.theme.colors.lightIcon};
  background-color: ${props => props.theme.colors.primary};
  cursor: pointer;
  height: ${props => props.theme.spacings.p32};
  margin: ${props => props.theme.spacings.p4};
  width: ${props => props.theme.spacings.p96};
  transition: background-color .3s ease-out;

  &::-moz-focus-inner {
    border: 0;
    outline: 0;
  }

  &:hover {
    background-color: ${props => props.theme.colors.primaryLight1};
    border: 0;
    outline: 0;
  }

  &:focus {
    border: 3px solid ${props => props.theme.colors.secondaryLight1};
    outline: none;
  }

  &:active {
    background-color: ${props => props.theme.colors.primaryDark2};
  }

  &.disabled {
    background-color: ${props => props.theme.colors.greyDark2};
    cursor: default;
  }

  &.icon {
    width: ${props => props.theme.spacings.p32};
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    > svg {
      width: ${props => props.theme.spacings.p32};
    }
  }

  &.clicked {
    background-color: ${props => props.theme.colors.primaryDark2};

    &:hover {
      background-color: ${props => props.theme.colors.primaryDark2};
    }
  }

  &.secondary {
    background-color: transparent;
    border: 1px solid ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};

    &:hover {
      background-color: ${props => props.theme.colors.primaryLight3};
    }

    &:focus {
      border: 3px solid ${props => props.theme.colors.secondaryLight1};
    }

    &:active {
      border: 1px solid ${props => props.theme.colors.primaryDark3};
      background-color: ${props => props.theme.colors.primaryDark2};
      color: ${props => props.theme.colors.lightIcon};
    }

    &.clicked {
      background-color: ${props => props.theme.colors.primaryDark2};
      border: 1px solid ${props => props.theme.colors.primaryDark3};
      color: ${props => props.theme.colors.lightIcon};

      &:hover {
        background-color: ${props => props.theme.colors.primaryLight1};
      }

      &:focus {
        border: 3px solid ${props => props.theme.colors.secondaryLight1};
      }

      &:active {
        border: 1px solid ${props => props.theme.colors.primaryDark3};
        background-color: ${props => props.theme.colors.primaryDark2};
        color: ${props => props.theme.colors.lightIcon};
      }
    }
  }
`;

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return (
    <Button
      onClick={props.onClick}
      aria-label={props.title}
      disabled={props.disabled}
      title={props.title}
      className={ classNames([
        {'icon': props.icon},
        {'clicked': props.clicked},
        {'secondary': props.secondary},
        {'disabled': props.disabled},
      ])}
    >
      {props.children}
    </Button>
  );
}

export default CustomButton;