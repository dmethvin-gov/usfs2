import React from "react";
import TextWidget from "./TextWidget";
import { TextWidgetProps } from './TextWidget';

export type PhoneNumberWidgetProps = TextWidgetProps;

export default function EmailWidget(
  props: PhoneNumberWidgetProps
) {
  return <TextWidget type="email" {...props} />;
}
