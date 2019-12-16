import React from 'react';
import ReactDOM from "react-dom";
import './CustomInput.scss';
import uniqueId from 'lodash/uniqueId';

interface CustomInputProps {
  label: string,
  value: any,
  type: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

class CustomInput extends React.Component<CustomInputProps, {}> {
  id: string;
  controlGroup: HTMLElement | undefined;
  input: HTMLInputElement | undefined;

  constructor(props: any) {
    super(props);
    this.id = `input_${uniqueId()}`;
  }

  render() {
    return (
      <span className="control-group">
        <label htmlFor={this.id} className="label">{this.props.label}</label>
        <input
          id={this.id}
          className="input"
          type={this.props.type}
          value={this.props.value || ''}
          onChange={this.props.onChange}
          onFocus={this.focusInput}
          onBlur={this.blurInput}
        >
        </input>
      </span>
    );
  }

  componentDidMount() {
    this.controlGroup = ReactDOM.findDOMNode(this) as HTMLElement;
    this.input = this.controlGroup.querySelector('.input') as HTMLInputElement;
  }

  componentDidUpdate() {
    if (this.props.value === null || this.props.value === undefined || this.props.value === '' || this.props.value === 0) {
      if (this.input !== document.activeElement) {
        this.controlGroup!.classList.remove('control-group--is-active', 'control-group--has-text');
      }
    }
  } 

  focusInput(event: React.FocusEvent<HTMLInputElement>) {
    event.target.parentElement!.classList.add('control-group--is-active');
  }

  blurInput(event: React.FocusEvent<HTMLInputElement>) {
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
}

export default CustomInput;