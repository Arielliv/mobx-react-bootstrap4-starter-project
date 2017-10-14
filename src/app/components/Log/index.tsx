/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import * as classNames from 'classnames';
import {ILogModel} from '../../models/ILogModel';
import {SpecialLog} from '../SpecialLog/index'
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import RegularExpression from "../RegularExpression/index";

// import * as style from './style.css';
export interface regularExpressionObject{
    id: number
    regularExpression:string
}
export interface LogState {
    name: string
    path : string
    regularExpressionArray : Array<regularExpressionObject>
}
export interface LogProps {
    /*empty*/
}

export class Log extends React.Component<LogProps, LogState> {

    constructor(props?: LogProps) {
        super(props);
        this.state = { name: "" , path : "" ,regularExpressionArray : [{id:1,regularExpression:""}]};
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePath = this.onChangePath.bind(this);
        this.onChangeRegularExpression = this.onChangeRegularExpression.bind(this);
        this.onClickAddRegularExpression = this.onClickAddRegularExpression.bind(this);
        this.onRemoveRegularExpression = this.onRemoveRegularExpression.bind(this);
    }

    onChangeName(e){
        this.setState({name:e.target.value});
    }

    onChangePath(e){
        this.setState({path:e.target.value});
    }

    onChangeRegularExpression(id : number, value : string){
        let regularExpArray : Array<regularExpressionObject> = this.state.regularExpressionArray;
        let foundIndex = regularExpArray.findIndex(x => x.id == id);
        regularExpArray[foundIndex].regularExpression = value;
        this.setState({regularExpressionArray: regularExpArray});
    }

    onClickAddRegularExpression(){
        let maxid = 0;
        let regularExpArray : Array<regularExpressionObject> = this.state.regularExpressionArray;
        regularExpArray.map(function(obj){
            if (obj.id > maxid) maxid = obj.id;
        });
        regularExpArray.push({id:maxid+1,regularExpression:""});
        this.setState({regularExpressionArray:regularExpArray});
    }

    onRemoveRegularExpression(id : number){
        console.log('onremove  Log')
        const regularExpArrayAfterRemove = this.state.regularExpressionArray.filter(function(obj) {
            return obj.id !== id;
        });
        this.setState({regularExpressionArray:regularExpArrayAfterRemove});
    }

    render() {
        let regularExpressionLoop = this.state.regularExpressionArray.map(obj => {
            return <RegularExpression key={obj.id} onRemoveRegularExpression={() => {this.onRemoveRegularExpression(obj.id)}} onChangeRegularExpression={(regularExp:string) => {this.onChangeRegularExpression(obj.id,regularExp)}}/>
        });
        const divStyle = {
            color: 'red',
        };
        return (
            <div >
                <AvGroup className="form-row">
                    <Label for="name" className="col-12 p-0">שם לוג</Label>
                    <AvInput type="text" name="name" id="name" placeholder="הכנס טקסט" className="col-12" onChange={this.onChangeName} required />
                    {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                    <div style={divStyle}>
                        <AvFeedback >לא הוכנס שם לוג</AvFeedback>
                    </div>
                </AvGroup>
                <AvGroup className="form-row">
                    <Label for="name" className="col-12 p-0">שם לוג</Label>
                    <AvInput type="text" name="path" id="path" placeholder="הכנס טקסט" className="col-12" onChange={this.onChangePath} required />
                    {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                    <div style={divStyle}>
                        <AvFeedback >לא הוכנס נתיב לוג</AvFeedback>
                    </div>
                </AvGroup>
                {regularExpressionLoop}
                <div className="form-row">
                    <div className="col-1 d-inline-block">
                        <button type="button" className="btn btn-outline-success  col-12 " onClick={this.onClickAddRegularExpression}>+</button>
                    </div>
                    <p className="col-11  d-inline-block mt-1">הוסף ביטוי רגולרי...</p>
                </div>
            </div>
        );
    }
}

export default Log;
