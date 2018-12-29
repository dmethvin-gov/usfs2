

export interface BaseWidgetProps {
  id: string;
  name?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
  autocomplete?: string;
  placeholder?: string;
  onChange: (id: string, name: string|undefined, value: string|boolean|undefined, event: any) => void;
  onBlur?: (id: string, name: string|undefined, value: string|boolean|undefined, event: any) => void;
};
