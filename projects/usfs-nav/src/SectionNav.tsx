import React, { ReactNode } from "react";
import RouteGroup from "./RouteGroup";

export interface SectionNavProps {
  // TODO types
  currentRoute: any;
  navigateTo: (route: any) => boolean;
  routeList: Array<any>;
  navTitle?: string;
  LanguageContext?: any;
  children: ReactNode;
};

export default function SectionNav({
  currentRoute,
  routeList,
  navigateTo,
  LanguageContext: lang = {},
  navTitle,
  children
}: SectionNavProps) {
  const currentIndex = routeList.indexOf(currentRoute);
  const goNext = currentIndex >= routeList.length - 1 ?
      undefined : () => navigateTo(routeList[currentIndex + 1]);
  const goBack = currentIndex <= 0 ?
      undefined : () => navigateTo(routeList[currentIndex - 1]);
  const navTo = (index: number) =>
    (e: any) => {
      e.stopPropagation();
      navigateTo(routeList[index]);
    }
  return (
    <>
    <nav className="route-nav" aria-labelledby="route-nav-title">
      <h2 id="route-nav-title">{navTitle}</h2>
      {routeList.map((route, i) =>
        <a key={route.route} href={route.route} onClick={navTo(i)}>{route.name}</a>
      )}
    </nav>
    <RouteGroup goNext={goNext} goBack={goBack} nextLabel={lang.nextLabel} backLabel={lang.backLabel}>
      {children}
    </RouteGroup>
    </>
  );
}
