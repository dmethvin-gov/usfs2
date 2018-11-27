import React, { ReactNode } from "react";
import RouteGroup from "./RouteGroup";
import RouteNav from "./RouteNav"

export interface SectionNavProps {
  // TODO types
  currentRoute: any;
  navigateTo: (route: any) => boolean;
  routeList: Array<any>;
  LanguageContext?: any;
  children: ReactNode;
};

export default function SectionNav({
  currentRoute,
  routeList,
  navigateTo,
  LanguageContext: lang = {},
  children
}: SectionNavProps) {
  const currentIndex = routeList.indexOf(currentRoute);
  const goNext = currentIndex >= routeList.length - 1 ?
      undefined : () => navigateTo(routeList[currentIndex + 1]);
  const goBack = currentIndex <= 0 ?
      undefined : () => navigateTo(routeList[currentIndex - 1]);

  return (
    <>
    <RouteNav routeList={routeList} currentIndex={currentIndex} navigateTo={navigateTo}/>
    <RouteGroup goNext={goNext} goBack={goBack} nextLabel={lang.nextLabel} backLabel={lang.backLabel}>
      {children}
    </RouteGroup>
    </>
  );
}
