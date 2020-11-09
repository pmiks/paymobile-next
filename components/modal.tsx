//import s from '../styles/modal.module.css'
import {FC} from "react";
import React from 'react';
import styled from 'styled-components'

type ModalT={
    active:boolean
    closeWindow:()=>void
    children:any
    clickOverflowClose:boolean
}

export const Modal:FC<ModalT>=({active,closeWindow,clickOverflowClose,children})=>{
    return <div className={active?"modalWindowActive":"modalWindow"} onClick={clickOverflowClose?closeWindow:()=>{}}>
        <div className={active?"modalWindowContextActive":"modalWindowContext"} onClick={e=>e.stopPropagation()}>{children} </div>
    </div>

}

// export const Modal:FC<ModalT>=({active,closeWindow,clickOverflowClose,children})=>{
//     return <ModalWindowBackgroundSC Active={active?"yes":"no"} onClick={clickOverflowClose?closeWindow:()=>{}}>
//         <ModalWindowSC Active={active?"yes":"no"} onClick={e=>e.stopPropagation()}>{children} </ModalWindowSC>
//     </ModalWindowBackgroundSC>
// }

// const ModalWindowBackgroundSC = styled.div`
//     bottom: 0;
//     right: 0;
//     background-color: rgba(0,0,0,0.5);
//     position: fixed;
//     top:0;
//     left: 0;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index:11;
// ${props=>{
//     switch (props.Active){
//         case "no":
//             return `opacity: 0;`
//         case "yes":
//             return `opacity: 1;`
//     }
// }
// }
//  `
// export const ModalWindowSC = styled.div`
//     padding: 1vh;
//     border-radius: 12px;
//     background-color: white;
//     border: gray 1px solid;
//     transform: scale(0);
//     transition: 0.5s;
// ${props=>{
//     switch (props.Active){
//         case "no":
//             return `transform: scale(0);
//                     transition: 0.5s;`
//         case "yes":
//             return `transform: scale(1);
//                     transition: 0.5s;`
//     }
// }
// }
//  `
//
//
//
//
