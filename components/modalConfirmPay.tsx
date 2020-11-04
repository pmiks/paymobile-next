import {Modal} from "./modal";
import modalStyle from "../styles/modalConfirmPay.module.css";
import s from "../styles/payform.module.css";
import {FC, useState} from "react";
import React from 'react';
import {payDataInterface} from "./interfaces";

type ConfirmPayT={
    active:boolean
    data:payDataInterface
    closeWindow:()=>void
    onConfirm:()=>void
    onCancel:()=>void
}

export const ConfirmPayModal:FC<ConfirmPayT>=({data,active,closeWindow,onConfirm,onCancel})=>{
    return <Modal active={active} closeWindow={closeWindow} clickOverflowClose={false}>
        <div className={modalStyle.modalParagraph}>
            <div className={modalStyle.modalHeader}>Подтверждение платежа</div>
            <div className={modalStyle.modalItemName}> Наименование </div>
                <div className={modalStyle.modalItem}>{data.mobileOperator}</div>
            <div className={modalStyle.modalItemName}>Номер телефона </div>
                <div className={modalStyle.modalItem}>{data.phoneNumber}</div>
            <div className={modalStyle.modalItemName}>Сумма платежа </div>
                <div className={modalStyle.modalItem}>{data.amountPay} &#x20BD;</div>
            <div className={modalStyle.modalItemName}>Комиссия</div>
                <div className={modalStyle.modalItem}>{data.commission} &#x20BD;</div>
            <div className={modalStyle.modalItemName}>Номер транзакции</div>
                <div className={modalStyle.modalItem}>#{data.transactionId}</div>
            <div style={{"textAlign":"center"}}><button onClick={()=>{onConfirm();closeWindow()}}>Оплатить</button>
            <button className={'cancel'} onClick={()=>{closeWindow()}}>Назад</button></div>
        </div>
    </Modal>
}