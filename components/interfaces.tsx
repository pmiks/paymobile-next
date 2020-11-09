export interface mobileOperatorListInterface {
    name:string,
    nameInter:string,
    color:string|null,
    logo:string|null,
    commission:number,
    userData:boolean
}

export interface payDataInterface{
    mobileOperator:string,
    phoneNumber:string,
    amountPay:string,
    commission:string,
    transactionId:string
}

export interface serverAnswerInterface{
    status:number,
    timeRequest:number,
    data:{
        isSuccessful:boolean,
        answerText:string
    }
}


export interface fieldCheckInterface{
    dirty:boolean,
    field:string,
    error:string
}

export interface fieldNameInterface {
    DISPLAY_NAME: string,
    BTN_ADD_MOBILE: string,
    BTN_ADD: string,
    BTN_PICK:string,
    BTN_CANCEL: string,
    BTN_PAY:string,
    BTN_BACK_TO_MAIN:string,
    BTN_OK:string,
    FIELD_NAME_LANGUAGE:string;
    FIELD_TRANSACTION_NUMBER:string,
    FIELD_AMOUNT_PAY:string,
    FIELD_PHONE_NUMBER:string,
    FIELD_NAME_OPERATOR: string,
    FIELD_COMMISSION: string,
    FIELD_COLOR_CHOICE: string,
    FIELD_URL_LOGO: string,
    FIELD_INTER_NAME:string,
    TITLE_APP:string,
    TITLE_CONFIRM_PAY:string,
    TITLE_SELECT_OPERATOR:string,
    TITLE_ADD_OPERATOR:string,
    TITLE_COPYRIGHT:string,
    MSG_PAYMENT_PROCESSING:string,
    ERR_FIELD_EMPTY_FIELD:string,
    ERR_FIELD_OPERATOR_EXIST:string,
    ERR_FIELD_BIG_PERCENT:string,
    ERR_FIELD_PHONE_INCORRECT:string,
    ERR_FIELD_AMOUNT_PAY_INCORRECT:string,
    ERR_404:string,
    ERR_SERVER_CONNECTION:string,
    ERR_SERVER_REQUEST:string,
    ERR_SERVER_ANSWER:string,
    MSG_SERVER_SUCCESSFUL:string
}

export interface languageDataInteface{
    RU:fieldNameInterface,
    ENG:fieldNameInterface
}