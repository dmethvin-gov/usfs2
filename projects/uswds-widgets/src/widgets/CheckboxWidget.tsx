import React from 'react';
import classNames from 'classnames';
import { BaseWidgetProps } from '../types';

export interface CheckboxWidgetProps extends BaseWidgetProps {
  value?: boolean;
  options?: {
    widgetClassNames?: string;
    autocomplete?: boolean;
    title?: string;
  }
};

export default function CheckboxWidget({
  id,
  name,
  required,
  value,
  disabled,
  label,
  onChange,
  options = {}
}: CheckboxWidgetProps) {
  const requiredSpan = required ? <span className="form-required-span">*</span> : null;
  return (
    <div className={classNames('form-checkbox', options.widgetClassNames)}>
      <input type="checkbox"
        id={id}
        name={name || id}
        checked={value}
        required={required}
        disabled={disabled}
        onChange={(e) => onChange(id, name, e.target.checked, e)}/>
      <label className="schemaform-label" htmlFor={id}>
        {options.title || label}{requiredSpan}
      </label>
    </div>
  );
}
