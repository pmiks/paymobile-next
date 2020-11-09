import {Modal} from "./modal";
import {FC, useContext, useState} from "react";
import React from 'react';
import {payDataInterface} from "./interfaces";
import Context from "./context";
import styled from 'styled-components'
import {ButtonBarSC, ButtonSC, FieldNameSC, WindowTitleSC} from "../styles/globalStyle";

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

            <WindowTitleSC>{language.TITLE_CONFIRM_PAY}</WindowTitleSC>

            <FieldNameSC> {language.FIELD_NAME_OPERATOR} </FieldNameSC>
                <FieldValue>{data.mobileOperator}</FieldValue>

            <FieldNameSC>{language.FIELD_PHONE_NUMBER} </FieldNameSC>
                <FieldValue>{data.phoneNumber}</FieldValue>

            <FieldNameSC>{language.FIELD_AMOUNT_PAY} </FieldNameSC>
                <FieldValue>{data.amountPay} &#x20BD;</FieldValue>

            <FieldNameSC>{language.FIELD_COMMISSION}</FieldNameSC>
                <FieldValue>{data.commission} &#x20BD;</FieldValue>

            <FieldNameSC>{language.FIELD_TRANSACTION_NUMBER}</FieldNameSC>
                <FieldValue>#{data.transactionId}</FieldValue>

            <ButtonBarSC>
                <ButtonSC typeName={'ok'}onClick={()=>{onConfirm();closeWindow()}}>{language.BTN_PAY}</ButtonSC>
                <ButtonSC typeName={'cancel'} onClick={()=>{closeWindow()}}>{language.BTN_CANCEL}</ButtonSC>
            </ButtonBarSC>
    </Modal>
}

const FieldValue = styled.div`
    font-size: 2rem;
    border: gray 1px dotted;
    border-left-width: 0;
    border-right-width: 0;
    margin: 5px 1px;
    display: flex;
    justify-content: center;
    padding: 5px;
 `