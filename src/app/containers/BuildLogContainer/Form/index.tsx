///<reference path="../../../stores/LogStore.tsx"/>
/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import { Body } from '../../../components/BuildLogComponents/Body';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import * as style from './style.css';
import {RouteComponentProps} from "react-router";
import {inject, observer} from "mobx-react";
import {STORE_LOG, STORE_LOG_ARRAY, STORE_ROUTER} from "../../../constants/stores";
import {LogArrayStore} from "../../../stores/LogArrayStore";
import {LOG_FILTER_LOCATION_HASH, LogFilter} from "../../../constants/appRouts";
import LogStore from "../../../stores/LogStore";
import {IRegularExpression} from "../../../models/RegularExpression";
import {ILogModel} from "../../../models/ILogModel";

export interface FormProps extends RouteComponentProps<any> {
    // /** MobX Stores will be injected via @inject() **/
    //  [STORE_ROUTER]: RouterStore;
    //  [STORE_LOG_ARRAY]: LogArrayStore;

}

export interface FormState {
    filter: LogFilter;
    log ?: ILogModel
}

@inject(STORE_LOG_ARRAY, STORE_ROUTER, STORE_LOG)
@observer
export class Form extends React.Component<FormProps,FormState> {

    constructor(props: FormProps, context?: any) {
        super(props, context);
        this.state = { filter: LogFilter.BUILD ,log : {id:(Math.floor(Math.random() * 100 ) +1).toString(), typeRolling: "regular" , typeSpecial : "regular", name: "" , path : "" ,regularExpressions : [{id:"1",regularExpression:""}],endLine:"",startLine:""}};

        this.onSubmitAvForm = this.onSubmitAvForm.bind(this);
        this.handelChangeName = this.handelChangeName.bind(this);
        this.handelChangePath = this.handelChangePath.bind(this);
        this.handelChangeTypeRolling = this.handelChangeTypeRolling.bind(this);
        this.handelChangeTypeSpecial = this.handelChangeTypeSpecial.bind(this);
        this.handelChangeRegularExpressions = this.handelChangeRegularExpressions.bind(this);
        this.handelChangeStartLine = this.handelChangeStartLine.bind(this);
        this.handelChangeEndLine = this.handelChangeEndLine.bind(this);
    }

    componentWillMount(){
        const logStore = this.props[STORE_LOG] as LogStore;
        const logEditFlag : boolean = logStore.getEditFlag;

        if(logEditFlag){
            this.setState({log : logStore.getLog});
        } else {
            this.setState({log : {id:(Math.floor(Math.random() * 100 ) +1).toString(), typeRolling: "regular" , typeSpecial : "regular", name: "" , path : "" ,regularExpressions : [{id:"1",regularExpression:""}],endLine:"",startLine:""}});
        }
    }

    handelChangeName(name:string){
        let log : ILogModel = this.state.log;
        log.name = name;
        this.setState({log:log});
    }
    handelChangePath(path:string){
        let log : ILogModel = this.state.log;
        log.path = path;
        this.setState({log:log});
    }
    handelChangeTypeRolling(typeRolling:string){
        let log : ILogModel = this.state.log;
        log.typeRolling = typeRolling;
        this.setState({log:log});
    }
    handelChangeTypeSpecial(typeSpecial:string){
        let log : ILogModel = this.state.log;
        log.typeSpecial = typeSpecial;
        this.setState({log:log});
    }
    handelChangeRegularExpressions(regularExpressions:Array<IRegularExpression>){
        let log : ILogModel = this.state.log;
        log.regularExpressions = regularExpressions;
        this.setState({log:log});
    }
    handelChangeStartLine(startLine:string){
        let log : ILogModel = this.state.log;
        log.startLine = startLine;
        this.setState({log:log});
    }
    handelChangeEndLine(endLine:string){
        let log : ILogModel = this.state.log;
        log.endLine = endLine;
        this.setState({log:log});
    }

    onSubmitAvForm(event, errors, values){
        console.log(values);
        console.log(this.state.log);
        const logStore = this.props[STORE_LOG] as LogStore;

        const logArrayStore = this.props[STORE_LOG_ARRAY] as LogArrayStore;

        if (errors.length === 0){
            // let name: string = values.name;
            // let path: string = values.path;
            // let typeRolling: string = values.typeRolling;
            // let typeSpecial: string = values.typeSpecial;
            // let startLine: string = values.startLine;
            // let endLine: string = values.endLine;
            // let regularExpressions: Array<IRegularExpression> = [];
            // for (let i = 1; i < 100; i++) {
            //     let name = "regularExpression-" + i;
            //     if (values[name]) {
            //         regularExpressions.push({id:i.toString(),regularExpression:values[name]});
            //     }
            // }

            const logEditFlag : boolean = logStore.getEditFlag;

            if(logEditFlag){
                // let myObject: ILogModel;
                // myObject = {id:this.state.log.id, name:name, path:path, typeRolling:typeRolling, typeSpecial:typeSpecial, startLine:startLine, endLine:endLine, regularExpressions:regularExpressions};
                logArrayStore.editLog(this.state.log);
                logStore.setEditFlag(false);
            } else {
                // let myObject: ILogModel;
                // myObject = {id:this.state.log.id, name:name,  path:path,typeRolling:typeRolling, typeSpecial:typeSpecial, startLine:startLine, endLine:endLine, regularExpressions:regularExpressions};
                logArrayStore.addLog(this.state.log);
            }
        } else {

            console.log("form invalid in : " + errors);
        }
    }

    render() {
        const  style1 = style.shadowBorder + " col-12 p-0";

        let defaultValues = this.state.log;

        return(
            <div>
                {/*bind this of the component to inject inside onSubmitAvFormRender function in the render */}
                <AvForm onSubmit={this.onSubmitAvForm} model={defaultValues} className={style1}>
                    <Body log={this.state.log} onChangeName={(name : string) => this.handelChangeName(name)} onChangePath={(path : string) => this.handelChangePath(path)} onChangeTypeRolling={(typeRolling : string) => this.handelChangeTypeRolling(typeRolling)} onChangeTypeSpecial={(typeSpecial : string) => this.handelChangeTypeSpecial(typeSpecial)} onChangeRegularExpressions={(regularExpressions : Array<IRegularExpression>) => this.handelChangeRegularExpressions(regularExpressions)} onChangeStartLine={(startLine : string) => this.handelChangeStartLine(startLine)} onChangeEndLine={(endLine : string) => this.handelChangeEndLine(endLine)}/>
                </AvForm >
            </div>

        );
    }
}

export default Form;