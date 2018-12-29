import React from "react";
import TextWidget from "./TextWidget";
import { TextWidgetProps } from './TextWidget';

export interface SSNWidgetProps extends TextWidgetProps {};

type SSNWidgetState = {
  value: string|boolean|undefined;
  stripped: string|boolean|undefined;
};

export default class SSNWidget extends React.Component<SSNWidgetProps, SSNWidgetState> {
  constructor(props: SSNWidgetProps) {
    super(props);
    this.state = {
      value: props.value,
      //TODO: unscrew since it needs to be stripped here
      stripped: undefined
    };
  }
  handleChange: SSNWidgetProps["onChange"] = (id, name, value, e) => {
    let stripped: string|undefined = undefined;
    if (value !== undefined) {
      stripped = String(value).replace(/[ \-()x+]/g, "");
    }
    this.setState({ value, stripped }, () => {
      this.props.onChange(id, name, stripped, e);
    });
  };
  handleBlur: SSNWidgetProps["onBlur"] = (id, name, value, e) => {
    if (this.props.onBlur) {
        this.props.onBlur(id, name, this.state.stripped, e);
    }
  };
  render() {
    return (
      <TextWidget
        {...this.props}
        value={this.state.value === undefined? undefined : String(this.state.value)}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}
