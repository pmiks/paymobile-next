import s from '../styles/appform.module.css'
import Link from 'next/link'
import {Modal} from "./modal";
import {useState} from "react";

export default function AppForm({children}){
    return <div className={s.AppForm}>
        <div className={s.Header}>Оплата мобильной связи</div>
        <div className={s.Form}>{children}</div>
        <div className={s.Footer}><Link href={'/'}><a>на главную</a></Link></div>
    </div>
}