import React from "react";
import { BaseWidgetProps } from "../types";

export interface CurrencyWidgetProps extends BaseWidgetProps {
  value?: number|string;
  options?: {
    widgetClassNames?: string;
    title?: string;
  }
};

type CurrencyWidgetState = {
  value: string|undefined
};

export default class CurrencyWidget extends React.Component<
  CurrencyWidgetProps,
  CurrencyWidgetState
> {
  constructor(props: CurrencyWidgetProps) {
    super(props);
    let value = props.value? Number(props.value) : undefined;
    if (value !== undefined && isFinite(value)) {
      this.state = { value: value.toFixed(2) };
    } else {
      this.state = { value: undefined };
    }
  }
  onBlur = (e: React.FocusEvent<HTMLInputElement|HTMLSelectElement>) => {
    this.props.onBlur &&
      this.props.onBlur(this.props.id, this.props.name, this.state.value, e);
  };
  handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const value = e.target.value || undefined;
    this.setState({ value }, () => {
      this.props.onChange(this.props.id, this.props.name, value, e);
    });
  };
  render() {
    const { id, name, disabled, autocomplete, options = {} } = this.props;
    const value = this.state.value;
    return (
      <input
        type="text"
        id={id}
        name={name || id}
        disabled={disabled}
        autoComplete={autocomplete}
        className={options.widgetClassNames}
        value={value === undefined ? "" : value}
        onBlur={this.onBlur}
        onChange={this.handleChange}
      />
    );
  }
}
