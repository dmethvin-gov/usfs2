import React from "react";
import { BaseWidgetProps } from "../types";

export interface RadioWidgetProps extends BaseWidgetProps {
  value?: string;
  options: {
    enumOptions: { value: string|number; label: string; }[];
    labels?: { [key: string]: string };
    widgetClassNames?: string;
    autocomplete?: boolean;
    title?: string;
  }
  onChange: (value: string|undefined) => void;
};

export default function RadioWidget({
  options,
  value,
  disabled,
  onChange,
  id,
  name
}: RadioWidgetProps) {
  const { enumOptions, labels = {} } = options;

  return (
    <div>
      {enumOptions.map((option, i) => {
        const checked = option.value === value;
        return (
          <div className="form-radio-buttons" key={option.value}>
            <input
              type="radio"
              autoComplete="false"
              checked={checked}
              id={`${id}_${i}`}
              name={`${name || id}`}
              value={option.value}
              disabled={disabled}
              onChange={_ => onChange(String(option.value))}
            />
            <label htmlFor={`${id}_${i}`}>
              {labels[option.value] || option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
}
