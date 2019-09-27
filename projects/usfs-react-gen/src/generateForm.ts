import {
  WidgetDefinition,
  WidgetComponents,
  FieldDefinition,
  FieldAction,
  FieldDependency,
  FieldContext,
  actionEvents
} from './types'
import { ReactNode } from 'react'
import { join as joinPath } from 'path'

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

export type WidgetDefinitionJSON = {
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
//----------------------------------------------

// TODO: allow clearing caches and reparsing

const widgetCache: { [widget: string]: WidgetDefinition } = {}
const widgetExtension = '.widget.json'
const widgetPaths = ['./widgets/', 'node_modules/']

function findWidget(widget: string, ext: string, paths: string[]) {
  if (Object.hasOwnProperty.call(widgetCache, widget)) {
    return widgetCache[widget]
  }
  // TODO: locate widget JSON via path search
  // the widget field names THIS widget???
  // the component field names either another widget or code
  const widgetJSON: WidgetDefinitionJSON = {
    widget: 'barf',
    options: {},
    actions: [],
    dependencies: [],
    children: []
  }

  const final: WidgetDefinition = {
    /*
    using: {
      widget: {
        path: "./src/widgets/Text"
      },
      component: {
        path: "materialui/dist/controls/StateSelect",
        shim: "./src/shims/materialui",
        settings: {}
      },
      wrapper: {
        path: "./src/wrappers/standard"
      }
    }
    */
    widget: widgetJSON.widget,
    label: widgetJSON.label || '',
    value: widgetJSON.value,
    wrapper: widgetJSON.wrapper || 'default',
    resolvedWrapper: resolveWrapper(widgetJSON.wrapper),
    options: { ...widgetJSON.options },
    actions: [...parseActions(widgetJSON.actions)],
    dependencies: [...parseDependencies(widgetJSON.dependencies)],
    children: (widgetJSON.children || []).map(parseField)
  }
  return <WidgetDefinition>{}
}

function findComponent(component: string, ext: string, paths: string[]) {
  return null
}

function resolveWidgetToDefinition(widget: string) {
  if (!widget) {
    throw 'Widget must be specified'
  }

  // loop through widget definitions and combine them
  const final: WidgetDefinition = {
    widget: widget,
    resolvedWidget: <WidgetComponents>{ components: [] },
    wrapper: 'default',
    resolvedWrapper: <WidgetComponents>{ components: [] },
    options: {},
    actions: [],
    dependencies: [],
    children: []
  }

  for (
    let defn = final;
    defn; //TODO what is the exit criteria?
    defn = findWidget(defn.widget, widgetExtension, widgetPaths)
  ) {
    //TODO remember widget resolution path
    if (defn.label) {
      final.label = defn.label
    }
    if (defn.value) {
      final.value = defn.value
    }
    if (defn.wrapper) {
      final.wrapper = defn.wrapper
      // we could defer this but would miss errors with unresolved wrappers
      final.resolvedWrapper = resolveWrapper(defn.wrapper)
    }
    // Note: Shallow merges, do we need deep one for options?
    //TODO: is Object.merge (IE11!) better because it uses existing object?
    ;(final.options = { ...final.options, ...defn.options }),
      (final.actions = [...final.actions, ...defn.actions]),
      (final.dependencies = [...final.dependencies, ...defn.dependencies])
  }

  //TODO     resolvedWidget: defn.resolvedWidget,

  // maybe widget field can provide the shim layer for widget libs?
  widgetCache[widget] = final
  return final
}

function resolveWrapper(wrapper?: string) {
  return {
    components: [`./wrappers/${wrapper}`]
  }
}

function resolveAction(action: string) {
  //TODO: how to manage actions based on actions
  return {
    components: [`./actions/${action}`]
  }
}

function parseActions(actionsJSON: FieldActionJSON[] | undefined) {
  if (!actionsJSON) {
    return []
  }
  if (!Array.isArray(actionsJSON)) {
    throw 'Actions must be an array'
  }
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

function parseDependencies(depsJSON: FieldDependency[] | undefined) {
  if (!depsJSON) {
    return []
  }
  if (!Array.isArray(depsJSON)) {
    throw 'Dependencies must be an array'
  }
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
  const defn = resolveWidgetToDefinition(fieldJSON.widget)
  const field: FieldDefinition = {
    id: fieldId,
    name: fieldJSON.name || fieldId,
    widget: fieldJSON.widget,
    resolvedWidget: defn.resolvedWidget,
    label: fieldJSON.label || '',
    value: fieldJSON.value,
    wrapper: fieldJSON.wrapper || defn.wrapper,
    resolvedWrapper: fieldJSON.wrapper ? resolveWrapper(fieldJSON.wrapper) : defn.resolvedWrapper,
    options: { ...defn.options, ...fieldJSON.options },
    actions: [...defn.actions, ...parseActions(fieldJSON.actions || [])],
    dependencies: [...defn.dependencies, ...parseDependencies(fieldJSON.dependencies || [])],
    children: [...defn.children, ...(fieldJSON.children || []).map(parseField)]
  }
  return field
}

export default function parseForm(
  fieldList: FieldDefinitionJSON[],
  options?: {
    widgets?: FieldDefinitionJSON[]
    paths?: ComponentPathJSON[]
    actions?: FieldActionJSON[]
    dependencies?: FieldDependencyJSON[]
    logLevel?: number
  }
) {
  const fields = fieldList.map(parseField)

  console.log(JSON.stringify(fields, null, '\n'))
  return fields
}
