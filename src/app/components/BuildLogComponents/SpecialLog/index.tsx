/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import { Log } from '../Log/';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {ILogModel} from "../../../models/ILogModel";

// import * as style from './style.css';

export interface SpecialLogState {
    startLine: string
    endLine : string
}

export interface SpecialLogProps {
    startLine: string
    endLine : string
    onChangeStartLine(path : string)
    onChangeEndLine(endLine : string)
}
export class SpecialLog extends React.Component<SpecialLogProps,SpecialLogState> {

    constructor(props) {
        super(props);
        this.state = { startLine: this.props.startLine , endLine : this.props.endLine};
        this.onChangeStartLine = this.onChangeStartLine.bind(this);
        this.onChangeEndLine = this.onChangeEndLine.bind(this);
    }

    onChangeStartLine(e){
        this.setState({startLine:e.target.value});
        this.props.onChangeStartLine(this.state.startLine);
    }

    onChangeEndLine(e){
        this.setState({endLine:e.target.value});
        this.props.onChangeEndLine(this.state.endLine);
    }

    render() {
        const divStyle = {
            color: 'red',
        };
        return(
            <div className="row">
                <AvGroup className="col-6">
                    <Label for="startLine" className="col-4 p-0">תחילת שורת לוג</Label>
                    <AvInput type="text" name="startLine" id="startLine" placeholder="הכנס טקסט" className="col-12" onChange={this.onChangeStartLine} required />
                    {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                    <div style={divStyle}>
                        <AvFeedback >לא הוכנס תחילת שורת לוג</AvFeedback>
                    </div>
                </AvGroup>
                <AvGroup className="col-6">
                    <Label for="endLine" className="col-4 p-0">סיום שורת לוג</Label>
                    <AvInput type="text" name="endLine" id="endLine" placeholder="הכנס טקסט" className="col-12" onChange={this.onChangeEndLine} required />
                    {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                    <div style={divStyle}>
                        <AvFeedback >לא הוכנס סוף שורת לוג</AvFeedback>
                    </div>
                </AvGroup>
            </div>
        );
    }
}

export default SpecialLog;
