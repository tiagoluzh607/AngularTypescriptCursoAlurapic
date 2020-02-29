export enum AlertType{
    SUCCESS = 'alert-success',
    WARNING = 'alert-warning',
    DANGER = 'alert-danger',
    INFO = 'alert-info'

    
}

export class Alert{
    constructor(
        public readonly alertType: AlertType, 
        public readonly message: string
    ){}
}