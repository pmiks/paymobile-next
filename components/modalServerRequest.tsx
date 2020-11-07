import {Modal} from "./modal";
import modalStyle from "../styles/modalConfirmPay.module.css";
import s from "../styles/payform.module.css";
import {FC, useContext, useState} from "react";
import React from 'react';
import {fieldNameInterface} from "./interfaces";
import Context from "../pages/context";

type ServerRequestT={
    active:boolean
}

export const ServerRequestModal:FC<ServerRequestT>=({active})=>{
    const {language}=useContext<fieldNameInterface>(Context)
    return <Modal active={active} closeWindow={()=>{}} clickOverflowClose={false}>
        <div className={modalStyle.modalParagraph}>
            <div className={modalStyle.modalHeader}>{language.MSG_PAYMENT_PROCESSING}</div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '.5rem' }}>
                <div className='lds-dual-ring' />
            </div>
        </div>
    </Modal>
}