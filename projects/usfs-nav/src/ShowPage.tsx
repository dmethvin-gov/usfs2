
import React, { ReactNode } from "react";
import { PageProps } from './types.d';

// this would be passed to ShowPage via props
import Pg01_YourInfo from './Pg01_YourInfo';

//---------
// goes into RouteList.tsx? or maybe types.tsx?

// includes ALL routes in the app
export interface RouteItem {
  name: string;           // does this have to be unique? where used in UI?
  path: string;           // unique URL of this route
  group?: string;         // group id for "chapters"?
  container: ReactNode;   // container element, e.g. SectionNav
  elements: ReactNode;    // form elements in the container, from generator
};

export interface FieldItem {
  widget: typeof React.Component;
  widgetName: string;
  id: string;
  name: string;
  label?: string;
  title?: string;
  dataType: string; // "string", "number", "boolean", "object", "array", "CustomType?"
  dependents: FieldItem[];
  filter?: (fi: FieldItem, newValue: any, oldValue: any) => any;
  showChildrenValue?: string | number | boolean;
}
// info about the fields, this data is not state data and should be set once
// or else you should forceRender to redraw
const fields : { [name: string]: FieldItem } = Object.create(null);

// Needs to be State and not static
const values : any = Object.create(null);

// what references do we need here? by default we just get the DOM element
// so we have the (raw) field name and native props but is that enough?
// since the name is the key we can look up fieldIfs and validations at least
//TODO: this won't work for arrays or objects unless we do special stuff with name;
//TODO: not sure what event to hook here (often won't be change, maybe input specific)
// GLOBALS: fields, values
function onChange(e: any) {
  const target = e.target;
  const name = target.name;
  const field = fields[name];
  const oldValue = values[name];
  let newValue = target.type === "checkbox" ? target.checked : target.value;
  // remove chars or reformat the output (issues with caret position?)
  if (field.filter) {
    newValue = field.filter(field, newValue, oldValue);
  }
  //TODO: can you reformat a checkbox (inverting value?) or multiselect?
  if (oldValue === newValue) {
    return;
  }
  target.value = newValue;
  field.dependents.forEach(f => {
    // run the dependent's fieldIf functions, passing needed field values
    //TODO: can these be async?
  });
  // run eager validations? clear existing errors?
}

export interface ShowPageProps {
  Page: typeof React.Component;
  // Optional because it's only for external save
  //TODO: is this the right sig? what about nested stuff?
  //onPageChange?: (name: string, value: string) => void;
}
export function ShowPage({ Page, ...otherProps }: ShowPageProps) {
  return (
    <Page onChange={onChange} {...otherProps}/>
  );
}
