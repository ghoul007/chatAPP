import { AlertType } from "../enums/alert-type.enum";

export class Alert {
    constructor(public text: string, public type: AlertType = AlertType.Success) {

    }
}
