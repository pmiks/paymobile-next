import {mobileOperatorListInterface} from "./interfaces";
import React, {FC} from "react";
import s from '../styles/mobileOperatorItem.module.css'
import styled from 'styled-components'

type TMobileOperator={
    item:mobileOperatorListInterface
    onClick:()=>void
}

export const MobileOperator:FC<TMobileOperator>=({item,onClick})=>{
    return <div className={s.mobileOperatorItem} style={{'backgroundColor':`${item.color}`,"whiteSpace": "nowrap"}}  onClick={onClick}>
        <div><img className={"logo"} src={item.logo} alt=""/> <div>{item.name}</div></div>
    </div>
}

// export const MobileOperator:FC<TMobileOperator>=({item,onClick})=>{
//     return <Item style={{'backgroundColor':`${item.color}`,"whiteSpace": "nowrap"}}  onClick={onClick}>
//         <ItemInner><Logo src={item.logo} alt=""/> <div>{item.name}</div></ItemInner>
//     </Item>
// }
//
//
// const Logo = styled.img`
//   height: 4rem;
//   border-radius: 50%;
//   margin-right: 3rem;
// `
// const Item = styled.div`
//     display: flex;
//     margin: 2vh 10vw;
//     border: 1px white solid;
//     border-radius: 15px;
//     font-size: 2.9rem;
//     align-content: center;
//     align-items: center;
//     justify-items: stretch;
//     height: 3em;
// `
// const ItemInner = styled.div`
//     display: flex;
//     flex: 2;
//     color: white;
//     justify-self: center;
//     justify-content: center;
//     justify-items: center;
//  `
//
