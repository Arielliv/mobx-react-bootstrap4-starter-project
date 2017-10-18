/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import { Log } from '../Log/';
import {SpecialLog} from "../SpecialLog/index";
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import * as style from './style.css';
import {ILogModel} from "../../../models/ILogModel";
import {STORE_LOG} from "../../../constants/stores";
import LogStore from "../../../stores/LogStore";
import {inject} from "mobx-react";

// import * as style from './style.css';



export interface BodyState {
    typeRolling: string
    typeSpecial : string
}

export interface BodyProps {
    log: ILogModel
}

@inject(STORE_LOG)
export class Body extends React.Component<BodyProps,BodyState> {

    constructor(props?:any, context?: any) {
        super(props, context);

        this.state = { typeRolling: this.props.log.typeRolling , typeSpecial : this.props.log.typeSpecial};


        this.onChangeLogTypeRolling = this.onChangeLogTypeRolling.bind(this);
        this.onChangeLogTypeSpecial = this.onChangeLogTypeSpecial.bind(this);
    }

    onChangeLogTypeRolling(e){
        this.setState({typeRolling:e.target.value});
    }
    onChangeLogTypeSpecial(e){
        this.setState({typeSpecial:e.target.value});
    }

    render() {
        // const style1 = style.containerCostume + " container pb-2";
        const  style2 = style.shadowBorder + " col-12 p-0";
        const divStyle = {
            color: 'red',
        };
        // const SpecialLog=
        return(
            <div className="container pb-2">
                <div className="row justify-content-center">
                    <h1 className="h1 col-6 text-center">פרוייקט חפיפה</h1>
                </div>
                <div className="pt-3">
                    <div className="row" >
                        <AvRadioGroup className="col-6" name="typeRolling" label="מתגלגל ?" inline  required onChange={this.onChangeLogTypeRolling}>
                            <span className="col-4 ">
                                <Label  className="col-2">כן</Label>
                                <AvRadio  value={this.state.typeRolling}/>
                            </span>
                            <span className="col-4 ">
                                <Label  className="col-2">לא</Label>
                                <AvRadio  value={this.state.typeSpecial} />
                            </span>
                            <div style={divStyle}>
                                <AvFeedback >לא הוכנס שם לוג</AvFeedback>
                            </div>
                        </AvRadioGroup>
                        <AvRadioGroup className="col-6" name="typeSpecial" label="שורה מיוחדת ?" inline  required onChange={this.onChangeLogTypeSpecial}>
                            <span className="col-4 ">
                                <Label  className="col-2">כן</Label>
                                <AvRadio  value="special" />
                            </span>
                            <span className="col-4 ">
                                <Label  className="col-2" >לא</Label>
                                <AvRadio  value="regular" />
                            </span>
                            <div style={divStyle}>
                                <AvFeedback >לא הוכנס שם לוג</AvFeedback>
                            </div>
                        </AvRadioGroup>
                    </div>
                </div>
                {this.state.typeSpecial == "special" ? <SpecialLog endLine={this.props.log.endLine} startLine={this.props.log.startLine} /> : ''}
                <Log name={this.props.log.name} path={this.props.log.path} regularExpressions={this.props.log.regularExpressions}/>
                <FormGroup className="row justify-content-center">
                    <Button className="btn-outline-primary col-6">סיום</Button>
                </FormGroup>
            </div>
        );
    }
}

export default Body;
