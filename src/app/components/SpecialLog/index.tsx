/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import { Log } from '../Log/';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import * as style from './style.css';

export interface SpecialLogState {
    startLine: string
    endLine : string
}
export interface SpecialLogProps {
    /*empty*/
}
export class SpecialLog extends React.Component<SpecialLogProps,SpecialLogState> {

    constructor(props) {
        super(props);
        this.state = { startLine: "" , endLine : ""};
    }

    render() {
        return(
            <div className="row">
                <FormGroup className="col-6 ">
                    <Label for="startLine" className="col-4 p-0">תחילת שורת לוג</Label>
                    <Input type="text" name="startLine" id="startLine" placeholder="הכנס טקסט" className="col-12"/>
                </FormGroup>
                <FormGroup className="col-6 ">
                    <Label for="endLine" className="col-4 p-0">סיום שורת לוג</Label>
                    <Input type="text" name="endLine" id="endLine" placeholder="הכנס טקסט" className="col-12"/>
                </FormGroup>
            </div>
        );
    }
}

export default SpecialLog;
