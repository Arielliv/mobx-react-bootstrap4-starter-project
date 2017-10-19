/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import * as classNames from 'classnames';
import {IRegularExpression} from '../../../models/RegularExpression';
import {SpecialLog} from '../SpecialLog/index'
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import RegularExpression from "../RegularExpression/index";
import {inject} from "mobx-react";
import {STORE_LOG} from "../../../constants/stores";
import LogStore from "../../../stores/LogStore";
import {ILogModel} from "../../../models/ILogModel";

// import * as style from './style.css';

export interface LogState {
    name : string
    path : string
    regularExpressions : Array<IRegularExpression>
}
export interface LogProps {
    name : string
    path : string
    regularExpressions : Array<IRegularExpression>
    onChangeRegularExpressions(regularExpression : Array<IRegularExpression>)
    onChangePath(path : string)
    onChangeName(name : string)
}
@inject(STORE_LOG)
export class Log extends React.Component<LogProps, LogState> {

    constructor(props?: LogProps) {
        super(props);


        this.state = { name: this.props.name , path : this.props.name  ,regularExpressions : this.props.regularExpressions};

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePath = this.onChangePath.bind(this);
        this.onChangeRegularExpression = this.onChangeRegularExpression.bind(this);
        this.onClickAddRegularExpression = this.onClickAddRegularExpression.bind(this);
        this.onRemoveRegularExpression = this.onRemoveRegularExpression.bind(this);
    }

    onChangeName(e){
        this.setState({name:e.target.value});
        this.props.onChangeName(this.state.name);
    }

    onChangePath(e){
        this.setState({path:e.target.value});
        this.props.onChangePath(this.state.path);
    }

    onChangeRegularExpression(id : string, value : string){
        let regularExpArray : Array<IRegularExpression> = this.state.regularExpressions;
        let foundIndex = regularExpArray.findIndex(x => x.id == id);
        regularExpArray[foundIndex].regularExpression = value;
        this.setState({regularExpressions: regularExpArray});
        this.props.onChangeRegularExpressions(this.state.regularExpressions);
    }

    onClickAddRegularExpression(){
        let maxId = 0;
        let regularExpArray : Array<IRegularExpression> = this.state.regularExpressions;
        regularExpArray.map(function(obj){
            if (parseInt(obj.id) > maxId) maxId = parseInt(obj.id);
        });
        regularExpArray.push({id:(maxId+1).toString(),regularExpression:""});
        this.setState({regularExpressions:regularExpArray});
    }

    onRemoveRegularExpression(id : string){
        console.log('on remove  Log');
        const regularExpArrayAfterRemove = this.state.regularExpressions.filter(function(obj) {
            return obj.id !== id;
        });
        this.setState({regularExpressions:regularExpArrayAfterRemove});
    }

    render() {
        let regularExpressionLoop = this.state.regularExpressions.map(obj => {
            return <RegularExpression regularExpressionObject={obj} key={obj.id} onRemoveRegularExpression={() => {this.onRemoveRegularExpression(obj.id)}} onChangeRegularExpression={(regularExp:string) => {this.onChangeRegularExpression(obj.id,regularExp)}}/>
        });
        const divStyle = {
            color: 'red',
        };
        return (
            <div >
                <AvGroup className="form-row">
                    <Label for="name" className="col-12 p-0">שם לוג</Label>
                    <AvInput type="text" name="name" id="name" placeholder="הכנס טקסט" className="col-12" value={this.state.name} onChange={this.onChangeName} required />
                    {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                    <div style={divStyle}>
                        <AvFeedback >לא הוכנס שם לוג</AvFeedback>
                    </div>
                </AvGroup>
                <AvGroup className="form-row">
                    <Label for="path" className="col-12 p-0">שם לוג</Label>
                    <AvInput type="text" name="path" id="path" placeholder="הכנס טקסט" className="col-12" value={this.state.path} onChange={this.onChangePath} required />
                    {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                    <div style={divStyle}>
                        <AvFeedback >לא הוכנס נתיב לוג</AvFeedback>
                    </div>
                </AvGroup>
                {regularExpressionLoop}
                <div className="form-row">
                    <div className="col-1 d-inline-block">
                        <button type="button" className="btn btn-outline-success  col-12 "  onClick={this.onClickAddRegularExpression}>+</button>
                    </div>
                    <p className="col-11  d-inline-block mt-1">הוסף ביטוי רגולרי...</p>
                </div>
            </div>
        );
    }
}

export default Log;
