import React from "react";
import { formatISOPartialDate, parseISODate, monthInfo, ISODateParts } from "../utilities/dates";
import { BaseWidgetProps } from "../types";

export interface DateWidgetProps extends BaseWidgetProps {
  value?: string;
  options?: {
    monthYear?: boolean;
    widgetClassNames?: string;
    title?: string;
  }
};

type DateWidgetState = {
  year: string|undefined;
  month: string|undefined;
  day: string|undefined;
  touched: { month: boolean, day: boolean, year: boolean };
  [field: string]: any;
};

function getEmptyState(value: string|undefined) {
  const ymd = (value || "").split("-");
  return {
    year: ymd[0],
    month: ymd[1],
    day: ymd[2],
    touched: {
      month: false,
      day: false,
      year: false
    }
  };
}
export default class DateWidget extends React.Component<
  DateWidgetProps,
  DateWidgetState
> {
  constructor(props: DateWidgetProps) {
    super(props);
    this.state = getEmptyState(this.props.value);
  }
  //TODO: this is the same as change?
  handleBlur = (field: string, e: React.FocusEvent<HTMLInputElement|HTMLSelectElement>) => {
    this.setState({ touched: { ...this.state.touched, [field]: true } }, () => {
      if (this.props.onBlur) {
        // Validate on blur of a subfield if all subfields have been touched
        const { year, month, day } = this.state.touched;
        if ( year && month &&
            (day || (this.props.options || {}).monthYear) ) {
          this.props.onBlur(this.props.id, this.props.name, formatISOPartialDate(this.state as ISODateParts), e);
        }
      }
    });
  }
  handleChange = (field: string, e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    this.setState(
      { [field]: e.target.value, touched: { ...this.state.touched, [field]: true } },
      () => {
        if (this.props.required) {
          if ( !this.state.year || !this.state.month || !this.state.day ) {
            this.props.onChange(this.props.id, this.props.name, undefined, e);
            return;
          }
        }
        this.props.onChange(this.props.id, this.props.name, formatISOPartialDate(this.state as ISODateParts), e);
      }
    );
  }
  render() {
    const { id, name, options = {} } = this.props;
    const { month, day, year } = this.state;
    let daysInMonth;
    const monthYear = options.monthYear;
    if (month && !monthYear) {
      daysInMonth = monthInfo[Number(month)-1].days;
    }
    return (
      <div className="usa-date-of-birth row">
        <div className="form-datefield-month">
          <label className="input-date-label" htmlFor={`${id}Month`}>
            Month
          </label>
          <select
            autoComplete="false"
            name={`${name || id}Month`}
            id={`${id}Month`}
            value={month? month.replace(/^0/,"") : undefined}
            onChange={event => this.handleChange("month", event)}
          >
            <option value="" />
            {monthInfo.map((mi) => (
              <option key={mi.value} value={mi.value}>
                {mi.label}
              </option>
            ))}
          </select>
        </div>
        {!monthYear && (
          <div className="form-datefield-day">
            <label className="input-date-label" htmlFor={`${id}Day`}>
              Day
            </label>
            <select
              autoComplete="false"
              name={`${name || id}Day`}
              id={`${id}Day`}
              value={day? day.replace(/^0/,"") : undefined}
              onChange={event => this.handleChange("day", event)}
            >
              <option value="" />
              {daysInMonth &&
                Array(daysInMonth).fill(0).map((_, i) => (
                  <option key={i+1} value={i+1}>
                    {i+1}
                  </option>
                ))}
            </select>
          </div>
        )}
        <div className="usa-datefield usa-form-group usa-form-group-year">
          <label className="input-date-label" htmlFor={`${id}Year`}>
            Year
          </label>
          <input
            type="number"
            autoComplete="false"
            name={`${name || id}Year`}
            id={`${id}Year`}
            max="3000"
            min="1900"
            pattern="[0-9]{4}"
            value={year}
            onBlur={(event) => this.handleBlur("year", event)}
            onChange={event => this.handleChange("year", event)}
          />
        </div>
      </div>
    );
  }
}
