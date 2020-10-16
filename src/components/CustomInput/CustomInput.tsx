import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import uniqueId from 'lodash/uniqueId';

interface CustomInputProps {
  label?: string,
  defaultValue?: any,
  value?: any,
  type?: string,
  fullWidth?: boolean,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const Label = styled.label`
  transition: top .3s ease-out, font-size .3s ease-out;
  top: 0;
  font-size: ${props => props.theme.fontSizes.regular};
  position: absolute;
  margin: ${props => props.theme.spacings.p8} ${props => props.theme.spacings.p4};
  padding: 1px;
  color: ${props => props.theme.colors.greyDark3};
  cursor: text;
`;

interface InputProps {
  fullWidth?: boolean;
};

const Input = styled.input<InputProps>`
  background: transparent;
  font-size: ${props => props.theme.fontSizes.regular};
  margin: ${props => props.theme.spacings.p8} ${props => props.theme.spacings.p4};
  padding: 1px;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.colors.greyDark2};
  color: ${props => props.theme.colors.greyDark5};
  appearance: textfield;
  transition: border-bottom .3s ease-out;
  width: calc(100% - ${props => props.theme.spacings.p8});

  &:focus {
    border-bottom: 1px solid ${props => props.theme.colors.greyDark5};
    outline: 0;
  }

  &:invalid {
    outline: none;
    box-shadow: none;
  }

  ${props => props.fullWidth && css`
    width: 100%;
    margin: 0;
  `}
`;

const ControlGroup = styled.span`
  position: relative;

  &.active,
  &.has-text {
    ${Label} {
      font-size: ${props => props.theme.fontSizes.verySmall};
      top: -${props => props.theme.spacings.p12};
    }
  }

  &.invalid {
    ${Label} {
      color: ${props => props.theme.colors.error};
    }

    ${Input} {
      border-color: ${props => props.theme.colors.error};
      color: ${props => props.theme.colors.error};

      &:focus {
        border-color: ${props => props.theme.colors.error};
      }
    }
  }
`;

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const id = `input_${uniqueId()}`;

  const controlGroup = useRef<HTMLElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (props.value === null || props.value === undefined || props.value === '' || props.value === 0) {
        if (input.current !== document.activeElement) {
          controlGroup.current!.classList.remove('active', 'has-text');
        }
      }
    }
  });

  const focusInput = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.parentElement!.classList.add('active');
  }

  const blurInput = (event: React.FocusEvent<HTMLInputElement>) => {
    if ((event.target.value !== null && event.target.value !== undefined && event.target.value !== '') || !event.target.validity.valid) {
      event.target.parentElement!.classList.add('has-text');
    } else {
      event.target.parentElement!.classList.remove('has-text');
    }
    event.target.parentElement!.classList.remove('active');

    if (!event.target.validity.valid) {
      event.target.parentElement!.classList.add('invalid');
    } else {
      event.target.parentElement!.classList.remove('invalid');
    }
  }

  return (
    <ControlGroup ref={controlGroup}>
      <Label htmlFor={id}>{props.label}</Label>
      <Input
        ref={input}
        id={id}
        fullWidth={props.fullWidth}
        type={props.type || 'text'}
        defaultValue={props.defaultValue}
        value={props.value || (props.type === 'number' && !props.defaultValue ? '' : props.value)}
        onChange={props.onChange}
        onFocus={focusInput}
        onBlur={blurInput}
      ></Input>
    </ControlGroup>
  );
}

export default CustomInput;