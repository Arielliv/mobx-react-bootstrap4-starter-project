/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import * as style from './style.css';
import {RouteComponentProps} from "react-router";
import {inject, observer} from "mobx-react";
import {STORE_LOG_ARRAY, STORE_ROUTER} from "../../../constants/stores"
import {LogArrayStore} from "../../../stores/LogArrayStore";
import {ILogModel} from "../../../models/ILogModel";
import LogView from "../../../components/ViewLogComponents/LogView/index";
import {LOG_FILTER_LOCATION_HASH, LogFilter} from "../../../constants/appRouts";
import RouterStore from "../../../stores/RouterStore";

export interface LogViewWindowProps extends RouteComponentProps<any> {
    logs: ILogModel[]
}


export interface LogViewWindowState {

}

@inject(STORE_LOG_ARRAY, STORE_ROUTER)
@observer
export class LogViewWindow extends React.Component<LogViewWindowProps,LogViewWindowState> {

    constructor(props: LogViewWindowProps, context?: any) {
        super(props, context);

        this.handleFilter = this.handleFilter.bind(this);
        this.onRemoveLog = this.onRemoveLog.bind(this);
    }

    handleFilter(filter: LogFilter) {
        const router = this.props[STORE_ROUTER] as RouterStore;
        const currentHash = router.location.hash;
        const nextHash = LOG_FILTER_LOCATION_HASH[filter];
        if (currentHash !== nextHash) {
            router.replace(nextHash);
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
                    {logs.length >0 ? logs.map(log =>
                        <LogView key={log.id} log={log} onRemoveLog={() => {this.onRemoveLog(log.id)}} onChangeFilter={this.handleFilter.bind(this)}/>
                    ) : <h2 className="row justify-content-center m-5">אין פריטים</h2>}
                </div>
            </div>

        );
    }
}

export default LogViewWindow;
