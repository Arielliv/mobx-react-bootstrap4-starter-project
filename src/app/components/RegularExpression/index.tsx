/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// import * as style from './style.css';

export interface RegularExpressionState {
    regularExpression : string
}
export interface RegularExpressionProps {
    onRemoveRegularExpression() : void
    onChangeRegularExpression(regularExpression : string)
}

export class RegularExpression extends React.Component<RegularExpressionProps, RegularExpressionState> {

    constructor(props?: RegularExpressionProps) {
        super(props);
        this.state = { regularExpression: "" };
        this.onClickRemoveRegularExpression = this.onClickRemoveRegularExpression.bind(this);
        this.onChangeRegularExpression = this.onChangeRegularExpression.bind(this);
    }

    onClickRemoveRegularExpression(){
        this.props.onRemoveRegularExpression();
    }

    onChangeRegularExpression(e){
        this.props.onChangeRegularExpression(e.target.value);
    }

    render() {
        return (
            <div >
                <FormGroup className="form-row">
                    <Label for="regularExpression" className="col-12 ">ביטוי רגולרי</Label>
                    <div className="col-1 d-inline-block">
                        <button type="button" className="btn btn-outline-danger  col-12 " onClick={this.onClickRemoveRegularExpression.bind(this)}>X</button>
                    </div>
                    <Input type="text" name="regularExpression" id="regularExpression" placeholder="הכנס טקסט" className="col-11  form-control d-inline-block " onChange={this.onChangeRegularExpression}/>
                </FormGroup>
            </div>
        );
    }
}

export default RegularExpression;
