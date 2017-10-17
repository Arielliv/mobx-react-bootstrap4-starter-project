import Form from "../containers/BuildLogContainer/Form/index";
import LogViewWindow from "../containers/ViewLogContainer/LogViewWindow/index";

export enum LogFilter {
  BUILD = "בנייה",
  VIEW = "צפייה"
};

export const LOG_FILTER_TYPES = [
    LogFilter.BUILD,
    LogFilter.VIEW,
];

export const LOG_FILTER_TITLES = {
  [LogFilter.BUILD]: 'בנייה',
  [LogFilter.VIEW]: 'צפייה'
};

export const LOG_FILTER_LOCATION_HASH = {
  [LogFilter.BUILD]: 'build',
  [LogFilter.VIEW]: 'view'
};

export const LOG_FILTER_COMPONENT_HASH = {
    [LogFilter.BUILD]: Form,
    [LogFilter.VIEW]: LogViewWindow
};