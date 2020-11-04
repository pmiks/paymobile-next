import s from '../styles/modal.module.css'
import {FC} from "react";
import React from 'react';

type ModalT={
    active:boolean
    setActive:(boolean)=>void
    children:any
    clickOverflowClose:boolean
}

export const Modal:FC<ModalT>=({active,setActive,clickOverflowClose,children})=>{
    return <div className={active?s.modalWindowActive:s.modalWindow} onClick={clickOverflowClose?()=>setActive(false):()=>{}}>
        <div className={s.modalWindowContext} onClick={e=>e.stopPropagation()}>{children} </div>
    </div>

}