import { ReactNode } from 'react'

export enum InvocationEvent {
  input = 'input',
  change = 'change',
  focus = 'focus',
  blur = 'blur',
  submit = 'submit',
  manual = 'manual'
}

// API for these functions need to allow calls to
// change the form, e.g. show fields or errors

// typically for validation/formatting functions
// onInput: [
//  [ "filterOut", "[^0-9\\.\\-]" ]
// ]
// onChange: [
//  [ "isInteger", null, "Must be integer!" ],
//  [ "isBetween", {min: 1, max: 1000}, "Must be between ${min} and ${max}" ],
//  [ "isMyCustomValidatorWithNoOptions", null, "Validation failed" ],
//  [ "formatNumber", "dddd" ]
// ]
export interface FieldActionJSON {
  action: string //located using component paths
  options?: any // passed as a single arg to the action
  message?: string // most handy for error messages
  invocation?: InvocationEvent // default "change"
}

export enum FieldPropertyName {
  value = 'value',
  readonly = 'readonly',
  maxlength = 'maxlength',
  disabled = 'disabled',
  visible = 'visible',
  required = 'required'
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
  (context: FieldContext, options?: any, message?: string, invocation?: InvocationEvent): void
}

// typically for fieldIf functions
//  showIf, readonlyIf, errorIf
// dependencies: [
//  [ "showIf", "sameAsBilling", false ]
// ]
export interface FieldDependencyJSON {
  check: string //located using component paths
  fields: string | string[] // array of dependent fieldNames to look up
  options?: any // passed as a single arg to the action
  message?: string
  invocation?: InvocationEvent // on the fields, NOT US
}

export interface DependentFieldItem {
  definition: FieldDefinition
  properties: { [name: string]: any }
}

export interface FieldDependency {
  (
    context: FieldContext,
    fields: DependentFieldItem[],
    options?: any,
    message?: string,
    invocation?: InvocationEvent
  ): void
}

// fieldName: { FieldDefinitionJSON }
export interface FieldDefinitionJSON {
  widget: string // a widget or field definition
  name: string
  label?: string
  value?: string
  wrapper?: string
  actions?: []
  children: any[]
  options?: {
    [optionName: string]: any
  }
}

export interface FieldDefinition {
  widget: ReactNode
  wrapper: ReactNode
  name: string
  id: string
  options: {
    [optionName: string]: any
  }
  label?: string
  value?: string
  actions?: FieldAction[]
  dependencies: FieldDependency[]
  children?: FieldDefinition[]
}

export interface ComponentPath {}
