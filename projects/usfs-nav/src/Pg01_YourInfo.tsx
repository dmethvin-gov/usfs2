import React, { ReactNode } from "react";
import Checkbox from "uswds-widgets/dist/widgets/CheckboxWidget";
import Text from "uswds-widgets/dist/widgets/TextWidget";
import { PageProps } from './types';

// reusable onChange function
//TODO:

//VALIDATION: onChange handler gets the field name and can look it up? Or should it be more compiley?
// ALSO remember dependencies that must be rechecked on change

// assume "your-info" is the itemType.path of this page, will need to sanitize
//  by camelizing and changing slash to underscore, remove other specials
export default function Pg01_YourInfo({values, labels, fields, onChange}: PageProps) {
// need to guard against prop changes that don't affect OUR PAGE'S rendering
//   by making each of these props only contain info for the current page
//   and merging them for the final output (solves page-per-item issue too)
// the onChange handler recalcs the fieldIfs? can we do this lazy, only for current page?
// when are validations performed? do we need onBlur handlers? only for fields with validators?
// how do we implement the hierarchy of objects and arrays in the output?
// this "moreInfo" setup may have been nested in the definition but we de-nest it here?
  return (
    <>
    <Checkbox id="id024" label={labels.sameAsBilling} value={values.sameAsBilling} onChange={onChange}/>
    <Text id="id025" label={labels.firstName} value={values.firstName} onChange={onChange}/>
    <Checkbox id="id026" label={labels.haveMoreInfo} value={values.haveMoreInfo} onChange={onChange}/>
    { fields.moreInfo.showIf &&
      <Text id="id027" label={labels.moreInfo} value={values.moreInfo} onChange={onChange}/> }
    </>
  );
}
