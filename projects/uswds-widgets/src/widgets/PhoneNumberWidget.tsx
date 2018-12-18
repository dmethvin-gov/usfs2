import React from "react";
import TextWidget from "./TextWidget";
import { TextWidgetProps } from './TextWidget';

export interface PhoneNumberWidgetProps extends TextWidgetProps {};

interface PhoneNumberWidgetState {
  val: string|undefined;
};

export default class PhoneNumberWidget extends React.Component<
  PhoneNumberWidgetProps,
  PhoneNumberWidgetState
> {
  constructor(props: PhoneNumberWidgetProps) {
    super(props);
    this.state = { val: props.value };
  }
  handleChange = (val: string|undefined) => {
    let stripped = val || undefined;
    if (val) {
      stripped = val.replace(/[ \-()x+]/g, "");
    }
    this.setState({ val }, () => {
      this.props.onChange(stripped);
    });
  };
  render() {
    return (
      <TextWidget
        {...this.props}
        value={this.state.val}
        onChange={this.handleChange}
      />
    );
  }
}
