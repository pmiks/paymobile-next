import {Modal} from "./modal";
import modalStyle from "../styles/modalConfirmPay.module.css";
import s from "../styles/payform.module.css";
import {FC, useState} from "react";
import React from 'react';

type ServerRequestT={
    active:boolean
}

export const ServerRequestModal:FC<ServerRequestT>=({active})=>{
    return <Modal active={active} closeWindow={()=>{}} clickOverflowClose={false}>
        <div className={modalStyle.modalParagraph}>
            <div className={modalStyle.modalHeader}>Обработка платежа</div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '.5rem' }}>
                <div className='lds-dual-ring' />
            </div>
        </div>
    </Modal>
}