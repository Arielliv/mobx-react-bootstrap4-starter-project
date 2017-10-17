/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// import * as style from './style.css';

export interface RegularExpressionState {
    regularExpression : string
    id : string
}
export interface RegularExpressionProps {
    onRemoveRegularExpression() : void
    onChangeRegularExpression(regularExpression : string)
}

export class RegularExpression extends React.Component<RegularExpressionProps, RegularExpressionState> {

    constructor(props?: RegularExpressionProps) {
        super(props);
        let id : string = "regularExpression-" + (Math.floor(Math.random() * 100 ) +1).toString();
        this.state = { regularExpression: "" , id};
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
        const divStyle = {
            color: 'red',
        };
        return (
            <div >
                <AvGroup className="form-row">
                    <Label for="regularExpression" className="col-12 ">ביטוי רגולרי</Label>
                    <div className="col-1 d-inline-block">
                        <button type="button" className="btn btn-outline-danger  col-12 " onClick={this.onClickRemoveRegularExpression}>X</button>
                    </div>
                    <AvInput type="text" name={this.state.id}  placeholder="הכנס טקסט" className="col-11  form-control d-inline-block " onChange={this.onChangeRegularExpression} required />
                    {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                    <div style={divStyle}>
                        <AvFeedback >לא הוכנס ביטוי רגולרי</AvFeedback>
                    </div>
                </AvGroup>
            </div>
        );
    }
}

export default RegularExpression;
