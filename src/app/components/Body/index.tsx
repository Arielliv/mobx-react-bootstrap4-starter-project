/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import { Log } from '../Log/';
import {SpecialLog} from "../SpecialLog/index";
import {LogType} from "../../models/LogType";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import * as style from './style.css';

// import * as style from './style.css';

export interface BodyProps {
    /*empty*/
}

export interface BodyState {
    typeRolling: LogType
    typeSpecial : LogType
}
export class Body extends React.Component<BodyProps,BodyState> {

    constructor(props, context?: any) {
        super(props, context);
        this.state = { typeRolling: LogType.REGULAR , typeSpecial : LogType.REGULAR};
        this.onChangeLogTypeRolling = this.onChangeLogTypeRolling.bind(this);
        this.onChangeLogTypeSpecial = this.onChangeLogTypeSpecial.bind(this);
    }

    onChangeLogTypeRolling(e){
        if(e.target.value === "rolling"){
            this.setState({typeRolling:LogType.ROLLING});
        } else {
            this.setState({typeRolling:LogType.REGULAR});
        }

    }
    onChangeLogTypeSpecial(e){
        if(e.target.value === "special"){
            this.setState({typeSpecial:LogType.SPECIAL});
        } else {
            this.setState({typeSpecial:LogType.REGULAR});
        }
    }

    render() {
        const style1 = style.containerCostume + " container pb-2 ";
        // const SpecialLog=
        return(
            <div className="container mt-5">
                <div className="col-12 ">
                    <Form className={style.normal}>
                        <div className={style1}>
                            <div className="row justify-content-center">
                                <h1 className="h1 col-6 text-center">פרוייקט חפיפה</h1>
                            </div>
                            <div className="pt-3">
                                <div className="row" >
                                    <FormGroup check className="col-6" onChange={this.onChangeLogTypeRolling} >
                                        <Label check className="col-12 text-center">מתגלגל ?</Label>
                                        <Label className="col-6 justify-content-center">
                                            <Input type="radio" name="radio1" value="rolling" className="col-4 text-center" />
                                            כן
                                        </Label>
                                        <Label className="col-6 justify-content-center">
                                            <Input type="radio" name="radio1" value="regular" className="col-4 text-center" defaultChecked/>
                                            לא
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check className="col-6" onChange={this.onChangeLogTypeSpecial} >
                                        <Label check className="col-12 text-center">שורה מיוחדת ?</Label>
                                        <Label className="col-6 justify-content-center">
                                            <Input type="radio" name="radio2" value="special" className="col-4 text-center" />
                                            כן
                                        </Label>
                                        <Label className="col-6 justify-content-center">
                                            <Input type="radio" name="radio2" value="regular" className="col-4 text-center" defaultChecked/>
                                            לא
                                        </Label>
                                    </FormGroup>
                                </div>
                            </div>
                            {this.state.typeSpecial == LogType.SPECIAL ? <SpecialLog /> : ''}
                            <Log/>
                            <div className="row justify-content-center">
                                <Button className="btn-outline-primary col-6">סיום</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>

        );
    }
}

export default Body;
