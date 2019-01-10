import {
  WidgetDefinition,
  FieldDefinition,
  FieldAction,
  FieldDependency,
  FieldContext,
  actionEvents
} from './types'
import { ReactNode } from 'react'

// typically for validation/formatting functions
//  [ "input", "filterOut", "[^0-9\\.\\-]" ]
//  [ "change", "isInteger", null, "Must be integer!" ],
//  [ "change", "isBetween", {min: 1, max: 1000}, "Must be between ${min} and ${max}" ],
//  [ "change", "isMyCustomValidatorWithNoOptions", null, "Validation failed" ],
//  [ "change", "formatNumber", "dddd" ]
// ]
export type FieldActionJSON =
  | {
      event: string //
      action: string //located using component paths
      options?: any // passed as a single arg to the action
      message?: string // most handy for error messages
    }
  | [string, string, any?, string?]

// typically for fieldIf functions
//  showIf, readonlyIf, errorIf
// dependencies: [
//  [ "showIf", "sameAsBilling", false ]
// ]
export type FieldDependencyJSON =
  | {
      check: string //located using component paths
      fields: string | string[] // array of dependent fieldNames to look up
      options?: any // passed as a single arg to the action
      message?: string
      invocation?: string // on the fields, NOT US
    }
  | [string, string | string[], any?, string?]

// fieldName: { FieldDefinitionJSON }
export type FieldDefinitionJSON =
  | {
      name: string
      widget: string
      label?: string
      value?: string
      options?: {
        [optionName: string]: any
      }
      wrapper?: string
      actions?: []
      dependencies?: []
      children?: any[]
    }
  | [string, string, string, string]

export interface ComponentPathJSON {
  //TODO: TBD
  path?: string
}
//----------

// TEMP
parseForm([
  {
    widget: 'Text',
    name: 'first',
    label: 'First Name'
  }
])

let idnumber = 1

function resolveWidget(widget: string) {
  if (!widget) {
    throw 'Widget must be specified'
  }
  // map widget name to physical widget code (TODO have a cache?)
  //  -- this can be recursive and set other properties
  // should all widgets just be JSON files and at some point have "component"?
  // maybe widget field can provide the shim layer for widget libs?
  return <WidgetDefinition>{
    id: '',
    widget: {
      component: `./widgets/${widget}`
    },
    wrapper: resolveWrapper(),
    options: {},
    actions: [],
    dependencies: [],
    children: []
  }
}

function resolveWrapper(wrapper?: string) {
  return {
    component: `./wrappers/${wrapper}`
  }
}

function resolveAction(action: string) {
  //TODO: how to manage actions based on actions
  return {
    component: `./actions/${action}`
  }
}

function parseActions(actionsJSON: FieldActionJSON[]) {
  return <FieldAction[]>actionsJSON.map(entry => {
    if (Array.isArray(entry)) {
      entry = {
        event: entry[0],
        action: entry[1],
        options: entry[2],
        message: entry[3]
      }
    }
    if (!actionEvents.includes(entry.event)) {
      throw 'Missing or invalid event name for action'
    }
    if (entry.message && typeof entry.message !== 'string') {
      throw 'Message field must be a string for action'
    }
    return {
      context: <FieldContext>{}, // Filled at runtime
      event: entry.event,
      action: resolveAction(entry.action),
      options: entry.options,
      message: entry.message
    }
  })
}

function parseDependencies(depsJSON: FieldDependency[]) {
  //TODO
  return <FieldDependency[]>[]
}

let fieldid = 1

function parseField(fieldJSON: FieldDefinitionJSON) {
  // shorthand [ name, widget, label, value ]
  if (Array.isArray(fieldJSON)) {
    fieldJSON = {
      name: fieldJSON[0],
      widget: fieldJSON[1],
      label: fieldJSON[2],
      value: fieldJSON[3]
    }
  }

  const fieldId = `id${('000' + fieldid++).substr(-4)}`
  const widget = resolveWidget(fieldJSON.widget)
  const field: FieldDefinition = {
    id: fieldId,
    name: fieldJSON.name || fieldId,
    widget: widget,
    label: fieldJSON.label || '',
    value: fieldJSON.value,
    wrapper: widget.wrapper || resolveWrapper(fieldJSON.wrapper || 'default'),
    options: { ...widget.options, ...fieldJSON.options },
    actions: [...widget.actions, ...parseActions(fieldJSON.actions || [])],
    dependencies: [...widget.dependencies, ...parseDependencies(fieldJSON.dependencies || [])],
    children: [...widget.children, ...(fieldJSON.children || []).map(parseField)]
  }
  return field
}

export default function parseForm(
  fieldList: FieldDefinitionJSON[],
  options?: {
    widgets?: FieldDefinitionJSON[]
    paths?: ComponentPathJSON[]
    actions?: FieldActionJSON[]
    logLevel?: number
  }
) {
  const fields = fieldList.map(parseField)

  console.log(JSON.stringify(fields, null, '\n'))
  return fields
}
