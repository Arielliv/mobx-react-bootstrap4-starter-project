import * as React from 'react';
import {inject, observer} from "mobx-react";
import {Alert} from "reactstrap";
import {STORE_ALERT} from "../../../constants/stores";
import AlertStore from "../../../stores/AlertStore";


export interface AlertContainerState {
    alertVisible : boolean
    alertText : string
    alertColor : string
}

export interface AlertContainerProps {
    alertVisible : boolean
    alertText : string
    alertColor : string
    handleAlertChange() : void
    handleOnVisibleChange() : void
}

@inject(STORE_ALERT)
@observer
export class AlertContainer extends React.Component<AlertContainerProps, AlertContainerState> {

    constructor(props, context?: any) {
        super(props, context);
        this.state = {alertVisible: this.props.alertVisible,alertText : this.props.alertText, alertColor: this.props.alertColor };

        this.onDismiss = this.onDismiss.bind(this);
        this.renderAlert = this.renderAlert.bind(this);
    }

    componentWillReceiveProps(nextProps: AlertContainerProps, nextContext: any) {
        this.setState({alertVisible: this.props.alertVisible,alertText : this.props.alertText, alertColor: this.props.alertColor });
    }

    onDismiss() {
        const alertStore = this.props[STORE_ALERT] as AlertStore;

        this.setState({ alertVisible: false });
        alertStore.setAlertVisible(false);
        this.props.handleOnVisibleChange();
        this.props.handleAlertChange();

    }

    renderAlert() {

        return (
            <Alert color={this.state.alertColor} isOpen={this.props.alertVisible} toggle={this.onDismiss}>
                {this.state.alertText}
            </Alert>
        );
    }

    render() {

        return (
            <div>
                {this.renderAlert()}
            </div>
        );
    }
}

export default AlertContainer;
