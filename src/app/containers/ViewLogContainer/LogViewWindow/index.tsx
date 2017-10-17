/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import { Body } from '../../../components/BuildLogComponents/Body';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import * as style from './style.css';
import {RouteComponentProps} from "react-router";
import {inject, observer} from "mobx-react";
import {STORE_LOG_ARRAY, STORE_ROUTER} from "../../../constants/stores";
import {LogArrayStore} from "../../../stores/LogArrayStore";
import {ILogModel} from "../../../models/ILogModel";
import {RouterStore} from "../../../stores/RouterStore";
import Nav, {default as NavBarContainer} from "../../../components/GeneralComponents/NavBarContainer/index";
import {LOG_FILTER_LOCATION_HASH, LogFilter} from "../../../constants/appRouts";
import LogView from "../../../components/ViewLogComponents/LogView/index";
// import {LOG_FILTER_LOCATION_HASH, TodoFilter} from "../../constants/todos";


// import * as style from './style.css';

export interface LogViewWindowProps extends RouteComponentProps<any> {
    logs: ILogModel[];
}


export interface LogViewWindowState {

}

@inject(STORE_LOG_ARRAY)
@observer
export class LogViewWindow extends React.Component<LogViewWindowProps,LogViewWindowState> {

    constructor(props: LogViewWindowProps, context?: any) {
        super(props, context);
    }

    renderToggleAll() {
        const { logs } = this.props;
        const completedCount = logs.length;
        if (logs.length > 0) {
            return (
                <input
                    className={style.toggleAll}
                    type="checkbox"
                    checked={completedCount === logs.length}
                />
            );
        }
    }
    onRemoveLog(id : string){
        const logArrayStore = this.props[STORE_LOG_ARRAY] as LogArrayStore;
        logArrayStore.deleteLog(id);
    }

    render() {
        const logArrayStore = this.props[STORE_LOG_ARRAY] as LogArrayStore;
        const logs = logArrayStore.viewLogs;
        const style1 = style.shadowBorder + " col-12 p-0";


        return(
            <div>
                <div className={style1}>
                    {logs.map(log =>
                        <LogView key={log.id} log={log} onRemoveLog={() => {this.onRemoveLog(log.id)}}/>
                    )}
                </div>
            </div>

        );
    }
}

export default LogViewWindow;
