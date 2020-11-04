export interface mobileOperatorListInterface {
    name:string,
    color:string|null,
    logo:string|null,
    commission:number
}

export interface payDataInterface{
    mobileOperator:string,
    phoneNumber:string,
    amountPay:number,
    commission:number,
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