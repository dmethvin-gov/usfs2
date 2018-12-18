import React from "react";
import { BaseWidgetProps } from '../types';

//TODO: widgets should not know these details, pass them in

export interface TextWidgetProps extends BaseWidgetProps {
  value?: string|undefined;
  type?: string;
  maxLength?: number;
  options?: {
    widgetClassNames?: string|undefined;
  };
  onChange: (value: string|undefined) => void;
  onBlur?: (value: string) => void;
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
      autoComplete={String(autocomplete || false)}
      className={options? options.widgetClassNames : undefined}
      value={value === undefined ? "" : value}
      onBlur={onBlur ? (() => onBlur(id)) : undefined}
      onChange={e => onChange(e.target.value || undefined)}
    />
  );
}
