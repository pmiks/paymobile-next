import {FC} from "react";
import React from 'react';

type ModalT={
    active:boolean
    closeWindow:()=>void
    children:any
    clickOverflowClose:boolean
}

export const Modal:FC<ModalT>=({active,closeWindow,clickOverflowClose,children})=>{
    return <React.Fragment>
        <div className={active?"modalWindowActive":"modalWindow"} onClick={clickOverflowClose?closeWindow:()=>{}}>
            <div className={active?"modalWindowContextActive":"modalWindowContext"} onClick={e=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    </React.Fragment>

}

