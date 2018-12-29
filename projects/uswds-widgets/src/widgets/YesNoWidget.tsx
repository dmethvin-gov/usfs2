import React from "react";
import { BaseWidgetProps } from "../types";

export interface YesNoWidgetProps extends BaseWidgetProps {
  value?: boolean;
  options?: {
    yesNoReverse?: boolean;
    labels?: { Y?: string; N?: string; }
    widgetClassNames?: string;
    title?: string;
  }
};

export default function YesNoWidget({
  id,
  name,
  value,
  disabled,
  onChange,
  options = {}
}: YesNoWidgetProps) {
  const { yesNoReverse = false, labels = {} } = options;
  const yesBool = !yesNoReverse;
  return (
    <div className="form-radio-buttons">
      <input
        type="radio"
        checked={value === yesBool}
        id={`${id}Yes`}
        name={name || id}
        value="Y"
        disabled={disabled}
        onChange={(e) => onChange(id, name, yesBool, e)}
      />
      <label htmlFor={`${id}Yes`}>{labels.Y || "Yes"}</label>
      <input
        type="radio"
        checked={value === !yesBool}
        id={`${id}No`}
        name={name || id}
        value="N"
        disabled={disabled}
        onChange={(e) => onChange(id, name, !yesBool, e)}
      />
      <label htmlFor={`${id}No`}>{labels.N || "No"}</label>
    </div>
  );
}
