import React from "react";
import { BaseWidgetProps } from "../types";

export interface CurrencyWidgetProps extends BaseWidgetProps {
  value?: number|string;
  options?: {
    widgetClassNames?: string;
    autocomplete?: boolean;
    title?: string;
  }
  onBlur: (value: number|string|undefined) => void;
  onChange: (value: number|string|undefined) => void;
};

type CurrencyWidgetState = {
  value: number|string|undefined
};

export default class CurrencyWidget extends React.Component<
  CurrencyWidgetProps,
  CurrencyWidgetState
> {
  constructor(props: CurrencyWidgetProps) {
    super(props);
    let value = props.value;
    if (typeof value === "number") {
      value = value.toFixed(2);
    }
    this.state = {
      value
    };
  }
  onBlur = () => {
    this.props.onBlur(this.props.id);
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val === "" || typeof val === "undefined") {
      this.props.onChange(undefined);
    } else {
      // Needs to look like a currency
      if (!/^\${0,1}[0-9,]*(\.\d{1,2})?$/.test(val)) {
        this.props.onChange(val);
      } else {
        // Needs to parse as a number
        const parsed = parseFloat(val.replace(/[^0-9.]/g, ""));
        if (!isNaN(parsed)) {
          this.props.onChange(parsed);
        } else {
          this.props.onChange(val);
        }
      }
    }
    this.setState({ value: val });
  };
  render() {
    const { id, name, disabled, options = {} } = this.props;
    const value = this.state.value;
    return (
      <input
        type="text"
        id={id}
        name={name || id}
        disabled={disabled}
        autoComplete={String(options.autocomplete || false)}
        className={options.widgetClassNames}
        value={typeof value === "undefined" ? "" : value}
        onBlur={this.onBlur}
        onChange={this.handleChange}
      />
    );
  }
}
