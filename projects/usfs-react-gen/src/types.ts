export type ActionEvent = 'input' | 'change' | 'focus' | 'blur' | 'submit' | 'trigger'
export const actionEvents = ['input', 'change', 'focus', 'blur', 'submit', 'trigger']

export type FieldPropertyName =
  | 'value'
  | 'readonly'
  | 'maxlength'
  | 'disabled'
  | 'hidden'
  | 'required'
export const fieldPropertyNames = [
  'value',
  'readonly',
  'maxlength',
  'disabled',
  'hidden',
  'required'
]

export interface FieldProperties {
  value?: string
  readonly?: boolean
  maxlength?: number
  disabled?: boolean
  hidden?: boolean
  required?: boolean
}

export interface FieldContext {
  defn: FieldDefinition
  setProperty(name: FieldPropertyName, value: any): any
  getProperty(name: FieldPropertyName): any
  addError(message: string, args: any): void
  clearErrors(): void
  hasErrors(): boolean
  stopActions(): boolean
}

export interface FieldAction {
  context: FieldContext
  options?: any
  message?: string
  event?: ActionEvent
}

export interface DependentFieldItem {
  definition: FieldDefinition
  properties: { [name: string]: any }
}

export interface FieldDependency {
  context: FieldContext
  fields: DependentFieldItem[]
  options?: any
  message?: string
  event?: ActionEvent
}

export interface WidgetDefinition {
  widget: {} // becomes a React node
  wrapper: {} // becomes a React node
  options: {
    [optionName: string]: any
  }
  label?: string
  value?: string
  actions: FieldAction[]
  dependencies: FieldDependency[]
  children: FieldDefinition[]
}

export interface FieldDefinition extends WidgetDefinition {
  id: string
  name: string
}
