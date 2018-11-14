import React from "react";
import { BaseWidgetProps } from "../types";

export type SelectWidgetProps = BaseWidgetProps & {
  value?: string|string[];
  multiple?: boolean;
  options: {
    enumOptions: { value: string|number; label: string }[];
    widgetClassNames?: string;
    labels?: { [name: string]: string };
    autocomplete?: boolean|undefined;
    title?: string|undefined;
  }
  onBlur: (id: string) => void;
  onChange: (value: string|undefined) => void;
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
      name={id}
      multiple={multiple}
      className={options.widgetClassNames}
      value={value}
      required={required}
      disabled={disabled}
      onBlur={e => onBlur(id)}
      onChange={e => onChange(getValue(e, multiple))}
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
