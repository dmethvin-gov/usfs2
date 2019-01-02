import {
  FieldDefinition,
  WidgetDefinition,
  ComponentPath
} from "./types";

export interface generateFormParams {
  fieldList: FieldDefinition[],
  widgetDefs: WidgetDefinition[],
  componentPaths: ComponentPath[],
  options: {
    logLevel?: integer
  }
};

export default function generateForm({
  fieldList, fieldDefs, widgetDefs, componentPaths, options = {}
}: generateFormParams) {
  // Create map of (unique!) name to object defining it
  const fieldMap = createMap("Field Definition", "fieldName", fieldDefs);
  const widgetMap = createMap("Widget Definition", "widgetName", widgetDefs);


}
