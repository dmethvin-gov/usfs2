import React, { ReactNode } from "react";

export interface RouteNavProps {
  currentIndex: number;
  //TODO types
  navigateTo: (route: any) => boolean;
  routeList: Array<any>;
  navTitle?: string;
};

export default function RouteNav({
  currentIndex,
  routeList,
  navigateTo,
  navTitle
}: RouteNavProps) {
  const navTo = (index: number) => navigateTo(routeList[index]);

  return (
    <nav className="route-nav" aria-labelledBy="route-nav-title">
      <h2 id="route-nav-title">{navTitle}</h2>
      {routeList.map(route => <a href={route.route}>{route.name}</a>)}
    </nav>
  );
}
