import * as React from 'react';
import * as style from './style.css';
import {inject, observer} from "mobx-react";
import {STORE_LOG_ARRAY} from "../../../constants/stores";
import LogArrayStore from "../../../stores/LogArrayStore";


export interface LogsCountState {
    logsCount: number
}

export interface LogsCountProps {
}

@inject(STORE_LOG_ARRAY)
@observer
export class LogsCount extends React.Component<LogsCountProps, LogsCountState> {

  constructor(props, context?: any) {
      super(props, context);
      this.state = {logsCount:0};

  }

    // componentDidMount(){
    //     const logArrayStore = this.props[STORE_LOG_ARRAY] as LogArrayStore;
    //     logArrayStore.logsCount
    //         .then((response) => {
    //             console.log(response);
    //             this.setState({logsCount:response.data.count});
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

  render() {
        const logArrayStore = this.props[STORE_LOG_ARRAY] as LogArrayStore;
        const logsCount = logArrayStore.logsCount;
        const itemWord = logsCount === 1 ? 'פריט' : 'פריטים';

        return (
            <div className="col-3 d-inline-block text-left">
                <span className={style.count}>
                    <strong>{logsCount || 'אין'}</strong> {itemWord}
                </span>
            </div>
        );
  }
}

export default LogsCount;
