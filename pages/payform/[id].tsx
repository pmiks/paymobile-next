import {useRouter} from "next/router";
import React, {useContext, useEffect, useState} from "react";
//import s from '../../styles/payform.module.css'
import {FieldName, useForm} from 'react-hook-form'
import {serverAnswers} from "../../components/init";
import AppForm from "../../components/appform";
import {ConfirmPayModal} from "../../components/modalConfirmPay";
import {ServerRequestModal} from "../../components/modalServerRequest";
import {ServerRequestModalDone} from "../../components/modalServerRequestDone";
import {
    fieldCheckInterface,
    payDataInterface,
    serverAnswerInterface
} from "../../components/interfaces";
import ErrorPage from 'next/error'
import {maskPhone, maskPrice} from "../../components/functions";
import {getIdTransaction, getServerData} from "../../api/serverRequest";
import {MobileOperator} from "../../components/mobileOperatorItem";
import Context from "../../components/context";
import {ButtonSC, ErrorFieldSC, InputSC, WindowTitleSC,FieldNameSC} from "../../styles/globalStyle";
import styled from 'styled-components'

export default function PayForm (){
    const {language,mobileOperatorList}=useContext(Context)
    const {register,handleSubmit}=useForm()
    const router=useRouter()

    let [phoneField,setPhoneField]=useState<fieldCheckInterface>({dirty:false,field:'',error:''})
    let [amountPayField,setAmountPayField]=useState<fieldCheckInterface>({dirty:false,field:'',error:''})
    let [formValid,setFormValid]=useState<boolean>(false)


    const [modalConfirmationPayment,setModalConfirmationPayment]=useState(false)
    const [modalPaymentProcess,setModalPaymentProcess]=useState(false)

    const [paymentDone,setPaymentDone]=useState<boolean>(false)

    let [serverAnswer,setServerAnswer]=useState<serverAnswerInterface>(serverAnswers[0])


    let [payData,setPayData]=useState<payDataInterface>({
        mobileOperator:'', phoneNumber:'',amountPay:'',commission:'',transactionId:''}
        )

    useEffect(()=>{
        if (phoneField.error||amountPayField.error){
            setFormValid(false)
        } else setFormValid(true)
    },[phoneField.error,amountPayField.error])


    const phoneNumberHandler=(e)=>{
        let phoneDigits=e.target.value.replace(/\D/g,"")
        setPhoneField({...phoneField,field: maskPhone(phoneDigits),error:phoneDigits.length<11?language.ERR_FIELD_PHONE_INCORRECT:''})
    }

    const amountPayHandler=(e)=>{
        let v=maskPrice(e.target.value)
        if (Number(e.target.value)<1||Number(e.target.value)>1000)
            setAmountPayField({...amountPayField,field:v,error:language.ERR_FIELD_AMOUNT_PAY_INCORRECT})
        else setAmountPayField({...amountPayField,field:v,error:''})
    }

    const blurHandler=(event)=>{
        let err=event.target.value.length==0
        switch (event.target.name){
            case 'phoneNumber':
                setPhoneField({...phoneField, dirty: true,error:err?language.ERR_FIELD_EMPTY_FIELD:phoneField.error})
                break
            case 'amountPay': setAmountPayField({...amountPayField, dirty: true,error:err?language.ERR_FIELD_EMPTY_FIELD:amountPayField.error})
        }
    }

    const handlerSubmitPay=()=>{
        setModalPaymentProcess(true)
        setModalConfirmationPayment(false)
        getServerData('https://anyserver:4200/sendpay').then((response) => {
            setServerAnswer(response)
            setPaymentDone(true)
            setModalPaymentProcess(false)
            console.log('Платеж обработан')
        })
    }

    const onSubmit=(formData)=>{
        setPayData({...payData,
            mobileOperator:mobileOperatorList[Number(idMobileOperator)].name,
            transactionId:getIdTransaction(),
            phoneNumber:formData.phoneNumber,
            amountPay:formData.amountPay,
            commission:(Number(formData.amountPay)/100*mobileOperatorList[Number(idMobileOperator)].commission).toFixed(2)
        })
        setModalConfirmationPayment(true)
    }

    let idMobileOperator=Number(router.query.id)
    idMobileOperator=isNaN(idMobileOperator)?-1:Number(router.query.id)

        return <>
        {idMobileOperator < 0||idMobileOperator > mobileOperatorList.length?<ErrorPage statusCode={404}/>:
        <>
        <AppForm>
            <PaymentForm>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MobileOperator item={mobileOperatorList[idMobileOperator]} onDelete={()=>{}} onClick={()=>{}}/>
                    {/*<div className={s.payFormTitle}>Оплата мобильной связи {mobileOperatorList[idMobileOperator].name}</div>*/}
                    <WindowTitleSC/>
                    <FieldNameSC>{language.FIELD_PHONE_NUMBER} </FieldNameSC>
                    <InputSC
                        type="tel"
                        value={phoneField.field}
                        placeholder={"+7 (000) 000 00 00 "}
                        inputMode={"numeric"}
                        name={"phoneNumber"}
                        id={"phoneNumber"}
                        autoComplete={"off"}
                        onChange={(e) => phoneNumberHandler(e)}
                        onBlur={(e) => blurHandler(e)}
                        ref={register}
                    />
                    <ErrorFieldSC>{(phoneField.dirty&&phoneField.error)&&phoneField.error}</ErrorFieldSC>
                    {/*{(phoneValid && phoneError) && <div className={s.textError}>{phoneError}</div>}*/}
                    <FieldNameSC>{language.FIELD_AMOUNT_PAY}</FieldNameSC>
                    <InputSC
                        type={"text"}
                        value={amountPayField.field}
                        placeholder={"0"}
                        inputMode={"decimal"}
                        name={"amountPay"}
                        autoComplete={"off"}
                        id={"amountPay"}
                        onChange={(e) => amountPayHandler(e)}
                        onBlur={(e) => blurHandler(e)}
                        ref={register}
                    />
                    <ErrorFieldSC>{(amountPayField.dirty && amountPayField.error) && amountPayField.error}</ErrorFieldSC>

                    <div>
                        <ButtonSC typeName={"ok"} disabled={formValid ? false : true}>
                            {language.BTN_PAY}
                        </ButtonSC>
                    </div>
                </form>
            </PaymentForm>
        </AppForm>

        {/*Модальное окно подтверждения  запроса*/}
            <ConfirmPayModal
                data={payData}
                active={modalConfirmationPayment}
                closeWindow={() => setModalConfirmationPayment(false)}
                onConfirm={handlerSubmitPay}
                onCancel={() => setModalConfirmationPayment(false)}
                />
            <ServerRequestModal active={modalPaymentProcess}/>
            <ServerRequestModalDone result={serverAnswer} active={paymentDone} closeWindow={() => setPaymentDone(false)}
                                    onDone={() => { router.push('/')}}/>
        </>
     }
     </>
}

const PaymentForm = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: space-around;
    text-align: center;
    margin:5rem;
 `




