import { ReactNode } from "react";

export interface PageProps {
  //TODO: types
  fields: any;    // map of field name to object of field-specific info
  values: any;    // map of field name to value (converted value?)
  labels: any;    // map of field name to label string
  onChange: (e: any) => undefined;  // function called on change (really, onInput)
  onBlur?: (e: any) => undefined; // function called on blur

};
