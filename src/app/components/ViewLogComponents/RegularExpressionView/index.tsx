/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';

// import * as style from './style.css';

export interface RegularExpressionViewState {
    regularExpression: string
}
export interface RegularExpressionViewProps {
    regularExpression: string
}
export class RegularExpressionView extends React.Component<RegularExpressionViewProps,RegularExpressionViewState> {

    constructor(props) {
        super(props);
        this.state = {regularExpression: this.props.regularExpression}
    }


    render() {
        return(
            <div className="col-12">
                <li className="">מקיים את - {this.state.regularExpression}</li>
            </div>
        );
    }
}

export default RegularExpressionView;
