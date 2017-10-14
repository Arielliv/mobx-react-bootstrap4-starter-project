/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import { Body } from '../../components/Body';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import * as style from './style.css';
import {RouteComponentProps} from "react-router";
import {inject} from "mobx-react";
import {STORE_LOG_ARRAY, STORE_ROUTER} from "../../constants/stores";
import {LogArrayStore} from "../../stores/LogArrayStore";
import {ILogModel} from "../../models/ILogModel";
import {RouterStore} from "../../stores/RouterStore";
import Nav, {default as NavBarContainer} from "../../components/NavBarContainer/index";
import {LOG_FILTER_LOCATION_HASH, LogFilter} from "../../constants/appRouts";
// import {LOG_FILTER_LOCATION_HASH, TodoFilter} from "../../constants/todos";


// import * as style from './style.css';

export interface FormProps extends RouteComponentProps<any> {
    // /** MobX Stores will be injected via @inject() **/
    //  [STORE_ROUTER]: RouterStore;
    //  [STORE_LOG_ARRAY]: LogArrayStore;
}


export interface FormState {
    filter: LogFilter;
}

@inject(STORE_LOG_ARRAY, STORE_ROUTER)
export class Form extends React.Component<FormProps,FormState> {

    constructor(props: FormProps, context?: any) {
        super(props, context);
        this.state = { filter: LogFilter.BUILD };

        this.handleFilter = this.handleFilter.bind(this);
        this.onSubmitAvForm = this.onSubmitAvForm.bind(this);
    }

    componentWillMount() {
        this.checkLocationChange();
    }

    componentWillReceiveProps(nextProps: FormProps, nextContext: any) {
        this.checkLocationChange();
    }

    checkLocationChange() {
        // const router = this.props[STORE_ROUTER] as RouterStore;
        // const filter = Object.keys(LOG_FILTER_LOCATION_HASH)
        //     .map((key) => Number(key) as TodoFilter)
        //     .find((filter) => LOG_FILTER_LOCATION_HASH[filter] === router.location.hash);
        // this.setState({ filter });
    }

    handleFilter(filter: LogFilter) {
        const router = this.props[STORE_ROUTER] as RouterStore;
        const currentHash = router.location.hash;
        const nextHash = LOG_FILTER_LOCATION_HASH[filter];
        if (currentHash !== nextHash) {
            router.replace(nextHash);
        }
    }


    onSubmitAvForm(event, errors, values){
        if (errors.length === 0){
            console.log(values);
            let id : string = (Math.floor(Math.random() * 100 ) +1).toString();
            let name : string = values.name;
            let path : string = values.path;
            let typeRolling : string = values.typeRolling;
            let typeSpecial : string = values.typeSpecial;
            let regularExpression : Array<string> = [];
            for(let i = 1 ; i  < 100 ; i ++){
                let name = "regularExpression-" + i;
                if(values[name]){
                    regularExpression.push(values[name]);
                }
            }

            if(values.typeSpecial === "special"){
                let startLine : string = values.startLine;
                let endLine : string = values.endLine;
                return {id, name, regularExpression, path, typeRolling, typeSpecial, startLine, endLine}
            } else {
                return {id, name, regularExpression, path, typeRolling, typeSpecial}
            }

        } else {
            console.log("form invalid in : " + errors);
        }
    }

    render() {

        const logArrayStore = this.props[STORE_LOG_ARRAY] as LogArrayStore;
        let onSubmitAvFormRender = function(event, errors, values){
            logArrayStore.addLog(this.onSubmitAvForm(event, errors, values));
        };

        const { children } = this.props;

        const  style1 = style.shadowBorder + " col-12 p-0";
        const defaultValues = { typeRolling: "regular" , typeSpecial : "regular"};
        const { filter } = this.state;
        const nav = (
            <NavBarContainer filter={filter}
                    logsCount={logArrayStore.logs.length}
                    onChangeFilter={this.handleFilter} />
        ) ;
        return(
            <div className="container mt-5">
                <div className={style.bodyBorder}>
                    {nav}
                    {this.state.filter == LogFilter.BUILD ?
                        /*bind this of the component to inject inside onSubmitAvFormRender function in the render*/
                        <AvForm onSubmit={onSubmitAvFormRender.bind(this)} model={defaultValues} className={style1}>
                            <Body/>
                        </AvForm >
                        :
                        <div>צפייה</div>
                    }
                </div>
            </div>

        );
    }
}

export default Form;
