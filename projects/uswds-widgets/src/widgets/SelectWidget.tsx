import React from "react";
import { BaseWidgetProps } from "../types";

export interface SelectWidgetProps extends BaseWidgetProps {
  value?: string|string[];
  multiple?: boolean;
  options: {
    enumOptions: { value: string|number; label: string }[];
    widgetClassNames?: string;
    labels?: { [name: string]: string };
    title?: string;
  };
};

function getValue(event: React.ChangeEvent<HTMLSelectElement>, multiple?: boolean) {
  if (!multiple) {
    return event.target.value || undefined;
  }
  return Array.from(event.target.options)
    .filter(opt => opt.selected)
    .map(opt => opt.value)
    .join() || undefined;
}

export default function SelectWidget({
  id,
  name,
  options,
  value,
  required,
  disabled,
  readonly,
  multiple,
  onChange,
  onBlur,
  placeholder
}: SelectWidgetProps) {
  const { enumOptions, labels = {} } = options;
  return (
    <select
      id={id}
      name={name || id}
      multiple={multiple}
      className={options.widgetClassNames}
      value={value}
      required={required}
      disabled={disabled}
      onBlur={onBlur? ((e) => onBlur(id, name, getValue(e, multiple), e)) : undefined}
      onChange={(e) => onChange(id, name, getValue(e, multiple), e)}
    >
      {!value && <option value="">{placeholder}</option>}
      {enumOptions.map((option, i) => {
        return (
          <option key={i} value={option.value}>
            {labels[option.value] || option.label}
          </option>
        );
      })}
    </select>
  );
}
