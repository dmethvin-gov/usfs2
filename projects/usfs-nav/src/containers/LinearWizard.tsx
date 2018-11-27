import React, { ReactNode } from "react";
import { BaseWidgetProps } from "../types";
import RouteGroup from "../../../uswds-widgets/src/widgets/RouteGroup";

export interface LinearWizardProps {
  currentRoute: Object;
  navigateTo: (route: Object) => boolean;
  routeList: Array<Object>;
  LanguageContext?: any;
  children: ReactNode;
};

export default function LinearWizard({
  currentRoute,
  routeList,
  navigateTo,
  LanguageContext: lang = {},
  children
}: LinearWizardProps) {
  const currentIndex = routeList.indexOf(currentRoute);
  const goNext = currentIndex >= routeList.length - 1 ?
      undefined :
      () => navigateTo(routeList[currentIndex + 1]);
  const goBack = currentIndex <= 0 ?
      undefined :
      () => navigateTo(routeList[currentIndex - 1]);

  return (
    <RouteGroup goNext={goNext} goBack={goBack} nextLabel={lang.nextLabel} backLabel={lang.backLabel}>
      {children}
    </RouteGroup>
  );
}
