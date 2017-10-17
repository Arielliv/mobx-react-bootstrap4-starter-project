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
@observer
export class Form extends React.Component<FormProps,FormState> {

    constructor(props: FormProps, context?: any) {
        super(props, context);
        this.state = { filter: LogFilter.BUILD };

        this.onSubmitAvForm = this.onSubmitAvForm.bind(this);
    }





    static submitAvForm(event, errors, values){
        if (errors.length === 0){
            console.log(values);
            let id : string = (Math.floor(Math.random() * 100 ) +1).toString();
            let name : string = values.name;
            let path : string = values.path;
            let typeRolling : string = values.typeRolling;
            let typeSpecial : string = values.typeSpecial;
            let regularExpressions : Array<string> = [];
            for(let i = 1 ; i  < 100 ; i ++){
                let name = "regularExpression-" + i;
                if(values[name]){
                    regularExpressions.push(values[name]);
                }
            }

            if(values.typeSpecial === "special"){
                let startLine : string = values.startLine;
                let endLine : string = values.endLine;
                return {id, name, regularExpressions, path, typeRolling, typeSpecial, startLine, endLine}
            } else {
                return {id, name, regularExpressions, path, typeRolling, typeSpecial}
            }

        } else {
            console.log("form invalid in : " + errors);
        }
    }

    onSubmitAvForm(event, errors, values){
        const logArrayStore = this.props[STORE_LOG_ARRAY] as LogArrayStore;
        logArrayStore.addLog(Form.submitAvForm(event, errors, values));
    }

    render() {
        const  style1 = style.shadowBorder + " col-12 p-0";
        const defaultValues = { typeRolling: "regular" , typeSpecial : "regular"};
        return(
            <div>
                {/*bind this of the component to inject inside onSubmitAvFormRender function in the render*/}
                <AvForm onSubmit={this.onSubmitAvForm} model={defaultValues} className={style1}>
                    <Body/>
                </AvForm >
            </div>

        );
    }
}

export default Form;
