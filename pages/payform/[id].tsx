import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import s from '../../styles/payform.module.css'
import modalStyle from '../../styles/modal.module.css'
import {useForm} from 'react-hook-form'
import {mobileOperatorList} from "../../components/init";
import AppForm from "../../components/appform";
import {ConfirmPayModal} from "../../components/modalConfirmPay";
import {ServerRequestModal} from "../../components/modalServerRequest";
import {ServerRequestModalDone} from "../../components/modalServerRequestDone";
import {payDataInterface} from "../../components/interfaces";
import {number} from "prop-types";



const getServerData=new Promise(function (resolve,reject){
    setTimeout(()=>{
       const serverData={
         server:'payment',
         port:3000,
         status:'working'
     }
     resolve()
    },15000)
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const getIdTransaction=()=>{
    return getRandomInt(400000000000,999999999999)
}

export default function PayForm (){
    const {register,handleSubmit}=useForm()
    const router=useRouter()
    let [phoneValid,setPhoneValid]=useState(false)
    let [amountPayValid,setAmountPayValid]=useState(false)
    let [phone,setPhone]=useState('+7')
    let [amountPay,setAmountPay]=useState('')
    let [phoneError,setPhoneError]=useState('Введите номер телефона')
    let [amountPayError,setAmountPayError]=useState('Введите сумму платежа')
    let [formValid,setFormValid]=useState(false)

//    let [phoneObj,setPhoneObj]=useState({dirty:false,field:'+7',error:'Введите номер телефона'})

    const [modalConfirmationPayment,setModalConfirmationPayment]=useState(false)
    const [modalPaymentProcess,setModalPaymentProcess]=useState(false)

    const [paymentDone,setPaymentDone]=useState(false)

    let [payData,setPayData]=useState<payDataInterface>({
        mobileOperator:mobileOperatorList[Number(router.query.id)].name,
        phoneNumber:'',
        amountPay:0,
        commission:0,
        transactionId:''
    })

    useEffect(()=>{
        if (phoneError||amountPayError){
            setFormValid(false)
        } else setFormValid(true)
    },[phoneError,amountPayError])

    const phoneNumberHandler=(e)=>{
        let v=e.target.value.replace(/\D/g,"")
        if (v.length!=11) setPhoneError('Некорректный номер телефона')//{setPhoneObj({...phoneObj,error:'Некорректный номер телефона'})}//setPhoneError('Некорректный номер телефона')
        else setPhoneError('')//{setPhoneObj({...phoneObj,error:''}) }//setPhoneError('')
        v=v.replace(/^[7,8]/g,"").substring(0, 10).replace(/^(\d{3})(\d)/g,"($1) $2")
           .replace(/^(.{9})(\d)/g,"$1-$2").replace(/^(.{12})(\d)/g,"$1-$2");
        setPhone('+7 '+v)//setPhoneObj({...phoneObj,field: '+7'+v})//setPhone('+7 '+v)
    }

    const amountPayHandler=(e)=>{
        let v=e.target.value.replace(/\D/g,"").substring(0,6).replace(/^(.{4})(\d)/g,"$1.$2");
        setAmountPay(v)
        if (Number(e.target.value)<1||Number(e.target.value)>1000) setAmountPayError('Введите сумму платежа (1-1000 руб)')
        else setAmountPayError('')
    }

    const blurHandler=(id)=>{
        switch (id.target.name){
            case 'phoneNumber':setPhoneValid(true)// setPhoneObj({...phoneObj, dirty: true})
                break
            case 'amountPay': setAmountPayValid(true)
        }
    }


    const onSubmit=(formData)=>{
        setPayData({...payData,
            transactionId:getIdTransaction(),
            phoneNumber:formData.phoneNumber,
            amountPay:Number(formData.amountPay),
            commission:Number(formData.amountPay)*0.1
        })
        setModalConfirmationPayment(true)
    }

    return <><AppForm><div className={s.payForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/*<div>Оплата мобильной связи {mobileOperatorList[router.query.id].name}</div>*/}
            <div>Номер телефона</div>
            <input
                type="tel"
                value={phone}
                placeholder={"+7 (000) 000 00 00 "}
                inputMode={"numeric"}
                name={"phoneNumber"}
                id={"phoneNumber"}
                onChange={(e)=>phoneNumberHandler(e)}
                onBlur={(e)=>blurHandler(e)}
                ref={register}
            />
            {/*(phoneObj.dirty&&phoneObj.error)&&<div className={s.textError}>{phoneObj.error}</div>*/}
            {(phoneValid&&phoneError)&&<div className={s.textError}>{phoneError}</div>}
            <div>Сумма платежа</div>
            <input
                type={"text"}
                value={amountPay}
                placeholder={"0"}
                inputMode={"decimal"}
                name={"amountPay"}
                id={"amountPay"}
                onChange={(e)=>amountPayHandler(e)}
                onBlur={(e)=>blurHandler(e)}
                ref={register}
            />
            {<div className={s.textError}>{(amountPayValid&&amountPayError)&&amountPayError}</div>}

            <div><button type={"submit"} disabled={formValid?false:true} className={s.paymentButton}>Оплатить</button></div>
        </form>
    </div>

    </AppForm>
        {/*Модальное окно подтверждения  запроса*/}

        <ConfirmPayModal
            data={payData}
            active={modalConfirmationPayment}
            closeWindow={()=>setModalConfirmationPayment(false)}
            onConfirm={ ()=>{
                setModalPaymentProcess(true)
                setModalConfirmationPayment(false)
                getServerData.then(()=>{
                    setPaymentDone(true)
                    setModalPaymentProcess(false)
                })
                }}
            onCancel={()=>setModalConfirmationPayment(false)}
        />

        <ServerRequestModal active={modalPaymentProcess}/>
        <ServerRequestModalDone active={paymentDone} closeWindow={()=>setPaymentDone(false)}
                                onDone={()=>{router.push('/')}
        }/>
    </>
}