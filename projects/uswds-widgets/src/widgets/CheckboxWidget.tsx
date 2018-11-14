import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { BaseWidgetProps } from '../types';

export type CheckboxWidgetProps = BaseWidgetProps & {
  value?: boolean;
  options?: {
    widgetClassNames?: string;
    autocomplete?: boolean;
    title?: string;
  }
  onChange: (value: boolean|undefined) => void;
};

export default function CheckboxWidget({
  id,
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
        name={id}
        checked={value}
        required={required}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}/>
      <label className="schemaform-label" htmlFor={id}>
        {options.title || label}{requiredSpan}
      </label>
    </div>
  );
}
