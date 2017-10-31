/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import { Log } from '../Log/';
import {SpecialLog} from "../SpecialLog/index";
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { Button, FormGroup, Label } from 'reactstrap';
import * as style from './style.css';
import {ILogModel} from "../../../models/ILogModel";
import {STORE_LOG} from "../../../constants/stores";
import {inject} from "mobx-react";
import {IRegularExpression} from "../../../models/IRegularExpressionModel";

export interface BodyState {
    typeRolling: string
    typeSpecial : string
}

export interface BodyProps {
    log: ILogModel
    onChangeStartLine(startLine:string)
    onChangeEndLine(endLine:string)
    onChangeRegularExpressions(RegularExpressions:Array<IRegularExpression>)
    onChangeName(name:string)
    onChangePath(path:string)
    onChangeTypeRolling(typeRolling:string)
    onChangeTypeSpecial(typeSpecial:string)
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
        this.props.onChangeTypeRolling(e.target.value);
    }
    onChangeLogTypeSpecial(e){
        this.setState({typeSpecial:e.target.value});
        this.props.onChangeTypeSpecial(e.target.value);
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
                    <h1 className="h1 col-6 mt-3 text-center">פרוייקט חפיפה</h1>
                </div>
                <div className="pt-3">
                    <div className="row" >
                        <AvRadioGroup className="col-6" name="typeRolling" label="מתגלגל ?" inline  required value={this.state.typeRolling} onChange={this.onChangeLogTypeRolling}>
                            <div className="col-2 d-inline-block">
                                <div className="row d-inline-block">
                                    <Label  className=" d-inline-block ">כן</Label>
                                    <AvRadio value="rolling" className="d-inline-block align-self-start m-0"/>
                                </div>
                            </div>
                            <div className="col-2 d-inline-block">
                                <div className="row d-inline-block">
                                    <Label  className=" d-inline-block ">לא</Label>
                                    <AvRadio value="regular" className="d-inline-block align-self-start m-0"/>
                                </div>
                            </div>
                            <div style={divStyle}>
                                <AvFeedback >לא הוכנס שם לוג</AvFeedback>
                            </div>
                        </AvRadioGroup>
                        <AvRadioGroup className="col-6" name="typeSpecial" label="שורה מיוחדת ?" inline  required value={this.state.typeSpecial} onChange={this.onChangeLogTypeSpecial}>
                            <div className="col-2 d-inline-block">
                                <div className="row d-inline-block">
                                    <Label  className=" d-inline-block ">כן</Label>
                                    <AvRadio value="special" className="d-inline-block align-self-start m-0"/>
                                </div>
                            </div>
                            <div className="col-2 d-inline-block">
                                <div className="row d-inline-block">
                                    <Label  className=" d-inline-block ">לא</Label>
                                    <AvRadio value="regular" className="d-inline-block align-self-start m-0"/>
                                </div>
                            </div>
                            <div style={divStyle}>
                                <AvFeedback >לא הוכנס שם לוג</AvFeedback>
                            </div>
                        </AvRadioGroup>
                    </div>
                </div>
                {this.state.typeSpecial == "special" ? <SpecialLog endLine={this.props.log.endLine} startLine={this.props.log.startLine} onChangeStartLine={(startLine:string) => {this.props.onChangeStartLine(startLine)}} onChangeEndLine={(endLine:string) => {this.props.onChangeEndLine(endLine)}} /> : ''}
                <Log name={this.props.log.name} path={this.props.log.path} regularExpressions={this.props.log.regularExpressions} onChangeRegularExpressions={(regularExpressions:Array<IRegularExpression>) => {this.props.onChangeRegularExpressions(regularExpressions)}} onChangePath={(path:string)=> {this.props.onChangePath(path)}} onChangeName={(name:string)=> {this.props.onChangeName(name)}}/>
                <FormGroup className="row justify-content-center">
                    <Button className="btn-outline-primary col-6">סיום</Button>
                </FormGroup>
            </div>
        );
    }
}

export default Body;
