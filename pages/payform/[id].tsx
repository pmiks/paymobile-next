import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import s from '../../styles/payform.module.css'
import modalStyle from '../../styles/modal.module.css'
import {useForm} from 'react-hook-form'
import {mobileOperatorList} from "../../components/init";
import AppForm from "../../components/appform";
import {Modal} from "../../components/modal";


const phoneIsValid=(p)=> {
    let phoneRe = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    let digits = p.replace(/\D/g, "");
    return phoneRe.test(digits);
}

export default function PayForm (){
    const {register,handleSubmit}=useForm()
    const router=useRouter()
//    let [phoneValid,setPhoneValid]=useState(false)
    let [amountPayValid,setAmountPayValid]=useState(false)
//    let [phone,setPhone]=useState('+7')
    let [amountPay,setAmountPay]=useState('')
//    let [phoneError,setPhoneError]=useState('Введите номер телефона')
    let [amountPayError,setAmountPayError]=useState('Введите сумму платежа')
    let [formValid,setFormValid]=useState(false)

    let [phoneObj,setPhoneObj]=useState({dirty:false,field:'+7',error:'Введите номер телефона'})

    const [modalConfirmationPayment,setModalConfirmationPayment]=useState(false)
    const [modalPaymentProcess,setModalPaymentProcess]=useState(false)


    useEffect(()=>{
        if (phoneObj.error||amountPayError){
            //alert(phoneObj.error)
            setFormValid(false)
        } else setFormValid(true)
    },[phoneObj.error,amountPayError])

    const phoneNumberHandler=(e)=>{
        let v=e.target.value.replace(/\D/g,"")
        if (v.length!=11) {setPhoneObj({...phoneObj,error:'Некорректный номер телефона'})}//setPhoneError('Некорректный номер телефона')
        else {setPhoneObj({...phoneObj,error:''}) }//setPhoneError('')
        v=v.replace(/^[7,8]/g,"").substring(0, 10).replace(/^(\d{3})(\d)/g,"($1) $2")
           .replace(/^(.{9})(\d)/g,"$1-$2").replace(/^(.{12})(\d)/g,"$1-$2");
        setPhoneObj({...phoneObj,field: '+7'+v})//setPhone('+7 '+v)
    }

    const amountPayHandler=(e)=>{
        let v=e.target.value.replace(/\D/g,"").substring(0,6).replace(/^(.{4})(\d)/g,"$1.$2");
        setAmountPay(v)
        if (Number(e.target.value)<1||Number(e.target.value)>1000) setAmountPayError('Введите сумму платежа (1-1000 руб)')
        else setAmountPayError('')
    }

    const blurHandler=(id)=>{
        switch (id.target.name){
            case 'phoneNumber': setPhoneObj({...phoneObj, dirty: true})
                break
            case 'amountPay': setAmountPayValid(true)
        }
    }


    const onSubmit=(data)=>{
        setModalConfirmationPayment(true)
    }

    return <AppForm><div className={s.payForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/*<div>Оплата мобильной связи {mobileOperatorList[router.query.id].name}</div>*/}
            <div>Номер телефона</div>
            <input
                type="tel"
                value={phoneObj.field}
                placeholder={"+7 (000) 000 00 00 "}
                inputMode={"numeric"}
                name={"phoneNumber"}
                id={"phoneNumber"}
                onChange={(e)=>phoneNumberHandler(e)}
                onBlur={(e)=>blurHandler(e)}
                ref={register}
            />
            {(phoneObj.dirty&&phoneObj.error)&&<div className={s.textError}>{phoneObj.error}</div>}
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

        {/*Модальное окно подтверждения  запроса*/}
        <Modal active={modalConfirmationPayment} setActive={setModalConfirmationPayment} clickOverflowClose={true}>
           <div className={modalStyle.modalParagraph}>
            <div className={modalStyle.modalHeader}>Подтверждение платежа</div>
            <div className={modalStyle.modalItem}>Наименование {mobileOperatorList[1].name}</div>
            <div className={modalStyle.modalItem}>Номер телефона {phoneObj.field}</div>
            <div className={modalStyle.modalItem}>Сумма платежа {amountPay}</div>
            <div className={modalStyle.modalItem}>Комиссия</div>
            <div className={modalStyle.modalItem}>Номер транзакции</div>
            <div><button className={s.paymentButton} onClick={()=>{
                setModalPaymentProcess(true)
                setModalConfirmationPayment(false)
            }}>Оплатить</button>
                <button className={s.paymentButton} onClick={()=>setModalConfirmationPayment(false)}>Назад</button></div>
           </div>
        </Modal>

        {/*Модальное окно отправки запроса*/}
        <Modal active={modalPaymentProcess} setActive={setModalPaymentProcess} clickOverflowClose={true}>
           <div>
            <div>Обработка платежа</div>
           </div>
        </Modal>

    </AppForm>
}