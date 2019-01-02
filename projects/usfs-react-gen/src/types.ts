
export enum InvocationEvent {
  change = "change",
  focus = "focus",
  submit = "submit",
  manual = "manual"
}

export enum DependentActionType {
  show = "showIf",
  required = "requiredIf",
  disabled = "disabledIf",
  readonly = "readonlyIf"
};

export interface FieldValidator {
  validatorName?: string;
  validator: string; //located using component paths
  options?: any;
  fields?: string[]; //array of dependent fieldNames to look up
  message?: string;
  invocation?: InvocationEvent;
};
// shorthand: validators: [ validator, options, invocation?, fields?  ]
// validators: [
//  [ "integer" ],
//  [ "numberBetween", [ 1, 10 ] ]
// ]

export interface DependentAction {
  actionName?: string;
  action: DependentActionType;
  options?: any;
  fields?: string[]; // array of dependent fieldNames to look up
  invocation?: InvocationEvent;
};
// shorthand: actions: [ action, [ fields ], options, invocation? ]
// actions: [ [ "showIf", false, [ "sameAsBilling" ] ] ]

interface BaseElementDefinition {
  widget: string;
  label?: string;
  value?: string;
  wrapper?: string;
  validations?: FieldValidator[];
  children: any[]; //WidgetDefinition[]|Object[];
  options?: {
    noEarlierValidations: boolean;
  };
};

export interface FieldDefinition extends BaseElementDefinition {
  fieldName: string;
};
// shorthand: [ fieldName, widget, label, value ]

export interface WidgetDefinition extends BaseElementDefinition {
  widgetName: string;
  fieldName?: string;
};

export interface ComponentPath {

};
