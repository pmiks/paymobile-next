import {Modal} from "./modal";
import modalStyle from "../styles/modalConfirmPay.module.css";
import s from "../styles/payform.module.css";
import {FC, useContext, useState} from "react";
import React from 'react';
import {fieldNameInterface, payDataInterface} from "./interfaces";
import Context from "./context";

type ConfirmPayT={
    active:boolean
    data:payDataInterface
    closeWindow:()=>void
    onConfirm:()=>void
    onCancel:()=>void
}

export const ConfirmPayModal:FC<ConfirmPayT>=({data,active,closeWindow,onConfirm,onCancel})=>{
    const {language}=useContext(Context)
    return <Modal active={active} closeWindow={closeWindow} clickOverflowClose={false}>
        <div className={modalStyle.modalParagraph}>
            <div className={modalStyle.modalHeader}>{language.TITLE_CONFIRM_PAY}</div>
            <div className={modalStyle.modalItemName}> {language.FIELD_NAME_OPERATOR} </div>
                <div className={modalStyle.modalItem}>{data.mobileOperator}</div>
            <div className={modalStyle.modalItemName}>{language.FIELD_PHONE_NUMBER} </div>
                <div className={modalStyle.modalItem}>{data.phoneNumber}</div>
            <div className={modalStyle.modalItemName}>{language.FIELD_AMOUNT_PAY} </div>
                <div className={modalStyle.modalItem}>{data.amountPay} &#x20BD;</div>
            <div className={modalStyle.modalItemName}>{language.FIELD_COMMISSION}</div>
                <div className={modalStyle.modalItem}>{data.commission} &#x20BD;</div>
            <div className={modalStyle.modalItemName}>{language.FIELD_TRANSACTION_NUMBER}</div>
                <div className={modalStyle.modalItem}>#{data.transactionId}</div>
            <div style={{"textAlign":"center"}}><button onClick={()=>{onConfirm();closeWindow()}}>{language.BTN_PAY}</button>
            <button className={'cancel'} onClick={()=>{closeWindow()}}>{language.BTN_CANCEL}</button></div>
        </div>
    </Modal>
}