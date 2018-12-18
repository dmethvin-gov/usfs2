import React from "react";
import { BaseWidgetProps } from "../types";

export interface YesNoWidgetProps extends BaseWidgetProps {
  value?: boolean;
  options?: {
    yesNoReverse?: boolean;
    labels?: { Y: string; N: string; }
    widgetClassNames?: string|undefined;
    autocomplete?: boolean|undefined;
    title?: string|undefined;
  }
  onChange: (value: boolean) => void;
};

export default function YesNoWidget({
  id,
  name,
  value,
  disabled,
  onChange,
  options = {}
}: YesNoWidgetProps) {
  const { yesNoReverse = false, labels = { Y: "", N: "" } } = options;
  const yesValue = !yesNoReverse;
  const noValue = !yesValue;
  return (
    <div className="form-radio-buttons">
      <input
        type="radio"
        autoComplete="false"
        checked={value === yesValue}
        id={`${id}Yes`}
        name={name || id}
        value="Y"
        disabled={disabled}
        onChange={_ => onChange(yesValue)}
      />
      <label htmlFor={`${id}Yes`}>{labels.Y || "Yes"}</label>
      <input
        type="radio"
        autoComplete="false"
        checked={value === noValue}
        id={`${id}No`}
        name={name || id}
        value="N"
        disabled={disabled}
        onChange={_ => onChange(noValue)}
      />
      <label htmlFor={`${id}No`}>{labels.N || "No"}</label>
    </div>
  );
}
