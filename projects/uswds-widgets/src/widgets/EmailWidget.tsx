import React from "react";
import TextWidget from "./TextWidget";
import { TextWidgetProps } from './TextWidget';

export interface EmailWidgetProps extends TextWidgetProps {};

export default function EmailWidget(
  props: EmailWidgetProps
) {
  return <TextWidget type="email" {...props} />;
}
