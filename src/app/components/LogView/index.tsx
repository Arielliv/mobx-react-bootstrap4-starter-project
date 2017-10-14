/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import { Log } from '../Log/';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { Jumbotron,Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// import * as style from './style.css';

export interface LogViewState {

}
export interface LogViewProps {
    /*empty*/
}
export class LogView extends React.Component<LogViewProps,LogViewState> {

    constructor(props) {
        super(props);
        this.state = { };

    }



    render() {
        return(
            <div>
                <Jumbotron>
                    <h1 className="display-3">Hello, world!</h1>
                    <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-2" />
                    <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
                    <p className="lead">
                        <Button color="primary">Learn More</Button>
                    </p>
                </Jumbotron>
            </div>
        );
    }
}

export default LogView;
