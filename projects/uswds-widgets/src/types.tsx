

export type BaseWidgetProps = {
  id: string;
  label?: string|undefined;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
  autocomplete?: boolean;
  placeholder?: string;
};
