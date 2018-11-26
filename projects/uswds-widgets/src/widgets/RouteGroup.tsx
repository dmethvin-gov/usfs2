import React, { ReactNode } from "react";
import classnames from "classnames";

export interface RouteGroupProps {
  classNames?: any;
  goNext?: () => boolean | void;
  goBack?: () => boolean | void;
  nextLabel?: string;
  backLabel?: string;
  children: ReactNode;
};

export default function RouteGroup({ classNames, goNext, goBack, nextLabel, backLabel, children }: RouteGroupProps) {
  return (
    <>
      <div className={classnames("usfs-route-group", classNames)}>{children}</div>
      {(goBack || goNext) && (
        <div className="usfs-route-group-nav">
          {goBack && (
            <button className="button-back" onClick={goBack}>
              {backLabel || "Back"}
            </button>
          )}
          {goNext && (
            <button className="button-next" onClick={goNext}>
              {nextLabel || "Next"}
            </button>
          )}
        </div>
      )}
    </>
  );
}
