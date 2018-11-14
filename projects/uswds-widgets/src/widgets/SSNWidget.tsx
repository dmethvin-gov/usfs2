import React from "react";
import TextWidget from "./TextWidget";
import { TextWidgetProps } from './TextWidget';

export type SSNWidgetProps = TextWidgetProps;

type SSNWidgetState = {
  val: any;
};

export default class SSNWidget extends React.Component<SSNWidgetProps, SSNWidgetState> {
  constructor(props: SSNWidgetProps) {
    super(props);
    this.state = { val: props.value };
  }
  handleChange = (val: string|undefined) => {
    let strippedSSN = val || undefined;
    if (val) {
      strippedSSN = val.replace(/[- ]/g, "");
    }
    this.setState({ val }, () => {
      this.props.onChange(strippedSSN);
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
