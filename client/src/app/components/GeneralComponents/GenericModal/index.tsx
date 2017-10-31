import * as React from 'react';
import { Modal, Button,ModalHeader,ModalBody,ModalFooter } from 'reactstrap';
import {IModalModel} from "../../../models/IModalModel";
import * as style from './style.css';

export interface GenericModalState {
    modal: IModalModel
}

export interface GenericModalProps {
    modal: IModalModel
}

class GenericModal extends React.Component<GenericModalProps, GenericModalState> {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.modal
        };

        this.toggle = this.toggle.bind(this);
    }
    componentWillReceiveProps(nextProps: GenericModalProps){
        this.setState({
            modal: nextProps.modal
        });
    }
    toggle() {
        let modal = this.state.modal;
        modal.modalVisible = !modal.modalVisible;
        this.setState({
            modal
        });

    }

    render() {

        return (
            <div>
                <Modal isOpen={this.state.modal.modalVisible} toggle={this.toggle} className="container">
                    <div className="container">
                        <div className="modal-header row justify-content-between">

                                <button type="button" className="close col-2 m-0 p-0" data-dismiss="modal" aria-label="Close" onClick={this.toggle}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title col-7">{this.state.modal.modalTitle}</h4>

                        </div>
                        <ModalBody className="row justify-content-center">
                            {this.state.modal.modalText}
                        </ModalBody>
                        <div className="container">
                            <ModalFooter className="row justify-content-center">

                                <Button className="btn btn-outline-primary col-8" onClick={this.toggle}>יציאה</Button>

                            </ModalFooter>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}




export default GenericModal;