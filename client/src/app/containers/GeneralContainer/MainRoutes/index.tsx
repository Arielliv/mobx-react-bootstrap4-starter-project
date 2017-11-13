import {inject, observer} from "mobx-react";
import {STORE_ALERT, STORE_LOG, STORE_LOG_ARRAY, STORE_ROUTER} from "../../../constants/stores";
import { RouteComponentProps} from "react-router";
import {LOG_FILTER_LOCATION_HASH, LogFilter} from "../../../constants/appRouts";
import * as React from "react";
import NavBarContainer from "../../../components/GeneralComponents/NavBarContainer/index";
import LogArrayStore from "../../../stores/LogArrayStore";
import * as style from './style.css';
import RouterStore from "../../../stores/RouterStore";
import LogStore from "../../../stores/LogStore";
import AlertContainer from "../../../components/GeneralComponents/AlertContainer/index";
import {IAlertModel} from "../../../models/IAlertModel";
import AlertStore from "../../../stores/AlertStore";
import {createViewModel} from "mobx-utils";
import {autorun} from "mobx";

export interface MainRoutesState {
    filter: LogFilter;
    alert: IAlertModel;

}

export interface MainRoutesProps extends RouteComponentProps<any> {
    // /** MobX Stores will be injected via @inject() **/
    //  [STORE_ROUTER]: RouterStore;
    //  [STORE_LOG_ARRAY]: LogArrayStore;
}

@inject(STORE_LOG_ARRAY, STORE_ROUTER,STORE_LOG,STORE_ALERT)
@observer
export class MainRoutes extends React.Component<MainRoutesProps,MainRoutesState> {

    constructor(props: MainRoutesProps, context?: any) {
        super(props, context);
        const alertStore = this.props[STORE_ALERT] as AlertStore;

        this.state = { filter: LogFilter.BUILD, alert:alertStore.getAlert};

        this.handleFilter = this.handleFilter.bind(this);
        this.handleAlertChange = this.handleAlertChange.bind(this);

    }

    componentWillMount() {
        this.checkLocationChange();
    }

    componentWillReceiveProps(nextProps: MainRoutesProps, nextContext: any) {
        this.checkLocationChange();
    }

    checkLocationChange() {
        const router = this.props[STORE_ROUTER] as RouterStore;
        const filter = Object.keys(LOG_FILTER_LOCATION_HASH)
            .map((key) => key as LogFilter)
            .find((filter) => LOG_FILTER_LOCATION_HASH[filter] === router.location.hash);
        this.setState({ filter });
    }

    handleAlertChange(){
        const alertStore = this.props[STORE_ALERT] as AlertStore;
        this.setState({alert:alertStore.getAlert});

        console.log("b")
    }

    handleFilter(filter: LogFilter) {
        const router = this.props[STORE_ROUTER] as RouterStore;
        const currentHash = router.location.hash;
        const nextHash = LOG_FILTER_LOCATION_HASH[filter];
        if (currentHash !== nextHash) {
            router.replace(nextHash);
        }
        //reset editLogFlag when page changes
        const logStore = this.props[STORE_LOG] as LogStore;
        logStore.setEditFlag(false);
    }

    handleOnVisibleChange(){
        let alert = this.state.alert;
        alert.alertVisible = false;
        this.setState({alert:alert});
    }
     alertComponent(){
         const alertStore = this.props[STORE_ALERT] as AlertStore;

         const alert = createViewModel(alertStore.getAlert);

         return (<AlertContainer handleOnVisibleChange={() => this.handleOnVisibleChange()} handleAlertChange={() => this.handleAlertChange()} alertColor={alert.alertColor} alertText={alert.alertText} alertVisible={alert.alertVisible}  />);
     }


    render() {

        const logArrayStore = this.props[STORE_LOG_ARRAY] as LogArrayStore;

        const nav = (
            <NavBarContainer filter={this.state.filter}
                             onChangeFilter={this.handleFilter} />
        ) ;

        return(
            <div>
                <div className="container mt-5">
                    {autorun(() =>{this.alertComponent()})}
                    <div className={style.bodyBorder}>
                        {nav}
                    </div>
                </div>
            </div>

        );
    }
}

export default MainRoutes;