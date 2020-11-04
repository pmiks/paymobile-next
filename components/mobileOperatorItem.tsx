import {mobileOperatorListInterface} from "./interfaces";
import React, {FC} from "react";
import s from '../styles/mobileOperatorItem.module.css'
import {useRouter} from 'next/router'
import {number} from "prop-types";

type TMobileOperator={
    item:mobileOperatorListInterface
    onClick:(id:number)=>void
}

export const MobileOperator:FC<TMobileOperator>=({item,onClick})=>{
    return <div className={s.mobileOperatorItem} style={{'backgroundColor':`${item.color}`}}  onClick={()=>onClick(item.id)}>
        <div>{item.name}</div>
    </div>
}