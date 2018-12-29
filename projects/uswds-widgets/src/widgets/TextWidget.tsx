import React from "react";
import { BaseWidgetProps } from '../types';

//TODO: widgets should not know these details, pass them in

export interface TextWidgetProps extends BaseWidgetProps {
  value?: string;
  type?: string;
  maxLength?: number;
  options?: {
    widgetClassNames?: string;
  };
};

export default function TextWidget({
  type,
  id,
  name,
  disabled,
  maxLength,
  autocomplete,
  value,
  onBlur,
  onChange,
  options
}: TextWidgetProps) {
  return (
    <input
      type={type || "text"}
      id={id}
      name={name || id}
      disabled={disabled}
      maxLength={maxLength}
      autoComplete={autocomplete}
      className={options? options.widgetClassNames : undefined}
      value={value === undefined ? "" : value}
      onBlur={onBlur ? ((e) => onBlur(id, name, e.target.value || undefined, e)) : undefined}
      onChange={(e) => onChange(id, name, e.target.value || undefined, e)}
    />
  );
}
