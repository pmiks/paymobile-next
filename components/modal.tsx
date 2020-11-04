import s from '../styles/modal.module.css'
import {FC} from "react";
import React from 'react';

type ModalT={
    active:boolean
    closeWindow:()=>void
    children:any
    clickOverflowClose:boolean
}

export const Modal:FC<ModalT>=({active,closeWindow,clickOverflowClose,children})=>{
    return <div className={active?s.modalWindowActive:s.modalWindow} onClick={clickOverflowClose?closeWindow:()=>{}}>
        <div className={active?s.modalWindowContextActive:s.modalWindowContext} onClick={e=>e.stopPropagation()}>{children} </div>
    </div>

}