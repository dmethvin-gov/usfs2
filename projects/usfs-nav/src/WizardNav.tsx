import React, { ReactNode } from "react";
import RouteGroup from "./RouteGroup";

export interface WizardNavProps {
  // TODO types
  currentRoute: any;
  navigateTo: (route: any) => boolean;
  routeList: Array<any>;
  LanguageContext?: any;
  children: ReactNode;
};

export default function WizardNav({
  currentRoute,
  routeList,
  navigateTo,
  LanguageContext: lang = {},
  children
}: WizardNavProps) {
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
