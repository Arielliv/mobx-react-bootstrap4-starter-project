import {observable, action, computed} from 'mobx';
import {ILogModel} from "../models/ILogModel";
import {IAlertModel} from "../models/IAlertModel";

export class AlertStore {

    constructor() {
        this.alert = {alertVisible:false,alertText:"",alertColor:""};

        this.setAlert = this.setAlert.bind(this);
        this.setAlertVisible = this.setAlertVisible.bind(this);

    }

    @observable
    private alert: IAlertModel;

    @computed
    get getAlert(){
        return this.alert;
    }

    @action
    setAlert(alert : IAlertModel){
        this.alert = alert;
    }

    @action
    setAlertVisible(visible : boolean){
        this.alert.alertVisible = visible;
    }
}

export default AlertStore ;
