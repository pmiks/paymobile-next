import {Modal} from "./modal";
import modalStyle from "../styles/modalConfirmPay.module.css";
import s from "../styles/payform.module.css";
import {FC, useState} from "react";
import React from 'react';

type ServerRequestDoneT={
    active:boolean
    closeWindow:()=>void
    onDone:()=>void
}

export const ServerRequestModalDone:FC<ServerRequestDoneT>=({active,closeWindow,onDone})=>{
    return <Modal active={active} closeWindow={closeWindow} clickOverflowClose={false}>
        <div className={modalStyle.modalParagraph}>
            <div>Обработка платежа закончена </div>
            <div><button onClick={()=>{onDone();closeWindow()}}>на главную</button></div>
        </div>
    </Modal>
}