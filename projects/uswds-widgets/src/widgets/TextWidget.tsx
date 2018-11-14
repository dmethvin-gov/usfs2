import React from "react";
import { BaseWidgetProps } from '../types';

//TODO: widgets should not know these details, pass them in

export type TextWidgetProps = BaseWidgetProps & {
  value?: string|undefined;
  type?: string;
  maxLength?: number;
  options?: {
    widgetClassNames?: string|undefined;
  };
  onChange: (value: string|undefined) => void;
  onBlur: (value: string) => void;
};

export default function TextWidget(props: TextWidgetProps) {
  const options = props.options || {};

  return (
    <input
      type={props.type || "text"}
      id={props.id}
      name={props.id}
      disabled={props.disabled}
      maxLength={props.maxLength}
      autoComplete={String(props.autocomplete || false)}
      className={options.widgetClassNames}
      value={props.value === undefined ? "" : props.value}
      onBlur={() => props.onBlur(props.id)}
      onChange={e => props.onChange(e.target.value || undefined)
      }
    />
  );
}
