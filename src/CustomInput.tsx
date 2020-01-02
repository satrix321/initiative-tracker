import React, { useEffect, useRef } from 'react';
import './CustomInput.scss';
import uniqueId from 'lodash/uniqueId';

interface CustomInputProps {
  label?: string,
  defaultValue?: any,
  value?: any,
  type?: string,
  fullWidth?: boolean,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

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
          controlGroup.current!.classList.remove('control-group--is-active', 'control-group--has-text');
        }
      }
    }
  });

  const focusInput = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.parentElement!.classList.add('control-group--is-active');
  }

  const blurInput = (event: React.FocusEvent<HTMLInputElement>) => {
    if ((event.target.value !== null && event.target.value !== undefined && event.target.value !== '') || !event.target.validity.valid) {
      event.target.parentElement!.classList.add('control-group--has-text');
    } else {
      event.target.parentElement!.classList.remove('control-group--has-text');
    }
    event.target.parentElement!.classList.remove('control-group--is-active');

    if (!event.target.validity.valid) {
      event.target.parentElement!.classList.add('control-group--invalid');
    } else {
      event.target.parentElement!.classList.remove('control-group--invalid');
    }
  }

  return (
    <span ref={controlGroup} className="control-group">
      <label htmlFor={id} className="label">{props.label}</label>
      <input
        ref={input}
        id={id}
        className={`input ${props.fullWidth ? 'input--is-full-width' : ''}`}
        type={props.type || 'text'}
        defaultValue={props.defaultValue}
        value={props.value || (props.type === 'number' && !props.defaultValue ? '' : props.value)}
        onChange={props.onChange}
        onFocus={focusInput}
        onBlur={blurInput}
      >
      </input>
    </span>
  );
}

export default CustomInput;