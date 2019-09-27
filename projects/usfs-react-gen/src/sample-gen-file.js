// sample generated file
// (...include comments with relevant debugging info...)


// loader: { route: "/address", method: "static" } // "deferred", "lazy"

import TextWidget from "us-forms-system/dist/js/widgets/TextWidget";

import React from 'react';
const rce = React.createElement;

function widget_PhoneNumber(props) {
  return rce(
    TextWidget,
    {
      type: props.type,
      classname: props.classname,
      value: props.value,
      onInput: props.onChange,
      onFocus: props.onFocus,
      onBlur: props.onBlur
    },
    props.children
  )
}

// Should this be the id instead?
function field_phone(props) {
  // props has value, onxxx,
  props = { ...props, {
    classname: "xxx" ///AARG need to merge with props.classname
  }}
  return rce(
    widget_PhoneNumber
  )
}
