import {useRouter} from "next/router";
import React, {useContext, useEffect, useState} from "react";
import s from '../../styles/payform.module.css'
import {useForm} from 'react-hook-form'
import {serverAnswers} from "../../components/init";
import AppForm from "../../components/appform";
import {ConfirmPayModal} from "../../components/modalConfirmPay";
import {ServerRequestModal} from "../../components/modalServerRequest";
import {ServerRequestModalDone} from "../../components/modalServerRequestDone";
import {
    fieldCheckInterface,
    fieldNameInterface,
    payDataInterface,
    serverAnswerInterface
} from "../../components/interfaces";
import ErrorPage from 'next/error'
import {maskName, maskPhone, maskPrice} from "../../components/functions";
import {getIdTransaction, getServerData} from "../../api/serverRequest";
import {MobileOperator} from "../../components/mobileOperatorItem";
import Context from "../context";


export default function PayForm (){
    const {language,mobileOperatorList}=useContext(Context)
    const {register,handleSubmit}=useForm()
    const router=useRouter()

    let [phoneField,setPhoneField]=useState<fieldCheckInterface>({dirty:false,field:'+7',error:'Введите номер телефона'})
    let [amountPayField,setAmountPayField]=useState<fieldCheckInterface>({dirty:false,field:'',error:'Введите сумму платежа'})
    let [formValid,setFormValid]=useState<boolean>(false)


    const [modalConfirmationPayment,setModalConfirmationPayment]=useState(false)
    const [modalPaymentProcess,setModalPaymentProcess]=useState(false)

    const [paymentDone,setPaymentDone]=useState<boolean>(false)

    let [serverAnswer,setServerAnswer]=useState<serverAnswerInterface>(serverAnswers[0])


    let [payData,setPayData]=useState<payDataInterface>({
        mobileOperator:'', phoneNumber:'',amountPay:0,commission:0,transactionId:''}
        )

    useEffect(()=>{
        if (phoneField.error||amountPayField.error){
            setFormValid(false)
        } else setFormValid(true)
    },[phoneField.error,amountPayField.error])


    const phoneNumberHandler=(e)=>{
        let phoneDigits=e.target.value.replace(/\D/g,"")
        setPhoneField({...phoneField,field: maskPhone(phoneDigits),error:phoneDigits.length!=11?'Некорректный номер телефона':''})
    }

    const amountPayHandler=(e)=>{
        let v=maskPrice(e.target.value)
        if (Number(e.target.value)<1||Number(e.target.value)>1000)
            setAmountPayField({...amountPayField,field:v,error:'Введите сумму платежа (1-1000 руб)'})
        else setAmountPayField({...amountPayField,field:v,error:''})
    }

    const blurHandler=(id)=>{
        switch (id.target.name){
            case 'phoneNumber':
                setPhoneField({...phoneField, dirty: true})
                break
            case 'amountPay': setAmountPayField({...amountPayField, dirty: true})
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
            amountPay:Number(formData.amountPay),
            commission:Number(formData.amountPay)*0.1
        })
        setModalConfirmationPayment(true)
    }

    let idMobileOperator=Number(router.query.id)
    idMobileOperator=isNaN(idMobileOperator)?-1:Number(router.query.id)

        return <>
        {idMobileOperator < 0||idMobileOperator > mobileOperatorList.length?<ErrorPage statusCode={404}/>:
        <>
        <AppForm>
            <div className={s.payForm}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MobileOperator item={mobileOperatorList[idMobileOperator]} onClick={()=>{}}/>
                    {/*<div className={s.payFormTitle}>Оплата мобильной связи {mobileOperatorList[idMobileOperator].name}</div>*/}
                    <div className={s.titleField}>{language.FIELD_PHONE_NUMBER} </div>
                    <input
                        type="tel"
                        value={phoneField.field}
                        placeholder={"+7 (000) 000 00 00 "}
                        inputMode={"numeric"}
                        name={"phoneNumber"}
                        id={"phoneNumber"}
                        onChange={(e) => phoneNumberHandler(e)}
                        onBlur={(e) => blurHandler(e)}
                        ref={register}
                    />
                    <div className={s.textError}>{(phoneField.dirty&&phoneField.error)&&phoneField.error}</div>
                    {/*{(phoneValid && phoneError) && <div className={s.textError}>{phoneError}</div>}*/}
                    <div className={s.titleField}>{language.FIELD_AMOUNT_PAY}</div>
                    <input
                        type={"text"}
                        value={amountPayField.field}
                        placeholder={"0"}
                        inputMode={"decimal"}
                        name={"amountPay"}
                        id={"amountPay"}
                        onChange={(e) => amountPayHandler(e)}
                        onBlur={(e) => blurHandler(e)}
                        ref={register}
                    />
                    <div className={s.textError}>{(amountPayField.dirty && amountPayField.error) && amountPayField.error}</div>

                    <div>
                        <button type={"submit"} disabled={formValid ? false : true}
                                className={s.paymentButton}>{language.BTN_PAY}
                        </button>
                    </div>
                </form>
            </div>
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
            <ServerRequestModalDone result={serverAnswer} active={paymentDone} closeWindow={() => setPaymentDone(false)} onDone={() => { }}/>
            {/*onDone={() => { router.push('/')}}/>*/}
        </>
     }
     </>
}

