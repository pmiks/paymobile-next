import {Modal} from "./modal";
import {FC, useContext, useState} from "react";
import React from 'react';
import Context from "./context";
import {FieldNameSC} from "../styles/globalStyle";

type ServerRequestT={
    active:boolean
}

export const ServerRequestModal:FC<ServerRequestT>=({active})=>{
    const {language}=useContext(Context)

    return <Modal active={active} closeWindow={()=>{}} clickOverflowClose={false}>

            <FieldNameSC>{language.MSG_PAYMENT_PROCESSING}</FieldNameSC>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '.5rem' }}>
                <div className='lds-dual-ring' />
            </div>

    </Modal>
}